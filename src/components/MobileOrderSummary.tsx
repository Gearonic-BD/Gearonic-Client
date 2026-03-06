import React from "react";
import Link from "next/link";
import { CartItem } from "@/store/cart";

interface MobileOrderSummaryProps {
  subtotal: number;
  totalSavings: number;
  finalTotal: number;
  items?: CartItem[];
}

const MobileOrderSummary: React.FC<MobileOrderSummaryProps> = ({
  subtotal,
  totalSavings,
  finalTotal,
  items = [],
}) => {
  const hasOutOfStockItems = items.some(
    (item) => item.stock === 0 || item.stock < item.quantity
  );

  return (
    <div className="md:hidden fixed bottom-18 xs:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 xs:gap-4 justify-between">
          <div className="flex flex-col flex-1 justify-center gap-0.5">
            <div className="flex justify-end items-center gap-2">
              <p className="text-sm text-gray-600">Subtotal:</p>
              <p className="text-sm font-medium text-gray-800">
                ৳{subtotal.toLocaleString()}
              </p>
            </div>
            {totalSavings > 0 && (
              <div className="flex justify-end items-center gap-2">
                <p className="text-sm text-gray-600">You Save:</p>
                <p className="text-sm font-medium text-green-600">
                  -৳{totalSavings.toLocaleString()}
                </p>
              </div>
            )}
            <div className="flex justify-end items-center gap-2">
              <p className="text-lg font-medium text-gray-800">Total:</p>
              <p className="text-lg text-danger font-bold">
                ৳{finalTotal.toLocaleString()}
              </p>
            </div>
          </div>
          {hasOutOfStockItems ? (
            <div className="px-4 py-3 bg-danger/10 border border-danger/20 rounded-sm max-w-[200px]">
              <p className="text-xs text-danger text-center font-medium">
                Update Cart To Proceed
              </p>
            </div>
          ) : (
            <Link
              href={"/checkout"}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-sm transition-colors shrink-0"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileOrderSummary;
