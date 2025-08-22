import React from "react";

interface PaymentOrderSummaryProps {
  totalItems: number;
  shipping: number;
  totalAmount: number;
}

const PaymentOrderSummary: React.FC<PaymentOrderSummaryProps> = ({
  totalItems,
  shipping,
  totalAmount,
}) => {
  return (
    <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden sticky top-36">
      <div className="px-6 py-3">
        <h2 className="text-lg font-semibold">Order Summary</h2>
      </div>
      <div className="h-[1px] bg-gray-200"></div>
      <div className="py-4 px-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-2 py-2">
            <span className="text-gray-600 text-sm">
              Subtotal <br /> ({totalItems} items and shipping fee(৳{shipping})
              included)
            </span>
            <span className="font-medium text-gray-900">
              ৳{totalAmount?.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex gap-2 justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-danger">
                ৳{totalAmount?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOrderSummary;
