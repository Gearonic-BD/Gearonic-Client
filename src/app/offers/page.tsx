import { Product } from "@/types/types";
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

// Server Component
export default async function FlashSaleProducts() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    // Fetch flash sale products from your API
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
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
    <div className="w-full">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.featuredImage}
                alt={product.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />

              {/* Discount Badge */}
              {product.discountPrice && (
                <div className="absolute top-2 left-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -
                    {getDiscountPercentage(
                      product.originalPrice,
                      product.discountPrice
                    )}
                    %
                  </span>
                </div>
              )}

              {/* Timer Badge */}
              {product.flashSaleEnd && (
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {getTimeRemaining(product.flashSaleEnd)}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Product Title */}
              <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                {product.title}
              </h3>

              {/* Rating and Sold */}
              <div className="flex items-center gap-2 mb-2">
                {product.rating && (
                  <div className="flex items-center text-xs text-gray-600">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1">{product.rating.toFixed(1)}</span>
                  </div>
                )}
                <span className="text-xs text-gray-500">
                  {product.sold} sold
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                {product.discountPrice ? (
                  <>
                    <span className="text-lg font-bold text-red-600">
                      ${product.discountPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <button className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded transition-colors duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
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
