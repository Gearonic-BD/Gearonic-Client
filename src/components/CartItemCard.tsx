"use client";

import { CartItem, useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { slugify } from "@/utils/slugify";
import { debounce } from "lodash";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const CartItemCard = ({
  item,
  index,
  removeItem,
  cartLen,
}: {
  item: CartItem;
  index: number;
  removeItem: () => void;
  cartLen: number;
}) => {
  const updateQty = useCartStore((state) => state.updateQty);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const isProductWishlisted = useWishlistStore(
    (state) => state.isProductWishlisted
  );
  const { checkAuth, user } = useAuth();
  const router = useRouter();

  const isOutOfStock = item.stock === 0 || item.stock < item.quantity;
  const [isWishlisted, setIsWishlisted] = useState(
    isProductWishlisted(item.productId)
  );
  const [isWishlisting, setIsWishlisting] = useState(false);

  useEffect(() => {
    setIsWishlisted(isProductWishlisted(item.productId));
  }, [item.productId, isProductWishlisted]);

  // Create a debounced version of updateQty
  const debouncedUpdateQty = useCallback(
    debounce((id: string, quantity: number) => {
      updateQty(id, quantity);
    }, 300),
    [updateQty]
  );

  // Store the current quantity in a ref for immediate UI updates
  const [localQuantity, setLocalQuantity] = useState(item.quantity);

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const handleIncrease = () => {
    if (isOutOfStock) return;
    const newQuantity = localQuantity + 1;
    if (newQuantity > item.stock) return;
    setLocalQuantity(newQuantity);
    debouncedUpdateQty(item.id, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = Math.max(1, localQuantity - 1);
    setLocalQuantity(newQuantity);
    debouncedUpdateQty(item.id, newQuantity);
  };

  const handleWishlist = async () => {
    let currentUser = user;
    if (!currentUser) {
      const authResult = await checkAuth();
      if (!authResult.success) {
        router.push(
          `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }
      currentUser = authResult.user;
    }

    setIsWishlisting(true);
    if (isWishlisted) {
      const success = await removeFromWishlist(item.productId);
      if (success) {
        setIsWishlisted(false);
      }
    } else {
      const success = await addToWishlist(item.productId);
      if (success) {
        setIsWishlisted(true);
        // Remove from cart after adding to wishlist
        removeItem();
      }
    }
    setIsWishlisting(false);
  };

  return (
    <div>
      <div
        className={`px-4 sm:px-6 py-4 md:py-6 ${
          isOutOfStock ? "bg-red-50/50" : ""
        }`}
      >
        {isOutOfStock && (
          <div className="mb-3 p-2 bg-danger/10 border border-danger/20 rounded-md">
            <p className="text-sm font-medium text-danger">
              This item is out of stock. Please remove it or add it to your
              wishlist to proceed with checkout.
            </p>
          </div>
        )}
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0 relative">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className={`w-20 h-20 object-cover rounded-sm border border-gray-200 ${
                isOutOfStock ? "opacity-60" : ""
              }`}
            />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-sm">
                <span className="text-xs font-semibold text-white px-2 py-1 bg-danger rounded">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex xs:flex-row flex-col justify-between items-start gap-1 xs:gap-4">
              <div className="flex-1">
                <Link
                  href={`${
                    item.slug
                      ? `/product/${item.slug}`
                      : `/product/${slugify(item.title)}`
                  }`}
                  className={`text-sm xs:text-base text-sb font-medium ${
                    isOutOfStock ? "text-gray-500" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </Link>
                <p className="text-xs xs:text-sm text-gray-600 mb-2">
                  Brand: {item.brand}
                </p>
                <div className="flex flex-wrap gap-2 mb-1">
                  {item.variant ? (
                    <>
                      {item.variant.color && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Color: {item.variant.color}
                        </span>
                      )}
                      {item.variant.size && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Size: {item.variant.size}
                        </span>
                      )}
                    </>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="xs:text-right">
                <div
                  className={`text-lg sm:text-xl font-bold ${
                    isOutOfStock ? "text-gray-400" : "text-danger"
                  }`}
                >
                  ৳{item.price.toLocaleString()}
                </div>
                {item.originalPrice > item.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ৳{item.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
          </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-2">
          {/* Quantity Controls */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3">
              <span className="text-sm hidden ml:block font-medium text-gray-700">
                Quantity:
              </span>
              <span className="text-sm ml:hidden block font-medium text-gray-700">
                Qty:
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={handleDecrease}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                  {localQuantity}
                </span>
                <button
                  className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  onClick={handleIncrease}
                  disabled={localQuantity >= item.stock}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {isOutOfStock && (
              <button
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium bg-white border rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  isWishlisted
                    ? "text-danger border-danger/30 hover:bg-red-50"
                    : "text-danger border-danger/30 hover:bg-red-50"
                }`}
                onClick={handleWishlist}
                disabled={isWishlisting}
              >
                <Heart
                  size={14}
                  className={isWishlisting ? "animate-pulse" : ""}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
                <span className="ml:block hidden">
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </span>
              </button>
            )}
            <button
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-danger bg-white border border-gray-300 rounded-md hover:bg-red-50 transition-colors"
              onClick={removeItem}
            >
              <Trash2 size={14} />
              <span className="ml:block hidden">Remove</span>
            </button>
          </div>
        </div>
      </div>
      {index < cartLen - 1 && <hr className="border-gray-200" />}
    </div>
  );
};

export default CartItemCard;
