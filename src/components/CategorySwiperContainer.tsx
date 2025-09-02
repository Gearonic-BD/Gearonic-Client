"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import FeaturedProductCard from "./FeaturedProductCard";
import type { Swiper as SwiperType } from "swiper";
import { useRef } from "react";
import { Product } from "@/types/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CategoryProductSwiper = ({ products }: { products: Product[] }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <>
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="w-12 h-12 rounded-full cursor-pointer absolute  -left-6 z-20 top-1/2 md:flex bg-white border border-gray-200 hidden items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        aria-label="Previous categories"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="w-12 h-12 rounded-full cursor-pointer absolute  -right-6 md:flex hidden z-20 top-1/2 bg-white border border-gray-200  items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        aria-label="Next categories"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          300: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "w-2 h-2 bg-gray-300 rounded-full cursor-pointer transition-all",
          bulletActiveClass: "!bg-primary !w-6",
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="py-2">
            <FeaturedProductCard product={product} />
          </SwiperSlide>
        ))}
        <div className="custom-pagination flex justify-center items-center gap-2 mt-3 md:hidden"></div>
      </Swiper>
    </>
  );
};

export default CategoryProductSwiper;
