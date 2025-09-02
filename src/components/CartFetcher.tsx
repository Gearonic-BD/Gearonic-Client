"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";
import axiosInstance from "@/utils/axiosInstance";

export default function CartFetcher() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const checkAuthAndFetchCart = async () => {
      try {
        const response = await axiosInstance.get("/auth/api/status");

        // Now we just check the isAuthenticated property from the response body.
        if (response.data.isAuthenticated) {
          fetchCart();
        } else {
          return null;
        }
      } catch (error) {
        // This catch block is now only for real errors, like a network issue.
        console.error("An unexpected error occurred:", error);
      }
    };

    checkAuthAndFetchCart();
  }, [fetchCart]);

  return null;
}
