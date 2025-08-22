import React from "react";
import CartVoucherInput from "@/components/CartVoucherInput";

interface CheckoutOrderInfoSidebarProps {
  totalItems: number;
  subtotal: number;
  shipping: number;
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  error: string;
  setError: (error: string) => void;
  handleApplyVoucher: () => void;
  totalSavings: number;
  finalTotal: number;
  onProceedToPay: () => void;
 
}

const CheckoutOrderInfoSidebar: React.FC<CheckoutOrderInfoSidebarProps> = ({
  totalItems,
  subtotal,
  shipping,
  voucherCode,
  setVoucherCode,
  error,
  setError,
  handleApplyVoucher,
  totalSavings,
  finalTotal,
  onProceedToPay,
  
}) => {
  return (
    <div className="hidden sm:block bg-white p-3 lg:p-6 sticky top md:top-36 rounded-md shadow-sm h-fit">
      <h2 className="text-lg font-medium">Order information</h2>
      <div className="w-full h-[1px] bg-gray-200 my-2" />
      <div className="space-y-4 flex flex-col">
        <div className="space-y-3 flex-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({totalItems} items)</span>
            <span className="font-medium">৳{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <h2 className="text-sm text-gray-500">Shipping</h2>
            <span className="font-medium text-sm">
              ৳{shipping.toLocaleString()}
            </span>
          </div>
          <div>
            <CartVoucherInput
              voucherCode={voucherCode}
              setVoucherCode={setVoucherCode}
              error={error}
              setError={setError}
              onApply={handleApplyVoucher}
            />
          </div>
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 ">Total Savings</span>
              <span className="font-medium text-success">
                -৳{totalSavings.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        <hr className="border-gray-200" />
        <div className="flex flex-col text-lg gap-2">
          <div className="flex justify-between">
            <span className="">Total</span>
            <span className="text-danger font-semibold">
              ৳{finalTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          className="w-full block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-4 rounded-sm transition-colors"
          onClick={onProceedToPay}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderInfoSidebar;
