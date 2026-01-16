"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import type { Swiper as SwiperType } from "swiper";
import { X } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productTitle: string;
}

const ProductImageGallery = ({
  images,
  productTitle,
}: ProductImageGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setLightboxImageIndex((prev) =>
          prev > 0 ? prev - 1 : images.length - 1
        );
      } else if (e.key === "ArrowRight") {
        setLightboxImageIndex((prev) =>
          prev < images.length - 1 ? prev + 1 : 0
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

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
    setLightboxImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNextImage = () => {
    setLightboxImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="relative p-4">
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          onSwiper={(swiper) => setMainSwiper(swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="main-swiper rounded-lg overflow-hidden"
          spaceBetween={10}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${productTitle} - Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Swiper */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress
        className="thumbs-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={`thumb-${index}`}>
            <div
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                activeIndex === index
                  ? "border-info"
                  : "border-transparent hover:border-info"
              }`}
              onClick={() => {
                mainSwiper?.slideTo(index);
              }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
              aria-label="Close image lightbox"
              className="absolute cursor-pointer -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="absolute -top-12 left-0 text-white text-sm">
              {lightboxImageIndex + 1} of {images.length}
            </div>
            <button
              onClick={goToPrevImage}
              aria-label="Previous image"
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
              aria-label="Next image"
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
                src={images[lightboxImageIndex] || "/placeholder.svg"}
                alt={`${productTitle} - Image ${lightboxImageIndex + 1}`}
                width={1200}
                height={1200}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="flex justify-center mt-4 gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxImageIndex(index)}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === lightboxImageIndex
                      ? "border-white"
                      : "border-transparent hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageGallery;
