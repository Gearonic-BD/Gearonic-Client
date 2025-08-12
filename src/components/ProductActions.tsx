"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { CartItem, useCartStore } from "@/store/cart";
import { Product, Variant } from "@/types/types";

interface ProductActionsProps {
  currentStock: number;
  selectedVariant: Variant | null;
  onBuyNow: () => void;
  isWishlisted: boolean;
  currentPrice: number;
  onWishlistToggle: () => void;
  product: Product;
}

const ProductActions = ({
  currentStock,
  selectedVariant,
  currentPrice,
  onBuyNow,
  isWishlisted,
  onWishlistToggle,
  product,
}: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < currentStock) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    //TODO: Only save the product ID and Cart Id and fetch the whole info from the backend.
    //also add the href to check or navigate through the product.
    const cartObject: CartItem = {
      id: product.id,
      title: product.title,
      brand: product.brand,
      image: selectedVariant?.image || product.images[0],
      productId: product.id,
      variant: selectedVariant || undefined,
      quantity: quantity,
      originalPrice: product.originalPrice,
      price: currentPrice,
    };
    addToCart(cartObject);
  };

  return (
    <>
      {/* Desktop Actions */}
      <div className="items-center gap-4 md:flex hidden">
        <h3 className="text-lg text-gray-900">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange("decrease")}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              disabled={quantity >= currentStock}
              className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 md:block hidden">
        <div className="flex gap-3">
          <button
            onClick={onBuyNow}
            disabled={currentStock === 0}
            className="h-12 w-2/5 cursor-pointer bg-info text-white hover:bg-info/90 font-medium rounded-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            disabled={currentStock === 0}
            className="w-2/5 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xs cursor-pointer
             flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <button
            onClick={onWishlistToggle}
            className="h-12 w-12 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Fixed Action Buttons */}
      <div className="fixed xs:bottom-0 bottom-18 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-2 pb-3 shadow-lg md:hidden z-40">
        <div className="flex flex-col gap-3">
          {/* Quantity and Wishlist Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= currentStock}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            <button
              onClick={onWishlistToggle}
              className="h-10 w-10 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-danger text-danger" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={currentStock === 0}
              className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg
       flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={onBuyNow}
              disabled={currentStock === 0}
              className="flex-1 h-12 bg-info text-white hover:bg-info/90 font-medium rounded-lg 
       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
