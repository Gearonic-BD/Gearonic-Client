"use client";

import Breadcrumb from "@/components/Breadcrumb";
import ProductDetailsCard from "@/components/ProductDetailsCard";

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
        <ProductDetailsCard product={product} />
      </section>
    </div>
  );
};
export default ProductPage;
