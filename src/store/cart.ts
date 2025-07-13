import { create } from "zustand";

export type CartItem = {
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  increaseQty: (productId: string, variantId?: string) => void;
  decreaseQty: (productId: string, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
   
    const existingIndex = get().items.findIndex(
      (i) => i.productId === item.productId && i.variantId === item.variantId
    );

    if (existingIndex !== -1) {
      const updatedItems = [...get().items];
      updatedItems[existingIndex].quantity += item.quantity;
      set({ items: updatedItems });
     
    } else {
      set((state) => ({
        items: [...state.items, { ...item }],
      }));
    }
  },

  removeFromCart: (productId, variantId) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      ),
    })),

  increaseQty: (productId, variantId) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      ),
    })),

  decreaseQty: (productId, variantId) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get totalPrice() {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },
}));
