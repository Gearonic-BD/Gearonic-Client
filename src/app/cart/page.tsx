"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CartItemsList from "@/components/CartItemsList";
import CartVoucherInput from "@/components/CartVoucherInput";
import OrderSummary from "@/components/OrderSummary";
import MobileOrderSummary from "@/components/MobileOrderSummary";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { SuspenseLoading } from "@/utils/suspenseLoaders";

const CartPage = () => {
  const items = useCartStore((state) => state.cart.items);
  console.log(items);
  const removeItem = useCartStore((state) => state.removeFromCart);

  const shipping = useCartStore((state) => state.cart.shipping);
  const isCartLoaded = useCartStore((state) => state.isCartLoaded);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = useCartStore((state) => state.cart.discount);
  const finalTotal = subtotal - discount;
  const changeShipping = useCartStore((state) => state.changeShipping);

  const totalSavings = 0;
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");

  const handleApplyVoucher = () => {
    //TODO: write the apply voucher code here
    setError("Invalid Voucher Used");
  };

  if (!isCartLoaded) {
    return (
      <div className="min-h-[80vh]">
        <SuspenseLoading />;
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <CartItemsList items={items} removeItem={removeItem} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb items={[{ label: "Cart", href: "/cart" }]} />
          <div className="grid mt-1 grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-md shadow-sm border border-gray-200">
                <div className="px-4 py-3 md:px-6 md:py-4 border-b border-gray-200">
                  <h2 className="md:text-lg font-semibold text-gray-900">
                    Cart Items
                  </h2>
                </div>
                <CartItemsList items={items} removeItem={removeItem} />
                <div className="px-4 py-3 md:px-6 md:py-4 md:hidden border-b border-gray-200">
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

            {/* Order Summary */}
            <div className="md:col-span-1 hidden md:block">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                total={finalTotal}
                totalSavings={totalSavings}
                voucherCode={voucherCode}
                setVoucherCode={setVoucherCode}
                error={error}
                setError={setError}
                onApplyVoucher={handleApplyVoucher}
                changeShipping={changeShipping}
                itemsCount={items.length}
                items={items}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Order Summary */}
      <MobileOrderSummary
        subtotal={subtotal}
        totalSavings={totalSavings}
        items={items}
      />
    </>
  );
};

export default CartPage;
