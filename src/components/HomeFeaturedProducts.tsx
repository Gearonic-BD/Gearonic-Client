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
    id: "8",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/screen-protector.png",
    title: "Premium Tempered Glass Screen Protector for iPhone",
    originalPrice: 600,
    discountPrice: 499,
    sold: 180,
    totalStock: 300,
    rating: 4.1,
  },
  {
    id: "9",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/headphone.png",
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    originalPrice: 3500,
    discountPrice: 2899,
    sold: 120,
    totalStock: 180,
    rating: 4.6,
  },
  {
    id: "10",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/keyboard.png",
    title: "Mechanical Gaming Keyboard with RGB Backlight",
    originalPrice: 4500,
    discountPrice: 3999,
    sold: 90,
    totalStock: 150,
    rating: 4.8,
  },
  {
    id: "11",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smartphone.png",
    title: "Android Smartphone X25 Ultra - 5G Enabled, 128GB",
    originalPrice: 21000,
    discountPrice: 18999,
    sold: 75,
    totalStock: 120,
    rating: 4.4,
  },
  {
    id: "12",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/earphone.png",
    title: "Wireless Earbuds with Touch Control and Long Battery",
    originalPrice: 1800,
    discountPrice: 1599,
    sold: 140,
    totalStock: 170,
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
  {
    id: "17",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/headphone.png",
    title: "Over-Ear Studio Headphones with HD Sound Quality",
    originalPrice: 4800,
    discountPrice: 4299,
    sold: 60,
    totalStock: 90,
    rating: 4.7,
  },
  {
    id: "18",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/keyboard.png",
    title: "Slim Wireless Keyboard for Office Use",
    originalPrice: 2200,
    discountPrice: 1999,
    sold: 70,
    totalStock: 100,
    rating: 4.3,
  },
  {
    id: "19",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/earphone.png",
    title: "Compact Wired Earphones with Mic for Calls and Music",
    originalPrice: 899,
    discountPrice: 799,
    sold: 160,
    totalStock: 200,
    rating: 4.1,
  },
  {
    id: "20",
    image:
      "https://vinetanextjs.vercel.app/images/cls-categories/electronic/smartphone.png",
    title: "Ultra Performance Smartphone with AMOLED Display",
    originalPrice: 27000,
    discountPrice: 24999,
    sold: 45,
    totalStock: 60,
    rating: 4.5,
  },
];

const HomeFeaturedProducts = () => {
  return (
    <section className="max-w-[1280px] mx-auto container mb-16 px-3 sm:px-6">
      <SectionHeader text="Featured Products For YOU" />
      <div className="grid 2xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2.5 md:gap-4">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HomeFeaturedProducts;
