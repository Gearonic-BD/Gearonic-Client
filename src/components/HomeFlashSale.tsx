"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import FlashSaleProductCard from "./FlashSaleProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { Product } from "@/types/types";
import { ProductSkeleton } from "@/utils/suspenseLoaders";

const HomeFlashSale = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashSaleProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/flash-sale`
        );
        const data = await res.json();
        setFlashSaleProducts(data);
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashSaleProducts();
  }, []);
  if (loading) {
    return (
      <section className="w-full max-w-[1280px] px-4 sm:px-6 mx-auto my-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid grid-cols-6">
        {Array.from({ length: 8 }, (_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </section>
    );
  }
  if (!flashSaleProducts || flashSaleProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-[1280px] px-4 sm:px-6 mx-auto my-8">
      <SectionHeader text="Flash Sale🔥" />
      {/* <h2 className="text-2xl font-bold">Flash Sale 🔥</h2> */}
      <div className=" relative ">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <div className="text-center sm:text-right">
              <Link
                href="/offers"
                className="inline-block uppercase active:scale-95 text-primary border hover:-translate-y-1 transition-all font-semibold px-4 py-2 rounded-md text-sm sm:text-base hover:bg-primary-dark"
              >
                Shop All
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer transition-all p-2 rounded-full bg-white shadow hover:shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="cursor-pointer transition-all p-2 rounded-full bg-white shadow hover:shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 1 },
            300: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            960: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {/* <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product2} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product2} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product2} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product2} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product2} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product} />
          </SwiperSlide>
          <SwiperSlide className="py-2">
            <FlashSaleProductCard product={product2} />
          </SwiperSlide> */}
          {flashSaleProducts.map((product) => (
            <SwiperSlide className="py-2" key={product.id}>
              <FlashSaleProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeFlashSale;
