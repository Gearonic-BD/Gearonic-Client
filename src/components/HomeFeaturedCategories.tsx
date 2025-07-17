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
    name: "Smartphones",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smartphone.png",
    href: "/category/smartphones",
  },
  {
    id: 2,
    name: "Earphones",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/earphone.png",
    href: "/category/earphones",
  },
  {
    id: 3,
    name: "Cables",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/cable.png",
    href: "/category/cables",
  },
  {
    id: 4,
    name: "Smart Watches",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smart-watch.png",
    href: "/category/smart-watches",
  },
  {
    id: 5,
    name: "Chargers",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/charge.png",
    href: "/category/chargers",
  },
  {
    id: 6,
    name: "Screen Protectors",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/keyboard.png",
    href: "/category/screen-protectors",
  },
  {
    id: 7,
    name: "Headphones",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/headphone.png",
    href: "/category/headphones",
  },
  {
    id: 8,
    name: "Keyboards",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/keyboard.png",
    href: "/category/keyboards",
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
