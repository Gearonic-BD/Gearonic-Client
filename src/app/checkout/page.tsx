"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CheckoutSummary from "@/components/MobileCheckoutSummary";
import useCartTotalItems from "@/hooks/useCartTotalItems";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CheckoutShippingAddress from "@/components/CheckoutShippingAddress";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import CheckoutOrderInfoSidebar from "@/components/CheckoutOrderInfoSidebar";
import { SuspenseLoading } from "@/utils/suspenseLoaders";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";

const CheckoutPage = () => {
  const items = useCartStore((state) => state.cart.items);
  const shipping = useCartStore((state) => state.cart.shipping);
  const isCartLoaded = useCartStore((state) => state.isCartLoaded);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = useCartStore((state) => state.cart.discount);
  const finalTotal = subtotal - discount + shipping;
  const changeShipping = useCartStore((state) => state.changeShipping);
  const totalItems = useCartTotalItems();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalSavings = 110;
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [voucherError, setVoucherError] = useState("");
  const [openAddressBar, setOpenAddressBar] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    zone: shipping === 120 ? "outside" : "inside",
    address: "",
    comment: "",
  });
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const [isAddressLoading, setIsAddressLoading] = useState(true);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        // Use axiosInstance to make the GET request.
        // `withCredentials: true` will ensure the HttpOnly cookie is sent.
        const response = await axiosInstance.get("/api/checkout/address");

        if (response.data) {
          // Address found, update the state
          setAddress(response.data);
          setIsAddressSaved(true);
          // Ensure the shipping zone is correctly set
          changeShipping(response.data.zone === "outside" ? 120 : 60);
        } else {
          // No address found (backend returns null or an empty object)
          setIsAddressSaved(false);
        }
      } catch (error) {
        // Handle different error status codes from the backend
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            router.push("/login");
            toast.error("Please log in to continue checkout.");
          } else {
            console.error(
              "Failed to fetch address with status:",
              error.response.status
            );
            toast.error("Failed to load your saved address.");
          }
        } else {
          console.error("Error fetching address:", error);
          toast.error("An error occurred while fetching your address.");
        }
      } finally {
        setIsAddressLoading(false);
      }
    };

    // Only run this fetch if the cart is loaded and there are items
    if (isCartLoaded && items.length > 0) {
      fetchAddress();
    }
  }, [
    changeShipping,
    isCartLoaded,
    items.length,
    router,
    setAddress,
    setIsAddressSaved,
  ]);
  useEffect(() => {
    if (isCartLoaded && items.length === 0 && !orderPlaced) {
      router.replace("/");
    }
  }, [isCartLoaded, items, orderPlaced, router]);

  // Bangladeshi mobile number validation
  const validateBangladeshiMobile = (mobile: string) => {
    const cleanMobile = mobile.replace(/[\s\-\+]/g, "");

    const patterns = [/^8801[1-9]\d{8}$/, /^01[1-9]\d{8}$/, /^1[1-9]\d{8}$/];

    return patterns.some((pattern) => pattern.test(cleanMobile));
  };

  // Comprehensive form validation
  const validateForm = () => {
    const newErrors = {
      name: "",
      mobile: "",
      zone: "",
      address: "",
      voucher: "",
    };

    let isValid = true;

    // Name validation
    if (!address.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (address.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
      isValid = false;
    }

    // Mobile validation
    if (!address.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!validateBangladeshiMobile(address.mobile)) {
      newErrors.mobile =
        "Please enter a valid Bangladeshi mobile number (e.g., 01712345678)";
      isValid = false;
    }

    // Zone validation
    if (!address.zone) {
      newErrors.zone = "Delivery zone is required";
      isValid = false;
    }

    // Address validation
    if (!address.address.trim()) {
      newErrors.address = "Delivery address is required";
      isValid = false;
    } else if (address.address.trim().length < 10) {
      newErrors.address =
        "Please provide a detailed address (minimum 10 characters)";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleApplyVoucher = () => {
    //TODO: write the apply voucher code here
    setVoucherError("Invalid Voucher given");
  };

  const handleCancelAddressBar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenAddressBar(false);
    // Reset errors when canceling
    setError({
      name: "",
      mobile: "",
      address: "",
    });
  };

  const handleSaveAddress = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await axiosInstance.post("/api/checkout/address", {
        name: address.name,
        mobile: address.mobile,
        address: address.address,
        zone: address.zone === "outside" ? "outside" : "inside",
        comment: address.comment,
      });

      if (response.status === 200) {
        setIsAddressSaved(true);
        setOpenAddressBar(false);

        // Update the local state with the saved address from the backend response
        setAddress(response.data);

        // Clear any existing errors
        setError({
          name: "",
          mobile: "",
          address: "",
        });

        // Show a success toast
        toast.success("Address saved successfully!");
      } else {
        // Handle non-200 responses if needed
        toast.error("Failed to save address. Please try again.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          toast.error("You must be logged in to save an address.");
          router.push("/login");
        } else {
          toast.error(
            error.response.data.message ||
              "Failed to save address. Please try again."
          );
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const [placingOrder, setPlacingOrder] = useState(false);

  const handlePaymentClick = async () => {
    if (placingOrder) return;

    if (!isAddressSaved) {
      toast.error("Please save your shipping address first.");
      setOpenAddressBar(true);
      return;
    }

    if (!items.length) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      const payload = {
        address: {
          name: address.name,
          mobile: address.mobile,
          zone: address.zone, // "inside" or "outside"
          address: address.address,
          comment: address.comment || "",
        },
        shipping, // 60 or 120
      };

      const res = await axiosInstance.post(
        "/api/checkout/create-order",
        payload
      );

      if (res.status === 200 && res.data?.orderId) {
        setOrderPlaced(true);
        router.push(`/payment?orderId=${res.data.orderId}`);
        clearCart();
        toast.success("Order created! Redirecting to payment...");
      } else {
        toast.error("Failed to create order.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error("Please log in to continue.");
        router.push("/login");
      } else {
        toast.error("Failed to create order.");
      }
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!isCartLoaded || isAddressLoading) {
    return (
      <div className="min-h-[60vh]">
        <SuspenseLoading message="Loading cart..." />
      </div>
    );
  }

  if (placingOrder) {
    return (
      <div className="min-h-[80vh] opacity-40">
        <SuspenseLoading message="Placing order..." />
      </div>
    );
  }

  return (
    <>
      <div className="container px-4 xl:px-0 mx-auto max-w-[1280px]">
        <Breadcrumb items={[{ label: "Checkout", href: "/checkout" }]} />

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
              error={error}
              isSaving={isSaving}
              isAddressSaved={isAddressSaved}
            />
            <CheckoutOrderSummary
              items={items}
              voucherCode={voucherCode}
              setVoucherCode={setVoucherCode}
              error={voucherError}
              setError={setVoucherError}
              handleApplyVoucher={handleApplyVoucher}
            />
          </div>
          <CheckoutOrderInfoSidebar
            totalItems={totalItems}
            subtotal={subtotal}
            shipping={shipping}
            voucherCode={voucherCode}
            setVoucherCode={setVoucherCode}
            error={voucherError}
            setError={setVoucherError}
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
