"use client";

import { useState } from "react";
import { Loader2, Minus, Plus, ShoppingCart } from "lucide-react";
import { CartItem, useCartStore } from "@/store/cart";
import { Product, Variant } from "@/types/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductActionsProps {
  currentStock: number;
  selectedVariant: Variant | null;
  isWishlisted: boolean;
  currentPrice: number;
  onWishlistToggle: () => void;
  product: Product;
  totalStock: number;
}

const ProductActions = ({
  currentStock,
  selectedVariant,
  currentPrice,
  totalStock,
  product,
}: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { checkAuth, user } = useAuth();
  const router = useRouter();

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < currentStock) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleShopNow = () => {
    console.log("Buy now:", {
      product: product.id,
      variant: selectedVariant?.id || null,
      quantity: 1, // This will be handled by ProductActions component
      price: currentPrice,
    });
    router.push(
      `/checkout?mode=buyNow&productId=${product.id}&quantity=${quantity}`
    );
  };

  const handleAddToCart = async () => {
    let currentUser = user;
    if (!currentUser) {
      const authResult = await checkAuth();
      if (!authResult.success) {
        toast.error("Please log in to add product");
        router.push(
          `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );
        setIsLoading(false);
        return;
      }
      currentUser = authResult.user;
    }
    setIsLoading(true);

    const cartObject: Omit<CartItem, "id"> = {
      productId: product.id,
      title: product.title,
      brand: product.brand,
      image: selectedVariant?.image || product.images[0],
      variant: selectedVariant || undefined,
      slug: product.slug,
      quantity,
      originalPrice: product.originalPrice,
      price: currentPrice,
    };
    const { addToCart } = useCartStore.getState();

    try {
      const res = await addToCart(cartObject);
      console.log(res);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Desktop Actions */}
      <div className="items-center gap-4 md:flex hidden">
        <h3 className="text-lg text-gray-900">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 border border-gray-300 rounded-full">
            <button
              onClick={() => handleQuantityChange("decrease")}
              disabled={quantity <= 1 || isLoading}
              className="p-2 rounded-full bg-black text-white  cursor-pointer disabled:cursor-not-allowed"
            >
              <Minus size={20} />
            </button>
            <span className="px-4 py-2 font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increase")}
              disabled={quantity >= currentStock || isLoading}
              className="p-2 rounded-full bg-black text-white cursor-pointer disabled:cursor-not-allowed"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3 md:block hidden">
        {totalStock === 0 ? (
          <div className="flex items-center justify-center h-12 w-full rounded-xs bg-danger/10 text-danger font-medium text-[15px] tracking-wide border border-danger/20">
            Out of Stock
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleShopNow}
              disabled={currentStock === 0 || isLoading}
              className="h-12 w-2/5 cursor-pointer bg-info text-white hover:bg-info/90 font-medium rounded-xs disabled:opacity-80 disabled:cursor-not-allowed transition-colors"
            >
              Shop Now
            </button>
            <button
              onClick={handleAddToCart}
              disabled={currentStock === 0 || isLoading}
              className="w-2/5 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xs cursor-pointer
         flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <span className="text-sm font-medium">Adding...</span>
                  <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  Add To Cart
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* <button
            onClick={onWishlistToggle}
            className="h-12 w-12 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button> */}

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
                  disabled={quantity <= 1 || isLoading}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  disabled={quantity >= currentStock || isLoading}
                  className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            {/* <button
              onClick={onWishlistToggle}
              disabled={isLoading}
              className="h-10 w-10 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-danger text-danger" : "text-gray-600"
                }`}
              />
            </button> */}
          </div>

          {/* Action Buttons Row */}
          <div className="space-y-3">
            {totalStock === 0 ? (
              <div className="flex items-center justify-center h-12 w-full rounded-lg bg-danger/10 text-danger font-medium text-[15px] tracking-wide border border-danger/20">
                Out of Stock
              </div>
            ) : (
              <div className="flex flex-col gap-3 md:flex-row">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock === 0 || isLoading}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg
          flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleShopNow}
                  disabled={currentStock === 0 || isLoading}
                  className="flex-1 h-12 bg-info text-white hover:bg-info/90 font-medium rounded-lg 
          disabled:opacity-80 disabled:cursor-not-allowed transition-colors"
                >
                  Shop Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductActions;
