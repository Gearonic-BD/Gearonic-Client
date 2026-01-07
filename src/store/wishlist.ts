import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { Product } from "@/types/types";

export type WishlistItem = {
  id: string;
  productId: string;
  createdAt: string;
  product: Product;
};

type WishlistState = {
  items: WishlistItem[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  checkWishlistStatus: (productId: string) => Promise<boolean>;
  isProductWishlisted: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  isLoading: false,

  fetchWishlist: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/api/wishlist");
      set({ items: res.data });
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      // Don't show error toast on initial load if user is not authenticated
    } finally {
      set({ isLoading: false });
    }
  },

  addToWishlist: async (productId: string) => {
    try {
      const res = await axiosInstance.post("/api/wishlist/add", { productId });
      if (res.status === 200) {
        // Refetch wishlist to get full product data
        await get().fetchWishlist();
        toast.success("Added to wishlist");
        return true;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Please log in to add to wishlist");
        } else if (error.response?.status === 400) {
          toast.error(error.response.data.message || "Already in wishlist");
        } else {
          toast.error("Failed to add to wishlist");
        }
      } else {
        toast.error("Failed to add to wishlist");
      }
      return false;
    }
  },

  removeFromWishlist: async (productId: string) => {
    try {
      const res = await axiosInstance.delete("/api/wishlist/remove", {
        data: { productId },
      });
      if (res.status === 200) {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
        toast.success("Removed from wishlist");
        return true;
      }
      return false;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Please log in to remove from wishlist");
        } else {
          toast.error("Failed to remove from wishlist");
        }
      } else {
        toast.error("Failed to remove from wishlist");
      }
      return false;
    }
  },

  checkWishlistStatus: async (productId: string) => {
    try {
      const res = await axiosInstance.get(`/api/wishlist/check/${productId}`);
      return res.data.isWishlisted;
    } catch (error) {
      console.error("Failed to check wishlist status:", error);
      return false;
    }
  },

  isProductWishlisted: (productId: string) => {
    return get().items.some((item) => item.productId === productId);
  },
}));
