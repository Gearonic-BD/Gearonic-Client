"use client";

import Breadcrumb from "@/components/Breadcrumb";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import ProductSpecifications from "@/components/ProductSpecifications";

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
  specifications: {
    "Basic Information": {
      display: "1.32inch AMOLED (454×454) Capacitive Full Touch Screen",
      memory: "Flash Memory: RAM:578KB+ROM 640KB \nExternal flash memory: 1Gb",
      battery:
        "3.8V 260mAh Lithium Polymer Battery\nCharging Method: Magnetic Charging\nStandby time: 15-25 days\nUsage time: 7-15 days",
      connectivity: "Bluetooth 5.0",
    },
    Exterior: {
      dimention: "45*45*12mm",
      weights: "65g",
      color: "black",
    },
    "Warranty Information": {
      warranty: "6 Month Brand Warranty",
    },
  },
  description: `<h2>Blue Gean Shark L4S Sport Smart Watch – Smart, Stylish & Sporty</h2>

<p>The <strong>Blue Gean Shark L4S Sport Smart Watch</strong> blends sleek aesthetics with powerful functionality, designed for tech-savvy users who demand both performance and style. This premium wearable supports <strong>5G connectivity</strong>, features a sharp <strong>1.32-inch AMOLED display</strong>, and runs on the robust <strong>A14 Bionic Chip</strong>.</p>

<h3>Key Features</h3>
<ul>
  <li>128GB Internal Storage</li>
  <li>iOS 15 Compatibility</li>
  <li>Advanced A14 Bionic Chipset</li>
  <li>Bluetooth 5.0 for seamless connectivity</li>
</ul>

<h3>Performance & Battery</h3>
<p>Equipped with a <strong>260mAh Lithium Polymer Battery</strong>, the L4S offers a remarkable standby time of <strong>15–25 days</strong> and a usage time of up to <strong>15 days</strong>. It uses a <strong>magnetic charging system</strong> for added convenience.</p>

<h3>Design & Build</h3>
<p>Sporting a compact <strong>45×45×12mm</strong> build and weighing just <strong>65g</strong>, the L4S fits comfortably on the wrist. Choose from stunning color options like <strong>Black</strong> and <strong>White</strong> to match your style.</p>

<h3>Variants & Pricing</h3>
<ul>
  <li>Black – ৳21,250 (Stock: 100 units)</li>
  <li>White – ৳21,350 (Stock: 30 units)</li>
</ul>

<h3>Warranty</h3>
<p>This product comes with a <strong>6-month official brand warranty</strong> for peace of mind.</p>

<h3>Ideal For</h3>
<p>This smartwatch is ideal for fitness enthusiasts, professionals, and tech lovers who want to stay connected in style.</p>
`,
};

const ProductPage = () => {
  return (
    <>
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

      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDetailsCard product={product} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductSpecifications specifications={product.specifications} />
      </section>
    </>
  );
};
export default ProductPage;
