import React from "react";

interface PaymentMobileSummaryProps {
  totalItems: number;
  shipping: number;
  totalAmount: number;
  onPay: () => void;
}

const PaymentMobileSummary: React.FC<PaymentMobileSummaryProps> = ({
  totalItems,
  shipping,
  totalAmount,
  onPay,
}) => {
  return (
    <div className="ml:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-70 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-end mb-1">
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-gray-700">Subtotal:</p>
              <p className="text-xs text-gray-500">
                ({totalItems} items & shipping fee(৳{shipping}) included)
              </p>
            </div>
            <p className="text-base text-gray-700 font-semibold">
              ৳{totalAmount?.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <p className="text-lg font-bold text-gray-800">Total Amount:</p>
            <p className="text-xl font-extrabold text-danger">
              ৳{totalAmount?.toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={onPay}
          className="ml-4 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-sm transition-colors"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentMobileSummary;
