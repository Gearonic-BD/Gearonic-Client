"use client";

import CheckoutShippingAddress from "@/components/CheckoutShippingAddress";
import { useCartStore } from "@/store/cart";
import axiosInstance from "@/utils/axiosInstance";
import { SuspenseLoading } from "@/utils/suspenseLoaders";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const AdressPage = () => {
  const items = useCartStore((state) => state.cart.items);
  const shipping = useCartStore((state) => state.cart.shipping);

  const changeShipping = useCartStore((state) => state.changeShipping);
  const [error, setError] = useState({
    name: "",
    mobile: "",
    address: "",
  });
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

    fetchAddress();
  }, [changeShipping, items.length, router, setAddress, setIsAddressSaved]);

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

  if (isAddressLoading) {
    return (
      <div className="min-h-[60vh]">
        <SuspenseLoading message="Loading cart..." />
      </div>
    );
  }
  return (
    <section className="max-w-5xl mx-auto min-h-[80vh] pt-10">
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
    </section>
  );
};

export default AdressPage;
