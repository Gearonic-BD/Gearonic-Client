"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CartItemsList from "@/components/CartItemsList";
import CartVoucherInput from "@/components/CartVoucherInput";
import OrderSummary from "@/components/OrderSummary";
import MobileOrderSummary from "@/components/MobileOrderSummary";
import { useCartStore } from "@/store/cart";
import { SuspenseLoading } from "@/utils/suspenseLoaders";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const items = cart.items;
  const discount = cart.discount;
  const voucher = cart.voucher;

  const removeItem = useCartStore((state) => state.removeFromCart);
  const removeVoucher = useCartStore((state) => state.removeVoucher);
  const isCartLoaded = useCartStore((state) => state.isCartLoaded);
  const validateAndApplyVoucher = useCartStore(
    (state) => state.validateAndApplyVoucher,
  );
  const router = useRouter();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // Cart page: total = subtotal - discount only (no shipping; shipping shown at checkout)
  const cartTotal = subtotal - discount;
  const totalSavings = discount;
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/auth/api/status");
        if (!res.data?.isAuthenticated) {
          router.replace("/login?redirect=/cart");
          return;
        }
      } catch {
        router.replace("/login?redirect=/cart");
        return;
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [router]);

  const handleApplyVoucher = async () => {
    setError("");
    setVoucherLoading(true);
    // Yield so React commits loading state before we block on the API (so spinner is visible)
    await new Promise((r) => setTimeout(r, 0));
    try {
      const result = await validateAndApplyVoucher(voucherCode);
      if (result.success) {
        setVoucherCode("");
        setError("");
      } else {
        setError(result.message || "Invalid voucher.");
      }
    } finally {
      await new Promise((r) => setTimeout(r, 300));
      setVoucherLoading(false);
    }
  };

  if (!authChecked || !isCartLoaded) {
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
                    isLoading={voucherLoading}
                    appliedCode={voucher?.code}
                    onRemove={removeVoucher}
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1 hidden md:block">
              <OrderSummary
                subtotal={subtotal}
                total={cartTotal}
                totalSavings={totalSavings}
                voucherCode={voucherCode}
                setVoucherCode={setVoucherCode}
                error={error}
                setError={setError}
                onApplyVoucher={handleApplyVoucher}
                voucherLoading={voucherLoading}
                appliedCouponCode={voucher?.code}
                onRemoveCoupon={removeVoucher}
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
        finalTotal={cartTotal}
        items={items}
      />
    </>
  );
};

export default CartPage;
