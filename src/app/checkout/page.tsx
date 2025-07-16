"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CartVoucherInput from "@/components/CartVoucherInput";
import CheckoutItemCard from "@/components/CheckoutItemCard";
import CheckoutSummary from "@/components/CheckoutSummary";
import Input from "@/components/Input";
import useCartTotalItems from "@/hooks/useCartTotalItems";
import { useCartStore } from "@/store/cart";
import { MapPin, Phone, User } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const dummyAddress = {
  name: "John Doe",
  mobile: "01717171717",
  zone: "inside-dhaka",
  address: "123, Main Road, Dhaka",
  comment: "Please deliver to the main gate",
};

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
  // const [address, setAddress] = useState({
  //   name: "",
  //   mobile: "",
  //   zone: shipping === 120 ? "outside-dhaka" : "inside-dhaka",
  //   address: "",
  //   comment: "",
  // });

  const [address, setAddress] = useState(dummyAddress);

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
    console.log("heello");
  };

  if (items.length === 0) {
    return redirect("/");
  }

  return (
    <>
      <div className="container px-4 xl:px-0 mx-auto max-w-[1280px]">
        <Breadcrumb items={[{ label: "Checkout", href: "/checkout" }]} />
        {/* below will be the billing information form */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 lg:gap-8">
          <div className="sm:col-span-3 flex flex-col gap-4">
            <div className="bg-white p-4 ml:p-6 h-fit rounded-md shadow-sm">
              <h2 className="text-lg font-medium">Shipping Address</h2>
              {openAddressBar ? (
                <>
                  <div className="w-full h-[1px] bg-gray-200 my-2" />
                  <form action="" className="space-y-2">
                    <div className="grid md:grid-cols-2 gap-2 md:gap-4">
                      <div>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Recipient's Full Name"
                          label="Name"
                          className="w-full"
                          required
                          error="Name is required"
                          value={address.name}
                          onChange={(e) =>
                            setAddress({ ...address, name: e.target.value })
                          }
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
                          value={address.mobile}
                          onChange={(e) =>
                            setAddress({ ...address, mobile: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="col-span-1 md:col-span-2">
                        <Input
                          type="text"
                          name="address"
                          placeholder="Full Address"
                          label="Address"
                          className="w-full"
                          required
                          value={address.address}
                          onChange={(e) =>
                            setAddress({ ...address, address: e.target.value })
                          }
                        />
                      </div>
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
                          value={address.zone}
                          onChange={(e) => {
                            setAddress({ ...address, zone: e.target.value });
                            changeShipping(
                              e.target.value === "outside-dhaka" ? 120 : 60
                            );
                          }}
                        >
                          <option value="inside-dhaka">
                            Inside Dhaka City
                          </option>
                          <option value="outside-dhaka">
                            Outside Dhaka City
                          </option>
                        </select>
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
                        value={address.comment}
                        onChange={(e) =>
                          setAddress({ ...address, comment: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-4 justify-end">
                      <button
                        onClick={handleCancelAddressBar}
                        className="w-fit block text-center bg-danger hover:bg-danger/90 cursor-pointer text-white font-medium py-3 px-8 rounded-sm transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveAddress}
                        className="w-fit block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-8 rounded-sm transition-colors"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="w-full flex mt-1">
                  {address.name && address.mobile && address.address ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-4 w-full shadow-xs hover:shadow-sm transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4 w-full">
                          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                            <MapPin size={20} className="text-info" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 w-full">
                              <div className="flex items-center gap-1 flex-1">
                                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  {address.zone.replace("-", " ")}
                                </h3>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-xs text-success font-medium">
                                  Delivery Available
                                </span>
                              </div>
                              <div>
                                <button
                                  onClick={() => setOpenAddressBar(true)}
                                  className="cursor-pointer text-info hover:underline flex items-center rounded-lg transition-colors duration-200 group"
                                >
                                  Edit
                                </button>
                              </div>
                            </div>

                            <h2 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                              {address.address}
                            </h2>

                            <div className="flex gap-4">
                              <div className="flex items-center gap-1">
                                <User size={16} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                  {address.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <Phone size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {address.mobile}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setOpenAddressBar(true)}
                      className="w-fit block text-center text-primary border border-primary transition-all hover:-translate-y-1 cursor-pointer font-medium py-3 px-8 rounded-sm "
                    >
                      + Add Shipping Address
                    </button>
                  )}
                </div>
              )}
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
          </div>
          <div className=" hidden sm:block sm:col-span-2 bg-white p-3 lg:p-6 sticky top md:top-36 rounded-md shadow-sm h-fit">
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
                  <span className="text-danger font-semibold">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full block text-center bg-primary hover:bg-primary/90 cursor-pointer text-white font-medium py-3 px-4 rounded-sm transition-colors">
                Proceed to Pay
              </button>
            </div>
          </div>
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
