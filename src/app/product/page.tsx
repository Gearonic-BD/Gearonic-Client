"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { renderStars } from "../utils/ratings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import type { Swiper as SwiperType } from "swiper";
import { Heart, Minus, Plus, ShoppingCart, X } from "lucide-react";

const product = {
  id: "1",
  images: [
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-official-500x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-mist-black-02-500x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-02-500x500.webp",
  ],
  category: "Mobiles",
  brand: "Apple",
  title: "Blue Gean Shark L4S Sport Smart Watch",
  originalPrice: 24000,
  discountPrice: 21220,
  hasvariants: true,
  sold: 50,
  totalStock: 200,
  rating: 4.5,
  variants: [
    {
      id: "44",
      color: "black",
      price: 21250,
      stock: 100,
      image:
        "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-mist-black-01-500x500.webp",
    },
    {
      id: "45",
      color: "white",
      price: 21350,
      stock: 30,
      image:
        "https://vinetanextjs.vercel.app/images/cls-categories/electronic/charge.png",
    },
  ],
  features: ["128GB Storage", "5G Support", "iOS 15", "A14 Bionic Chip"],
};

const ProductPage = () => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.hasvariants && product.variants.length > 0
      ? product.variants[0]
      : null
  );
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  // Check if product has valid variants
  const hasValidVariants = product.hasvariants && product.variants.length > 0;

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
      return [selectedVariant.image, ...product.images];
    }
    return product.images;
  };

  const carouselImages = getCarouselImages();
  const currentPrice = getCurrentPrice();
  const currentStock = getCurrentStock();
  const discountPercentage = getDiscountPercentage();

  const handleVariantChange = (variant: (typeof product.variants)[0]) => {
    setSelectedVariant(variant);
  };

  // Reset carousel to first slide when variant changes
  useEffect(() => {
    if (mainSwiper && hasValidVariants) {
      mainSwiper.update();
      mainSwiper.slideTo(0, 300);
    }
    if (thumbsSwiper && hasValidVariants) {
      thumbsSwiper.update();
    }
  }, [selectedVariant, mainSwiper, thumbsSwiper, hasValidVariants]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxImageIndex((prev) =>
          prev > 0 ? prev - 1 : carouselImages.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxImageIndex((prev) =>
          prev < carouselImages.length - 1 ? prev + 1 : 0
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, carouselImages.length]);

  const handleQuantityChange = (action: "increase" | "decrease") => {
    if (action === "increase" && quantity < currentStock) {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      product: product.id,
      variant: selectedVariant?.id || null,
      quantity,
      price: currentPrice,
    });
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      product: product.id,
      variant: selectedVariant?.id || null,
      quantity,
      price: currentPrice,
    });
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToPrevImage = () => {
    setLightboxImageIndex((prev) =>
      prev > 0 ? prev - 1 : carouselImages.length - 1
    );
  };

  const goToNextImage = () => {
    setLightboxImageIndex((prev) =>
      prev < carouselImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="min-h-screen">
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumb
          items={[
            { label: "Products", href: "/products" },
            {
              label: product.category,
              href: `/products/${product.category.toLowerCase()}`,
            },
            {
              label: product.brand,
              href: `/products/${product.category.toLowerCase()}/${product.brand.toLowerCase()}`,
            },
            { label: product.title },
          ]}
        />
      </section>

      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:mx-6 md:mx-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            <div>
              <div className="relative p-4">
                <Swiper
                  modules={[Thumbs]}
                  thumbs={{ swiper: thumbsSwiper }}
                  onSwiper={(swiper) => {
                    setMainSwiper(swiper);
                  }}
                  className="main-swiper rounded-lg overflow-hidden"
                  spaceBetween={10}
                >
                  {carouselImages.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(index)}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${product.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Thumbnail Swiper */}
              <Swiper
                modules={[Thumbs]}
                onSwiper={(swiper) => {
                  setThumbsSwiper(swiper);
                }}
                spaceBetween={10}
                slidesPerView={5}
                watchSlidesProgress
                className="thumbs-swiper"
              >
                {carouselImages.map((image, index) => (
                  <SwiperSlide key={`thumb-${index}`}>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-500 transition-colors">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Info */}
            <div className="space-y-2 sm:space-y-4">
              <div>
                <h1 className="text-2xl lg:text-3xl text-gray-900 mb-1.5 sm:mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-1.5 sm:mb-3">
                  <span className="text-sm text-gray-600">Brand:</span>
                  <Link
                    className="text-info hover:underline font-medium"
                    href={`/products/${product.category}/${product.brand}`}
                  >
                    {product.brand}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(product.rating, 16)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {product.rating}
                  </span>
                  {product.sold > 10 && (
                    <span className="text-sm text-gray-500">
                      ({product.sold} sold)
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-bold text-danger">
                    ৳{currentPrice.toLocaleString()}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="bg-danger text-white px-2 py-1 rounded text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-success font-medium">
                      You save ৳
                      {(product.originalPrice - currentPrice).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Variants - Only show if product has valid variants */}
              {hasValidVariants && (
                <div className="space-x-3 flex items-center ">
                  <h3 className="text-lg text-gray-900">Color</h3>
                  <div className="flex gap-3">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantChange(variant)}
                        className={`px-4 py-2 rounded-lg border-2 transition-colors capitalize ${
                          selectedVariant?.id === variant.id
                            ? "border-info bg-info/10 text-black"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {variant.color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="space-y-1">
                <h3 className="text-lg  text-gray-900">Key Features</h3>
                <ul className="space-y-1 ml-4">
                  {product.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 text-sm font-medium"
                    >
                      <div className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity */}
              <div className="items-center gap-4 md:flex hidden">
                <h3 className="text-lg text-gray-900">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      disabled={quantity >= currentStock}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 md:block hidden">
                <div className="flex gap-3">
                  <button
                    onClick={handleBuyNow}
                    disabled={currentStock === 0}
                    className="h-12 w-2/5 cursor-pointer bg-info text-white hover:bg-info/90 font-medium rounded-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={handleAddToCart}
                    disabled={currentStock === 0}
                    className="w-2/5 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-xs cursor-pointer
                     flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="h-12 w-12 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>
              </div>
              {/* Mobile Bottom Fixed Action Buttons */}
              <div className="fixed xs:bottom-0 bottom-18 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-2 pb-3 shadow-lg md:hidden z-40">
                <div className="flex flex-col gap-3">
                  {/* Quantity and Wishlist Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Qty:
                      </span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange("decrease")}
                          disabled={quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange("increase")}
                          disabled={quantity >= currentStock}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="h-10 w-10 border border-gray-300 hover:border-gray-400 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isWishlisted
                            ? "fill-danger text-danger"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={currentStock === 0}
                      className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg
               flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      disabled={currentStock === 0}
                      className="flex-1 h-12 bg-info text-white hover:bg-info/90 font-medium rounded-lg 
               disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={closeLightbox}
          />
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={closeLightbox}
              className="absolute cursor-pointer -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="absolute -top-12 left-0 text-white text-sm">
              {lightboxImageIndex + 1} of {carouselImages.length}
            </div>
            <button
              onClick={goToPrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <div className="relative">
              <img
                src={carouselImages[lightboxImageIndex] || "/placeholder.svg"}
                alt={`${product.title} - Image ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>
            <div className="flex justify-center mt-4 gap-2 overflow-x-auto pb-2">
              {carouselImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === lightboxImageIndex
                      ? "border-white"
                      : "border-transparent hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductPage;
