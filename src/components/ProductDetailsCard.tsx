"use client";

import { useState } from "react";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import ProductVariants from "./ProductVariants";
import ProductActions from "./ProductActions";

import { Product, Variant } from "@/types/types";

interface ProductDetailsCardProps {
  product: Product;
}

const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.hasVariants && product.variants.length > 0
      ? product.variants[0]
      : null
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if product has valid variants
  const hasValidVariants = product.hasVariants && product.variants.length > 0;

  // Get current price based on variant or product pricing
  const getCurrentPrice = () => {
    if (hasValidVariants && selectedVariant) {
      return selectedVariant.price;
    }
    return product.discountPrice || product.originalPrice;
  };

  // Get current stock
  const getCurrentStock = () => {
    if (hasValidVariants && selectedVariant) {
      return selectedVariant.stock;
    }
    return product.totalStock;
  };

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    const currentPrice = getCurrentPrice();
    if (hasValidVariants && selectedVariant) {
      // For variants, compare with original price
      return Math.round(
        ((product.originalPrice - currentPrice) / product.originalPrice) * 100
      );
    } else {
      // For non-variant products, compare discountPrice with originalPrice
      if (
        product.discountPrice &&
        product.discountPrice < product.originalPrice
      ) {
        return Math.round(
          ((product.originalPrice - product.discountPrice) /
            product.originalPrice) *
            100
        );
      }
    }
    return 0;
  };

  // Get carousel images
  const getCarouselImages = () => {
    if (hasValidVariants && selectedVariant) {
      if (selectedVariant.image) {
        return [selectedVariant.image, ...product.images];
      }
    }
    return product.images;
  };

  const carouselImages = getCarouselImages();
  const currentPrice = getCurrentPrice();
  const currentStock = getCurrentStock();
  const discountPercentage = getDiscountPercentage();

  const handleVariantChange = (variant: Variant) => {
    setSelectedVariant(variant);
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sm:mx-6 md:mx-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        {/* Product Image Gallery */}
        <div>
          <ProductImageGallery
            images={carouselImages}
            productTitle={product.title}
          />
        </div>

        {/* Product Info and Actions */}
        <div className="space-y-2 sm:space-y-4">
          <ProductInfo
            title={product.title}
            brand={product.brand}
            category={product.category}
            rating={product.rating}
            sold={product.sold}
            originalPrice={product.originalPrice}
            currentPrice={currentPrice}
            discountPercentage={discountPercentage}
            features={product.features}
          />

          {/* Variants - Only show if product has valid variants */}
          {hasValidVariants && (
            <ProductVariants
              variants={product.variants}
              selectedVariant={selectedVariant}
              onVariantChange={handleVariantChange}
            />
          )}

          {/* Product Actions */}
          <ProductActions
            currentStock={currentStock}
            selectedVariant={selectedVariant}
            totalStock={product.totalStock}
            currentPrice={currentPrice}
            isWishlisted={isWishlisted}
            onWishlistToggle={handleWishlistToggle}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
