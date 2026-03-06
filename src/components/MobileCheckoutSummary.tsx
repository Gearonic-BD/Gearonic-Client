import React from "react";

interface CheckoutSummaryProps {
  total: number;
  shipping: number;
  totalSavings?: number;
  onPaymentClick: () => void;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  total,
  shipping,
  totalSavings = 0,
  onPaymentClick,
}) => (
  <div className="sm:hidden fixed bottom-18 xs:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 xs:gap-4 justify-between">
        <div className="flex flex-col flex-1 justify-center gap-0.5">
          {totalSavings > 0 && (
            <div className="flex justify-start items-center gap-2">
              <p className="text-sm text-gray-600">You Save:</p>
              <p className="text-sm font-medium text-green-600">
                -৳{totalSavings.toLocaleString()}
              </p>
            </div>
          )}
          <div className="flex justify-start items-center gap-2">
            <p className="text-lg font-medium text-gray-800">Total payable:</p>
            <p className="text-lg text-danger font-bold">
              ৳{total.toLocaleString()}
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Subtotal − discount + shipping (৳{shipping.toLocaleString()})
          </p>
        </div>
        <button
          onClick={onPaymentClick}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-sm transition-colors shrink-0"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  </div>
);

export default CheckoutSummary;
