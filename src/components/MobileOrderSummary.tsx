import React from "react";
import CartShippingSelector from "./CartShippingSelector";
import Link from "next/link";

interface MobileOrderSummaryProps {
  subtotal: number;
  shipping: number;
  changeShipping: (val: number) => void;
  onCheckout: () => void;
}

const MobileOrderSummary: React.FC<MobileOrderSummaryProps> = ({
  subtotal,
  shipping,
  changeShipping,
}) => (
  <div className="md:hidden fixed bottom-18 xs:bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
    <div className="px-4 py-3">
      <CartShippingSelector
        shipping={shipping}
        changeShipping={changeShipping}
        variant="mobile"
      />
      <div className="flex items-center gap-2 justify-between">
        <div className="flex flex-col flex-1 justify-center gap-1">
          <div className="flex justify-end items-center gap-2">
            <p className="text-lg font-medium text-gray-800">Subtotal:</p>
            <p className="text-lg text-danger font-bold ">
              ৳{subtotal.toLocaleString()}
            </p>
          </div>
          <div className="flex justify-end items-center gap-2">
            <p className="text-base text-gray-800">Shipping Charge:</p>
            <p className="text-base font-medium">৳{shipping}</p>
          </div>
        </div>
        <Link
          href={"/checkout"}
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-sm transition-colors"
        >
          Checkout
        </Link>
      </div>
    </div>
  </div>
);

export default MobileOrderSummary;
