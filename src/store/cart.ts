import { BackendCartItem, Variant } from "@/types/types";
import axiosInstance from "@/utils/axiosInstance";
import { trackAddToCart } from "@/utils/facebookPixel";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export type CartItem = {
  id: string;
  productId: string;
  variant?: Variant;
  originalPrice: number;

  title: string;
  price: number;
  image: string;
  quantity: number;
  brand: string;
  slug: string;
  stock: number;
};

type Voucher = {
  code: string;
  type: "flat" | "percentage";
  discountAmount: number;
  minOrderAmount?: number;
};

type CartState = {
  cart: {
    items: CartItem[];
    voucher?: Voucher;
    discount: number;
    shipping: number;
  };
  isCartLoaded: boolean;
  getTotalItems: () => number;
  totalPrice: number; // before discount
  finalTotalPrice: number; // after discount + shipping
  fetchCart: () => Promise<void>;

  // State mutations
  setCartItems: (items: CartItem[]) => void;
  rollbackCart: (prevItems: CartItem[]) => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;

  changeShipping: (shipping: number) => void;
  clearCart: () => void;
  updateQty: (id: string, quantity: number) => Promise<void>;

  // Voucher (validated by backend)
  applyVoucher: (
    code: string,
    type: "flat" | "percentage",
    amount: number
  ) => void;
  setVoucherFromApi: (
    code: string,
    type: "flat" | "percentage",
    value: number,
    discountAmount: number
  ) => void;
  validateAndApplyVoucher: (code: string) => Promise<{ success: boolean; message?: string }>;
  /** Re-validate applied voucher against current cart; clear if no longer valid (e.g. no eligible items). */
  revalidateVoucher: () => Promise<void>;
  removeVoucher: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  cart: {
    items: [],
    voucher: undefined,
    discount: 0,
    shipping: 60,
  },
  isCartLoaded: false,

  getTotalItems: () =>
    get().cart.items.reduce((sum, item) => sum + item.quantity, 0),

  get totalPrice() {
    return get().cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  get finalTotalPrice() {
    return get().totalPrice - get().cart.discount + get().cart.shipping;
  },
  fetchCart: async () => {
    set({ isCartLoaded: false });

    try {
      const res = await axiosInstance.get("/api/cart");
      const backendCart = res.data;
   

      if (backendCart && backendCart.items) {
        // Map the backend data to your frontend CartItem type
        const items = backendCart.items.map((cartItem: BackendCartItem) => ({
          id: cartItem.id,
          productId: cartItem.productId,
          variant: cartItem.variant,
          originalPrice: cartItem.originalPrice,
          title: cartItem.product.title,
          price: cartItem.price,
          image: cartItem.variant?.image || cartItem.product.images[0],
          quantity: cartItem.quantity,
          brand: cartItem.product.brand,
          slug: cartItem.product.slug,
          stock: cartItem.variant
            ? cartItem.variant.stock
            : cartItem.product.totalStock,
        }));

        // This is the key line: update the store with the fetched items
        set((state) => ({ cart: { ...state.cart, items } }));
        await get().revalidateVoucher();
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      set({ isCartLoaded: true });
    }
  },

  // Directly set cart items
  setCartItems: (items) => set((state) => ({ cart: { ...state.cart, items } })),

  // Rollback helper for optimistic UI
  rollbackCart: (prevItems) =>
    set((state) => ({ cart: { ...state.cart, items: prevItems } })),

  addToCart: async (item) => {
    // Save previous items for rollback
    const prevItems = [...get().cart.items];

    // Optimistic Update
    const id = `${item.productId}-${item.variant?.id || "no-variant"}`;
    const existingIndex = prevItems.findIndex((i) => i.id === id);

    // Apply the local update immediately
    let updatedItems;
    if (existingIndex !== -1) {
      updatedItems = [...prevItems];
      updatedItems[existingIndex].quantity += item.quantity;
    } else {
      updatedItems = [...prevItems, { ...item, id }];
    }
    set({ cart: { ...get().cart, items: updatedItems } });

    // Re-apply voucher discount if one is set (recalculated from current cart)
    const voucher = get().cart.voucher;
    if (voucher) {
      get().applyVoucher(voucher.code, voucher.type, voucher.discountAmount);
    }

    try {
      const res = await axiosInstance.post("/api/cart/add", {
        id,
        productId: item.productId,
        quantity: item.quantity,
        variantId: item.variant?.id ?? null,
      });

      if (res.status === 200) {
        const updatedCartFromServer = res.data; // The full cart object from the server

        // Update the entire cart in the store
        set((state) => ({
          cart: {
            ...state.cart,
            items: updatedCartFromServer.items.map(
              (cartItem: BackendCartItem) => ({
                id: `${cartItem.productId}-${
                  cartItem.variantId || "no-variant"
                }`,
                productId: cartItem.productId,
                variant: cartItem.variant,
                originalPrice: cartItem.originalPrice,
                title: cartItem.product.title, // You might need to adjust this depending on the data returned
                price: cartItem.price,
                image: cartItem.variant?.image || cartItem.product.images[0],
                quantity: cartItem.quantity,
                brand: cartItem.product.brand,
                slug: cartItem.product.slug,
                stock: cartItem.variant
                  ? cartItem.variant.stock
                  : cartItem.product.totalStock,
              })
            ),
          },
        }));

        trackAddToCart({
          content_ids: [item.productId],
          content_name: item.title,
          value: item.price * item.quantity,
          currency: "BDT",
          num_items: item.quantity,
        });
        toast.success("Product added to cart");
      }

      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Rollback the optimistic update
        set({ cart: { ...get().cart, items: prevItems } });

        // Redirect to login page
        window.location.href = "/login";
        return false;
      }

      // For other errors, rollback and show error
      set({ cart: { ...get().cart, items: prevItems } });
      toast.error("Could not add product to cart. Please try again.");
      return false;
    }
  },

  removeFromCart: async (id) => {
    const prevItems = [...get().cart.items];

    // Find the item to get its database ID
    const itemToRemove = prevItems.find((item) => item.id === id);
    if (!itemToRemove) {
      toast.error("Item not found in cart.");
      return;
    }

    // 2. Perform an optimistic update: remove the item from the state immediately
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter((item) => item.id !== id),
      },
    }));

    try {
      // 3. Make the API call to delete the item from the backend
      await axiosInstance.delete(`/api/cart/delete`, {
        data: {
          productId: itemToRemove.productId,
          variantId: itemToRemove.variant?.id ?? null,
        },
      });

      // 4. On success, show a toast notification
      toast.success("Product removed from cart");
      // 5. Re-validate voucher; clear if no eligible items remain (e.g. product-scoped coupon)
      await get().revalidateVoucher();
    } catch (error) {
      console.error("Failed to remove item:", error);
      // 5. On failure, rollback the state to the previous items
      set((state) => ({ cart: { ...state.cart, items: prevItems } }));
      toast.error("Could not remove product. Please try again.");
    }
  },

  updateQty: async (id, newQuantity) => {
    // Save previous items for potential rollback
    const prevItems = [...get().cart.items];
    let updatedItems;

    // Optimistic Update
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      updatedItems = prevItems.filter((item) => item.id !== id);
      set({ cart: { ...get().cart, items: updatedItems } });
    } else {
      // Otherwise, update the quantity of the existing item
      updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      set({ cart: { ...get().cart, items: updatedItems } });
    }

    try {
      // Find the item to get its internal database ID
      const itemToUpdate = prevItems.find((item) => item.id === id);
      if (!itemToUpdate) {
        throw new Error("Item not found in cart");
      }

      const res = await axiosInstance.put(`/api/cart/update`, {
        quantity: newQuantity,
        productId: itemToUpdate.productId,
        variantId: itemToUpdate.variant?.id || null,
      });

      if (res.status === 200) {
        await get().revalidateVoucher();
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
      // Rollback the state if the API call fails
      set({ cart: { ...get().cart, items: prevItems } });
    }
  },

  changeShipping: (shipping) => {
    set({ cart: { ...get().cart, shipping } });
  },

  clearCart: () =>
    set({ cart: { items: [], discount: 0, voucher: undefined, shipping: 60 } }),

  applyVoucher: (code, type, amount) => {
    const subtotal = get().totalPrice;
    let discount = 0;

    if (type === "flat") {
      discount = amount;
    } else if (type === "percentage") {
      discount = (subtotal * amount) / 100;
    }

    if (discount > subtotal) discount = subtotal;

    set({
      cart: {
        ...get().cart,
        voucher: { code: code.toUpperCase(), type, discountAmount: amount },
        discount: Math.floor(discount),
      },
    });
  },

  setVoucherFromApi: (code, type, value, discountAmount) => {
    set({
      cart: {
        ...get().cart,
        voucher: { code, type, discountAmount: value },
        discount: Math.floor(discountAmount),
      },
    });
  },

  validateAndApplyVoucher: async (code) => {
    const trimmed = code?.trim().toUpperCase();
    if (!trimmed) {
      return { success: false, message: "Enter a coupon code." };
    }
    const items = get().cart.items;
    if (items.length === 0) {
      return { success: false, message: "Your cart is empty." };
    }
    try {
      const res = await axiosInstance.post("/api/coupons/validate", {
        code: trimmed,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      });
      const data = res.data;
      if (data.valid && data.discount != null) {
        get().setVoucherFromApi(
          trimmed,
          data.type || "flat",
          data.value ?? data.discount,
          data.discount
        );
        return { success: true };
      }
      return { success: false, message: data.message || "Invalid coupon." };
    } catch (err: any) {
      const msg = err.response?.data?.message || "Could not validate coupon.";
      return { success: false, message: msg };
    }
  },

  revalidateVoucher: async () => {
    const { voucher, items } = get().cart;
    if (!voucher || items.length === 0) {
      if (voucher) get().removeVoucher();
      return;
    }
    try {
      const res = await axiosInstance.post("/api/coupons/validate", {
        code: voucher.code,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })),
      });
      const data = res.data;
      if (data.valid && data.discount != null && data.discount > 0) {
        get().setVoucherFromApi(
          voucher.code,
          data.type || "flat",
          data.value ?? data.discount,
          data.discount
        );
      } else {
        get().removeVoucher();
      }
    } catch {
      get().removeVoucher();
    }
  },

  removeVoucher: () =>
    set({
      cart: {
        ...get().cart,
        voucher: undefined,
        discount: 0,
      },
    }),
}));
