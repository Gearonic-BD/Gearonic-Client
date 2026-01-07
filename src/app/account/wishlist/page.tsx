"use client";

import { useEffect, useRef } from "react";
import { useWishlistStore } from "@/store/wishlist";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import Breadcrumb from "@/components/Breadcrumb";
import { SuspenseLoading } from "@/utils/suspenseLoaders";
import { Heart } from "lucide-react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { items, isLoading, fetchWishlist } = useWishlistStore();
  const { checkAuth, user } = useAuth();
  const router = useRouter();
  const userIdRef = useRef<string | undefined>(user?.id);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    // Reset load flag if user changed
    if (userIdRef.current !== user?.id) {
      userIdRef.current = user?.id;
      hasLoadedRef.current = false;
    }

    // Prevent multiple simultaneous loads
    if (hasLoadedRef.current || isLoading) {
      return;
    }

    const loadWishlist = async () => {
      hasLoadedRef.current = true;

      if (!user) {
        const authResult = await checkAuth();
        if (!authResult.success) {
          router.push("/login?redirect=/account/wishlist");
          hasLoadedRef.current = false;
          return;
        }
      }

      try {
        await fetchWishlist();
      } catch {
        hasLoadedRef.current = false;
      }
    };

    loadWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh]">
        <SuspenseLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb
          items={[{ label: "Wishlist", href: "/account/wishlist" }]}
        />

        <div className="mt-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            My Wishlist
          </h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-white rounded-full p-6 mb-6 shadow-sm">
                <Heart size={48} className="text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start adding items you love to your wishlist
              </p>
              <Link
                href="/"
                className="bg-info hover:bg-info/90 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 md:gap-4">
              {items.map((item) => (
                <FeaturedProductCard key={item.id} product={item.product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
