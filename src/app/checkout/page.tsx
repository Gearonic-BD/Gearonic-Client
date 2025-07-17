"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CheckoutSummary from "@/components/MobileCheckoutSummary";
import useCartTotalItems from "@/hooks/useCartTotalItems";
import { useCartStore } from "@/store/cart";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import CheckoutShippingAddress from "@/components/CheckoutShippingAddress";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import CheckoutOrderInfoSidebar from "@/components/CheckoutOrderInfoSidebar";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.cart.items);
  const shipping = useCartStore((state) => state.cart.shipping);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = useCartStore((state) => state.cart.discount);
  const finalTotal = subtotal - discount + shipping;
  const changeShipping = useCartStore((state) => state.changeShipping);
  const totalItems = useCartTotalItems();

  const totalSavings = 110;
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");
  const [openAddressBar, setOpenAddressBar] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    zone: shipping === 120 ? "outside-dhaka" : "inside-dhaka",
    address: "",
    comment: "",
  });
  const router = useRouter();

  const handleApplyVoucher = () => {
    //TODO: write the apply voucher code here
    setError("Invalid Voucher Used");
  };

  const handleCancelAddressBar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenAddressBar(false);
  };

  const handleSaveAddress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenAddressBar(false);
  };
  const handlePaymentClick = () => {
    //TODO: Create an order and get the orderID
    //TODO: redirect user to payment page with orderID like '/payment?orderID=[order-id]'
    const orderID = "6ac5896777851234567890";
    router.push(`/payment?orderId=${orderID}`);
  };

  if (items.length === 0) {
    return redirect("/");
  }

  return (
    <>
      <div className="container px-4 xl:px-0 mx-auto max-w-[1280px]">
        <Breadcrumb items={[{ label: "Checkout", href: "/checkout" }]} />
        {/* below will be the billing information form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-8">
          <div className="sm:col-span-2 flex flex-col gap-4">
            <CheckoutShippingAddress
              address={address}
              setAddress={setAddress}
              openAddressBar={openAddressBar}
              setOpenAddressBar={setOpenAddressBar}
              handleSaveAddress={handleSaveAddress}
              handleCancelAddressBar={handleCancelAddressBar}
              changeShipping={changeShipping}
            />
            <CheckoutOrderSummary
              items={items}
              voucherCode={voucherCode}
              setVoucherCode={setVoucherCode}
              error={error}
              setError={setError}
              handleApplyVoucher={handleApplyVoucher}
            />
          </div>
          <CheckoutOrderInfoSidebar
            totalItems={totalItems}
            subtotal={subtotal}
            shipping={shipping}
            voucherCode={voucherCode}
            setVoucherCode={setVoucherCode}
            error={error}
            setError={setError}
            handleApplyVoucher={handleApplyVoucher}
            totalSavings={totalSavings}
            finalTotal={finalTotal}
            onProceedToPay={handlePaymentClick}
          />
        </div>
      </div>
      <CheckoutSummary
        total={finalTotal}
        shipping={shipping}
        onPaymentClick={handlePaymentClick}
      />
    </>
  );
};

export default CheckoutPage;
