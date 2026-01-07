import React from "react";
import CartVoucherInput from "./CartVoucherInput";
import Link from "next/link";
import { CartItem } from "@/store/cart";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  totalSavings: number;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  error: string;
  setError: (msg: string) => void;
  onApplyVoucher: () => void;
  changeShipping: (val: number) => void;
  itemsCount: number;
  items?: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  total,
  totalSavings,
  voucherCode,
  setVoucherCode,
  error,
  setError,
  onApplyVoucher,
  itemsCount,
  items = [],
}) => {
  const hasOutOfStockItems = items.some(
    (item) => item.stock === 0 || item.stock < item.quantity
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24 ml:top-36">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      </div>
      <div className="p-3 lg:p-6 space-y-4">
        <div className="space-y-3">
          <div className="space-y-3">
            <CartVoucherInput
              voucherCode={voucherCode}
              setVoucherCode={setVoucherCode}
              error={error}
              setError={setError}
              onApply={onApplyVoucher}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({itemsCount} items)</span>
            <span className="font-medium">৳{subtotal.toLocaleString()}</span>
          </div>
          {/* <CartShippingSelector
          shipping={shipping}
          changeShipping={changeShipping}
          variant="desktop"
        /> */}
        </div>
        <hr className="border-gray-200" />

        <div className="flex flex-col text-lg gap-2">
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 ">Total Savings</span>
              <span className="font-medium text-success">
                -৳{totalSavings.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="">Total</span>
            <span className="">৳{total.toLocaleString()}</span>
          </div>
        </div>
        {hasOutOfStockItems ? (
          <div className="w-full p-3 bg-danger/10 border border-danger/20 rounded-sm">
            <p className="text-sm text-danger text-center font-medium">
              Update Your Cart To Proceed
            </p>
          </div>
        ) : (
          <Link
            href={"/checkout"}
            className="w-full block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-4 rounded-sm transition-colors"
          >
            Proceed to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
