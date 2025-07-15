import React from "react";
import SectionHeader from "./SectionHeader";
import FeaturedProductCard from "./FeaturedProductCard";

const products = [
  {
    id: "1",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/earphone.png",
    title:
      "Ear Phone Max Special Edition with Extra Long Product Title to Test Two-Line Limitation",
    originalPrice: 2400,
    discountPrice: 2099,
    sold: 80,
    totalStock: 100,
    rating: 4.5,
  },
  {
    id: "2",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smartphone.png",
    title:
      "Iphone 12 Pro Max Special Edition with Extra Long Product Title to Test Two-Line Limitation",
    originalPrice: 24000,
    discountPrice: 20199,
    sold: 40,
    totalStock: 100,
    rating: 4.5,
  },
  {
    id: "3",
    image: "/assets/iphone.png",
    title:
      "Iphone 12 Pro Max Special Edition with Extra Long Product Title to Test Two-Line Limitation",
    originalPrice: 24000,
    discountPrice: null,
    sold: 40,
    totalStock: 100,
    rating: 4.5,
  },
  {
    id: "30",
    image: "/assets/iphone.png",
    title:
      "Iphone 12 Pro Max Special Edition with Extra Long Product Title to Test Two-Line Limitation",
    originalPrice: 24000,
    discountPrice: null,
    sold: 40,
    totalStock: 100,
    rating: 4.5,
  },
  {
    id: "4",
    image: "/assets/iphone2.png",
    title:
      "Exotic Phone iPhone 12 Max with Extra Long Product Title to Test Two-Line Limitation",
    originalPrice: 5223,
    discountPrice: 4566,
    sold: 40,
    totalStock: 45,
    rating: 0,
  },
  {
    id: "5",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/cable.png",
    title: "Durable Type-C Cable for Fast Charging and Data Transfer",
    originalPrice: 500,
    discountPrice: 399,
    sold: 150,
    totalStock: 200,
    rating: 4.2,
  },
  {
    id: "6",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smart-watch.png",
    title: "Smart Watch Series 7 Fitness and Sleep Tracker",
    originalPrice: 5200,
    discountPrice: 4700,
    sold: 60,
    totalStock: 90,
    rating: 4.7,
  },
  {
    id: "7",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/charge.png",
    title: "Fast Charging Adapter for All Smartphones - 30W",
    originalPrice: 1200,
    discountPrice: 999,
    sold: 200,
    totalStock: 250,
    rating: 4.3,
  },

  {
    id: "13",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/cable.png",
    title: "Magnetic Charging Cable for iPhone and Android",
    originalPrice: 750,
    discountPrice: 699,
    sold: 95,
    totalStock: 100,
    rating: 4.0,
  },
  {
    id: "14",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smart-watch.png",
    title: "Smart Watch Pro with SpO2 and Heart Rate Monitor",
    originalPrice: 6400,
    discountPrice: 5799,
    sold: 85,
    totalStock: 120,
    rating: 4.6,
  },
  {
    id: "15",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/charge.png",
    title: "USB-C Wall Charger - 45W Fast Charging Support",
    originalPrice: 1600,
    discountPrice: 1399,
    sold: 130,
    totalStock: 180,
    rating: 4.5,
  },
  {
    id: "16",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/screen-protector.png",
    title: "Edge-to-Edge Full Coverage Screen Guard",
    originalPrice: 650,
    discountPrice: 549,
    sold: 110,
    totalStock: 150,
    rating: 4.2,
  },
];

const RelatedProducts = () => {
  return (
    <div>
      <SectionHeader text="Related Products for you" />
      <div className="grid 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 md:gap-4">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
