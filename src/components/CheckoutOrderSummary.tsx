import React from "react";
import CheckoutItemCard from "@/components/CheckoutItemCard";
import CartVoucherInput from "@/components/CartVoucherInput";
import { CartItem } from "@/store/cart";

interface CheckoutOrderSummaryProps {
  items: CartItem[];
  voucherCode: string;
  setVoucherCode: (code: string) => void;
  error: string;
  setError: (error: string) => void;
  handleApplyVoucher: () => void;
}

const CheckoutOrderSummary: React.FC<CheckoutOrderSummaryProps> = ({
  items,
  voucherCode,
  setVoucherCode,
  error,
  setError,
  handleApplyVoucher,
}) => {
  return (
    <div className="bg-white p-3 lg:p-6 md:col-span-2 rounded-md shadow-sm h-fit">
      <h2 className="text-lg font-medium">Order Summary</h2>
      <div className="w-full h-[1px] bg-gray-200 my-2" />
      <div className="flex flex-col">
        {items.map((item, index) => (
          <CheckoutItemCard
            key={item.id}
            index={index}
            item={item}
            items={items}
          />
        ))}
        <div className="px-2 py-3 block sm:hidden">
          <CartVoucherInput
            voucherCode={voucherCode}
            setVoucherCode={setVoucherCode}
            error={error}
            setError={setError}
            onApply={handleApplyVoucher}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutOrderSummary;
