import React from "react";
import Link from "next/link";

interface CheckoutSummaryProps {
  total: number;
  shipping: number;
  onPaymentClick: () => void;
}

const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  total,
  shipping,
  onPaymentClick,
}) => (
  <div className="sm:hidden fixed bottom-18 xs:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div className="px-4 py-3">
      <div className="flex items-center gap-2 xs:gap-4 justify-between xs:justify-end">
        <div className="flex flex-col flex-1 xs:flex-none justify-center">
          <div className="flex justify-start items-center gap-2">
            <p className="text-base xs:text-lg font-medium text-gray-800">Total:</p>
            <p className="text-base xs:text-lg text-danger font-bold ">
              ৳{total.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <p className="text-xs text-gray-500">
              Including Shipping Charge ({shipping}) and vat
            </p>
          </div>
        </div>
        <Link
          onClick={onPaymentClick}
          href={"/checkout"}
          className="bg-primary text-center hover:bg-primary/90 text-white font-medium xs:py-3 xs:px-6 py-2 px-4 rounded-sm transition-colors"
        >
          Go To Payment
        </Link>
      </div>
    </div>
  </div>
);

export default CheckoutSummary;
