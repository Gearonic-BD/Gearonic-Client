import CartItemCard from "@/components/CartItemCard";
import { ShoppingCart } from "lucide-react";
import React from "react";
import type { CartItem } from "@/store/cart";
import Link from "next/link";

interface CartItemsListProps {
  items: CartItem[];
  removeItem: (id: string) => void;
}

const CartItemsList: React.FC<CartItemsListProps> = ({ items, removeItem }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="bg-white rounded-full p-6 mb-6 shadow-sm">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-6">Add some items to get started</p>
        <Link
          href={"/"}
          className="bg-info hover:bg-info/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  return (
    <div>
      {items.map((item, index) => (
        <CartItemCard
          key={item.id}
          index={index}
          removeItem={() => removeItem(item.id)}
          item={item}
          cartLen={items.length}
        />
      ))}
    </div>
  );
};

export default CartItemsList;
