"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoryCard from "./CategoryCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import SectionHeader from "./SectionHeader";

const categories = [
  {
    id: 1,
    name: "Smart Watches",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/smart-watches.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/smart-watch",
  },
  {
    id: 2,
    name: "Earphone",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/earphones.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/earphone",
  },
  {
    id: 3,
    name: "Cable",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/cables.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/cable",
  },
  {
    id: 4,
    name: "Charger",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/chargers.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/charger",
  },
  {
    id: 5,
    name: "Screen Protector",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/screen-protectors.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/screen-protector",
  },
  {
    id: 6,
    name: "Headphones",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/headphones.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/headphone",
  },
  {
    id: 7,
    name: "Powerbank",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/powerbanks.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/powerbank",
  },
  {
    id: 8,
    name: "Keyboard",
    image:
      "https://ik.imagekit.io/otbgrtfsy/categories/keyboards.webp?tr=w-256,h-256,f-auto,q-auto",
    href: "/categories/keyboard",
  },
];

const HomeFeaturedCategories = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="max-w-[1280px] relative mb-8 mx-auto container px-4 sm:px-6 py-2">
      <SectionHeader text="Shop By Category" />

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="w-12 h-12 rounded-full cursor-pointer absolute  left-1 z-20 top-1/2 md:flex bg-white border border-gray-200 hidden items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        aria-label="Previous categories"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="w-12 h-12 rounded-full cursor-pointer absolute  right-1 md:flex hidden z-20 top-1/2 bg-white border border-gray-200  items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
        aria-label="Next categories"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>

      {/* Categories Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={16}
          loop={true}
          autoplay={{
            delay: 3000,
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
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
          <div className="custom-pagination flex justify-center items-center gap-2 mt-3 md:invisible md:h-0 md:overflow-hidden"></div>
        </Swiper>

        {/* Mobile Pagination */}
      </div>
    </section>
  );
};

export default HomeFeaturedCategories;
