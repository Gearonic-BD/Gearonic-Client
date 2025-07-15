"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CartVoucherInput from "@/components/CartVoucherInput";
import CheckoutItemCard from "@/components/CheckoutItemCard";
import Input from "@/components/Input";
import useCartTotalItems from "@/hooks/useCartTotalItems";
import { useCartStore } from "@/store/cart";
import { redirect } from "next/navigation";
import React, { useState } from "react";

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

  const handleApplyVoucher = () => {
    //TODO: write the apply voucher code here
    setError("Invalid Voucher Used");
  };

  if (items.length === 0) {
    return redirect("/");
  }

  return (
    <div className="container px-4 ml:px-2 lg:px-0 mx-auto max-w-[1280px]">
      <Breadcrumb items={[{ label: "Checkout", href: "/checkout" }]} />
      {/* below will be the billing information form */}
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-white p-6 h-fit rounded-md shadow-sm">
            <h2 className="text-lg font-medium">Billing Information</h2>
            {openAddressBar && (
              <>
                <div className="w-full h-[1px] bg-gray-200 my-2" />
                <form action="" className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Recipient's Full Name"
                        label="Name"
                        className="w-full"
                        required
                        error="Name is required"
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        label="Mobile"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="zone"
                      >
                        Zone
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        name="zone"
                        id="zone"
                        className="w-full border border-gray-300 outline-none rounded-xs text-sb px-3 py-2"
                        value={
                          shipping === 120 ? "outside-dhaka" : "inside-dhaka"
                        }
                        onChange={(e) =>
                          changeShipping(
                            e.target.value === "outside-dhaka" ? 120 : 60
                          )
                        }
                      >
                        <option value="inside-dhaka">Inside Dhaka City</option>
                        <option value="outside-dhaka">
                          Outside Dhaka City
                        </option>
                      </select>
                    </div>
                    <div>
                      <Input
                        type="text"
                        name="address"
                        placeholder="Full Address"
                        label="Address"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Special Instructions (Optional)"
                      label="Comment"
                      className="w-full"
                      required={false}
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button className="w-fit block text-center bg-danger hover:bg-danger/90 cursor-pointer text-white font-medium py-3 px-8 rounded-sm transition-colors">
                      Cancel
                    </button>
                    <button className="w-fit block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-8 rounded-sm transition-colors">
                      Save Address
                    </button>
                  </div>
                </form>
              </>
            )}
            <div className="w-full flex justify-center">
              {!openAddressBar && (
                <button
                  onClick={() => setOpenAddressBar(true)}
                  className="w-fit block text-center text-primary border border-primary transition-all hover:-translate-y-1 cursor-pointer font-medium py-3 px-8 rounded-sm "
                >
                  + Add Shipping Address
                </button>
              )}
            </div>
          </div>
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
            </div>
            <div className="mt-4 px-2">
              <div className="space-y-2 mt-3 flex flex-col ml:hidden">
                <div className="space-y-2 flex-1">
                  <div className="grid grid-cols-4 gap-4 border-b border-b-gray-200 pb-1 text-sm">
                    <span className="text-gray-700 col-span-3 text-right">
                      Subtotal ({totalItems} items):
                    </span>
                    <span className="font-medium text-right">
                      ৳{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 border-b border-b-gray-200 pb-1 text-sm">
                    <span className="text-sm col-span-3 text-right text-gray-500">
                      Shipping:
                    </span>
                    <span className="font-medium text-sm text-right">
                      ৳{shipping.toLocaleString()}
                    </span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="grid grid-cols-4 gap-4 border-b border-b-gray-200 pb-1 text-sm">
                      <span className="text-gray-500 col-span-3 text-right">
                        Total Savings:
                      </span>
                      <span className="font-medium text-success text-right">
                        -৳{totalSavings.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 text-lg gap-2">
                  <span className="col-span-3 text-right">Total:</span>
                  <span className="text-right text-danger">
                    ৳{finalTotal.toLocaleString()}
                  </span>
                </div>

                <div className="w-full flex justify-end">
                  <button className="w-fit block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-8 rounded-sm transition-colors">
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-white p-3 lg:p-6 sticky top-36 rounded-md shadow-sm h-fit hidden ml:block">
          <h2 className="text-lg font-medium">Order information</h2>
          <div className="w-full h-[1px] bg-gray-200 my-2" />
          <div className="space-y-4 flex flex-col">
            <div className="space-y-3 flex-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="font-medium">
                  ৳{subtotal.toLocaleString()}
                </span>
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
                <span className="">৳{finalTotal.toLocaleString()}</span>
              </div>
            </div>
            <button className="w-full block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-4 rounded-sm transition-colors">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
