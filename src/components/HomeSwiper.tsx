"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Banner = {
  id: string;
  imageUrl: string;
  link?: string;
};

const HomeSwiper = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/banners`
        );
        const data = await res.json();
        setSlides(data);
      } catch (err) {
        console.error("Failed to fetch banners", err);
      }
    };
    fetchBanners();
  }, []);

  // split slides → all except last 2 + last 2
  const mainSlides = slides.slice(0, -2);
  const bottomSlides = slides.slice(-2);

  return (
    <section className="max-w-[1280px] h-fit px-3 sm:px-6 container grid grid-cols-2 sm:grid-cols-3 sm:grid-rows-2 gap-4 gap-y-2 mx-auto relative  ">
      <div className="relative col-span-2 sm:row-span-2">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {mainSlides.map((banner, index) => (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link || "#"}>
                <img src={banner.imageUrl} alt={`Slide ${index + 1}`} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute cursor-pointer left-2 hidden xs:block top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-white transition-all p-2 rounded-full shadow"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute cursor-pointer hidden xs:block right-2 top-1/2 -translate-y-1/2 z-10 bg-gray-200 hover:bg-white transition-all p-2 rounded-full shadow"
        >
          <ArrowRight />
        </button>

        {/* Custom Pagination */}
        <div className="flex absolute bottom-4 left-1/2 -translate-x-1/2 z-40 justify-center mt-4 gap-2">
          {mainSlides.map((_, index) => (
            <div
              key={index}
              onClick={() => swiperRef.current?.slideTo(index)}
              className={`w-6 h-2 cursor-pointer ${
                activeIndex === index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* bottom 2 banners */}
      {bottomSlides[0] && (
        <div className="h-fit">
          <Link href={bottomSlides[0].link || "#"}>
            <img src={bottomSlides[0].imageUrl} alt="Banner" />
          </Link>
        </div>
      )}
      {bottomSlides[1] && (
        <div className="h-fit">
          <Link href={bottomSlides[1].link || "#"}>
            <img src={bottomSlides[1].imageUrl} alt="Banner" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomeSwiper;
