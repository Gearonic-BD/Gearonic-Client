import { Product } from "@/types/types";
import Link from "next/link";
import React from "react";

// Utility function to calculate time remaining
function getTimeRemaining(endDate: string): string {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) return "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

// Utility function to calculate discount percentage
function getDiscountPercentage(original: number, discount?: number): number {
  if (!discount) return 0;
  return Math.round(((original - discount) / original) * 100);
}

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

// Server Component
export default async function FlashSaleProducts() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // Fetch flash sale products from your API
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/products/flash-sale`, {
      cache: "no-store", // Always fetch fresh data for flash sales
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product[] = await response.json();
    products = data;
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "Failed to fetch flash sale products";
    console.error("Flash sale fetch error:", err);
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          🔥 Flash Sale Items
        </h2>
        <p className="text-red-600">Unable to load flash sale products</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🔥 Flash Sale Items
        </h2>
        <p className="text-gray-600">No flash sales available right now</p>
        <p className="text-sm text-gray-500 mt-1">
          Check back later for amazing deals!
        </p>
      </div>
    );
  }

  // Success state with products
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🔥 Flash Sale Items
          <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
            {products.length} deals
          </span>
        </h2>
      </div>

      {/* Products Grid */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => {
          // const discountPercentage = Math.round(
          //   ((product.originalPrice - product.discountPrice!) /
          //     product.originalPrice) *
          //     100
          // );
          const soldPercentage =
            (product.sold / (product?.flashSaleStock || 100)) * 100;
          return (
            <div
              key={product.slug}
              className="rounded-lg relative bg-white active:scale-98 shadow-sm overflow-hidden group transition-all duration-300 active:shadow-lg active:-translate-y-1 hover:shadow-lg hover:-translate-y-1"
            >
              <Link href={`/product/${product.slug}`} className="block ">
                {/* Image Container */}
                <div className="p-4 relative">
                  {/* Make this relative */}
                  <img
                    src={product.featuredImage}
                    alt={product.title}
                    className="w-full  object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Discount Badge */}
                  <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-1.5 py-1 rounded">
                    -
                    {product.discountPrice &&
                      getDiscountPercentage(
                        product.originalPrice,
                        product.discountPrice
                      )}
                    %
                  </span>
                </div>

                {/* Content Container */}
                <div className="px-4 pb-4 flex flex-col space-y-3">
                  <h3
                    className="text-sm group-active:text-danger group-hover:text-danger transition-all font-semibold text-gray-800 line-clamp-2"
                    title={product.title}
                  >
                    {product.title}
                  </h3>

                  {/* Price & Discount Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline space-x-2">
                      <p className="text-xl font-bold text-danger">
                        ৳{product.discountPrice}
                      </p>
                      <p className="text-xs text-gray-400 line-through">
                        ৳{product.originalPrice}
                      </p>
                    </div>
                  </div>

                  {/* --- REVISED: Progress bar BESIDE sold text --- */}
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-danger h-1 rounded-full"
                        style={{ width: `${soldPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium flex-shrink-0">
                      {product.sold}/{product.flashSaleStock || 100} Sold
                    </p>
                  </div>
                </div>
              </Link>
              {product.flashSaleEnd && (
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {getTimeRemaining(product.flashSaleEnd)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Show more link if there might be more products */}
      {products.length === 20 && (
        <div className="text-center mt-6">
          <a
            href="/flash-sale"
            className="inline-flex items-center text-red-600 hover:text-red-800 font-semibold"
          >
            View All Flash Sale Items →
          </a>
        </div>
      )}
    </div>
  );
}
