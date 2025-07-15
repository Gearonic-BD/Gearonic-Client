import { Variant } from "@/types/product";
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
  getTotalItems: () => number;

  totalPrice: number; // price before discount
  finalTotalPrice: number; // price after applying discount
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  increaseQty: (productId: string, variantId?: string) => void;
  decreaseQty: (productId: string, variantId?: string) => void;
  changeShipping: (shipping: number) => void;
  clearCart: () => void;
  applyVoucher: (
    code: string,
    type: "flat" | "percentage",
    amount: number
  ) => void;
  removeVoucher: () => void;
};

const dummyVouchers: Voucher[] = [
  {
    code: "SUMMER10",
    type: "percentage",
    discountAmount: 10,
  },
  {
    code: "S50",
    type: "flat",
    discountAmount: 50,
    minOrderAmount: 1000,
  },
];

const dummyCartItems: CartItem[] = [
  {
    id: "15",
    productId: "iphone-15-pro",
    title: "Apple iPhone 15 Pro Max 256GB With Black Titanium Wireless Charger, Wifi Adapter, Musical Instrument and more",
    brand: "Apple",
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/aoc/agon-pro-ag276fk/agon-pro-ag276fk-01-500x500.webp",
    originalPrice: 189999,
    price: 179999,
    quantity: 1,
    variant: {
      id: "v1",
      color: "Black Titanium",

      price: 179999,
      stock: 10,
      image:
        "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-official-500x500.webp",
    },
  },
  {
    id: "16",
    productId: "logitech-g502-x-plus",
    title: "Logitech G502 X Plus Wireless RGB Gaming Mouse",
    brand: "Logitech",
    image:
      "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-official-500x500.webp",
    originalPrice: 16999,
    price: 15490,
    quantity: 2,
    variant: undefined,
  },
  {
    id: "17",
    productId: "acer-nitro-5",
    title: "Acer Nitro 5 Ryzen 7 RTX 4060 Gaming Laptop",
    brand: "Acer",
    image:
      "https://www.startech.com.bd/image/cache/catalog/drones/dji/mini-4k-fly-more-combo/mini-4k-fly-more-combo-01-500x500.webp",
    originalPrice: 139000,
    price: 134500,
    quantity: 1,
    variant: {
      id: "v3",
      color: "Obsidian Black",
      size: "16GB/512GB",
      price: 134500,
      stock: 8,
      image:
        "https://www.startech.com.bd/image/cache/catalog/laptop/acer/nitro-5-ryzen-7-rtx4060/nitro-5-front-500x500.webp",
    },
  },
];

export const useCartStore = create<CartState>((set, get) => ({
  cart: {
    items: [...dummyCartItems],
    voucher: dummyVouchers[0],
    discount: 0,
    shipping: 60,
  },

  getTotalItems: () => {
    return get().cart.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get totalPrice() {
    return get().cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  get finalTotalPrice() {
    return get().totalPrice - get().cart.discount + get().cart.shipping;
  },

  addToCart: (item) => {
    const existingIndex = get().cart.items.findIndex(
      (i) =>
        i.productId === item.productId && i.variant?.id === item.variant?.id
    );

    if (existingIndex !== -1) {
      const updatedItems = [...get().cart.items];
      updatedItems[existingIndex].quantity += item.quantity;
      set({ cart: { ...get().cart, items: updatedItems } });
    } else {
      set((state) => ({
        cart: { ...state.cart, items: [...state.cart.items, { ...item }] },
      }));
    }

    // Recalculate discount if voucher exists
    const voucher = get().cart.voucher;
    if (voucher) {
      get().applyVoucher(voucher.code, voucher.type, voucher.discountAmount);
    }
  },

  removeFromCart: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter((item) => item.id !== id),
      },
    })),

  increaseQty: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      },
    })),

  decreaseQty: (id) =>
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      },
    })),

  changeShipping: (shipping: number) => {
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

    // Optional: Cap discount so it doesn't exceed subtotal
    if (discount > subtotal) discount = subtotal;

    set({
      cart: {
        ...get().cart,
        voucher: { code, type, discountAmount: amount },
        discount: Math.floor(discount), // round to nearest integer if needed
      },
    });
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
