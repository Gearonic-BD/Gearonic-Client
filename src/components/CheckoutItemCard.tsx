import { CartItem } from "@/store/cart";
import React from "react";
import { optimizeImageKitUrl } from "@/utils/optimizeImageKit";

const CheckoutItemCard = ({
  item,
  index,
  items,
}: {
  item: CartItem;
  index: number;
  items: CartItem[];
}) => {
  return (
    <div key={item.id}>
      <div className="px-2 py-3">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={optimizeImageKitUrl(item.image, 200)}
              alt={item.title}
              className="w-18 h-18 object-cover rounded-sm border border-gray-200"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex xs:flex-row flex-col justify-between items-start gap-1 xs:gap-4">
              <div className="flex-1">
                <h3 className="text-sm text-gray-900 line-clamp-2">
                  <span className="font-bold">{item.quantity} x</span>{" "}
                  {item.title}
                </h3>

                <p className="text-xsm xs:text-sm text-gray-600 mb-2">
                  Brand: {item.brand}
                </p>
              </div>

              {/* Price */}
              <div className="xs:text-right">
                <div className="text-lg font-bold text-danger">
                  ৳{(item.price * item.quantity).toLocaleString()}
                </div>
                {item.originalPrice > item.price && (
                  <div className="text-xsm text-gray-500 line-through">
                    ৳{(item.originalPrice * item.quantity).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
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
        </div>
      </div>
      {index !== items.length - 1 && <hr className="border-gray-200" />}
    </div>
  );
};

export default CheckoutItemCard;
