"use client";

import Breadcrumb from "@/components/Breadcrumb";
import ProductDescription from "@/components/ProductDescription";
import ProductDetailsCard from "@/components/ProductDetailsCard";
import ProductQuestions from "@/components/ProductQuestions";
import ProductReviews from "@/components/ProductReviews";
import ProductSpecifications from "@/components/ProductSpecifications";
import RelatedProducts from "@/components/RelatedProducts";

const product = {
  id: "1",
  title: "Blue Gean Shark L4S Sport Smart Watch",
  slug: "blue-gean-shark-l4s-sport-smart-watch",
  featuredImage:
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-official-500x500.webp",
  images: [
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-official-500x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-mist-black-02-500x500.webp",
    "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-02-500x500.webp",
  ],
  category: "Mobiles",
  brand: "Apple",
  originalPrice: 24000,
  discountPrice: 21220,
  sold: 50,
  hasVariants: true,
  totalStock: 200,
  rating: 4.5,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isFlashSale: false,
  description: `<h2>Blue Gean Shark L4S Sport Smart Watch</h2>

  <img
  src="https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-lava-black-official-500x500.webp"
  alt="Blue Gean Shark L4S Sport Smart Watch Front View"
  width="400"
/>

<p>The <strong>Blue Gean Shark L4S Sport Smart Watch</strong> is a premium wearable that blends performance, durability, and style, making it a perfect choice for modern, tech-savvy individuals. Featuring a vivid <strong>1.32-inch AMOLED full touch display</strong> with a resolution of 454×454 pixels, it delivers sharp visuals, vibrant colors, and a smooth touch experience that elevates everyday usability.</p>

<p>This smart watch is powered by an efficient system that includes <strong>578KB RAM</strong>, <strong>640KB ROM</strong>, and an external <strong>1GB flash memory</strong>, ensuring seamless operation of features and storage of essential data. Whether you're at the gym or in a business meeting, the L4S handles your routines effortlessly.</p>

<p>Equipped with the latest <strong>Bluetooth 5.0 technology</strong>, it ensures fast and stable connectivity to your smartphone. You can receive notifications, control music playback, and stay updated right from your wrist. The watch offers up to <strong>15 days of usage time</strong> and up to <strong>25 days standby time</strong> thanks to its robust <strong>260mAh lithium polymer battery</strong>, with a convenient <strong>magnetic charging system</strong>.</p>

<p>When it comes to style and build, the Blue Gean Shark L4S impresses with a sleek <strong>45×45×12mm</strong> form factor and a lightweight <strong>65g body</strong>. Its comfortable strap and elegant finish make it suitable for both formal and casual wear. Available in <strong>Black</strong> and <strong>White</strong> variants, users can choose the color that best suits their personal style.</p>

<h3>Variants & Pricing</h3>
<ul>
  <li><strong>Black</strong> – ৳21,250 (Stock: 100 units)</li>
  <li><strong>White</strong> – ৳21,350 (Stock: 30 units)</li>
</ul>

<p>This smart watch also includes essential features such as <strong>128GB storage</strong>, <strong>iOS 15 compatibility</strong>, <strong>A14 Bionic chip</strong> for top-notch performance, and a wide range of health tracking capabilities. From heart rate monitoring to sleep analysis, it's your everyday health companion.</p>

<p>The Blue Gean Shark L4S is ideal for fitness enthusiasts, professionals, and those looking for a dependable and elegant smart device. Backed by a <strong>6-month brand warranty</strong>, this smart watch ensures both style and security in your purchase.</p>

<h3>Buy Blue Gean Shark L4S Smart Watch in Bangladesh</h3>
<p>Get the <strong>Blue Gean Shark L4S Smart Watch</strong> at the best price in Bangladesh from our online store. Enjoy fast delivery and authentic warranty. Whether you're upgrading or switching to your first smartwatch, the L4S is designed to deliver unmatched value and performance.</p>

<h4>Price of Blue Gean Shark L4S in Bangladesh</h4>
<p>The current price of the <strong>Blue Gean Shark L4S</strong> in Bangladesh is <strong>৳21,220</strong>. Place your order now and enjoy the latest in smart wearable technology.</p>
`,
  features: ["128GB Storage", "5G Support", "iOS 15", "A14 Bionic Chip"],
  variants: [
    {
      id: "44",
      productId: "1",
      name: "Black",
      color: "black",
      price: 21250,
      stock: 100,
      image:
        "https://www.startech.com.bd/image/cache/catalog/smart-watch/black-shark/gs3-sport/gs3-sport-mist-black-01-500x500.webp",
    },
    {
      id: "45",
      productId: "1",
      name: "White",
      color: "white",
      price: 21350,
      stock: 30,
      image:
        "https://vinetanextjs.vercel.app/images/cls-categories/electronic/charge.png",
    },
  ],
  specifications: [
    {
      name: "Basic Information",
      specs: [
        {
          key: "display",
          value: "1.32inch AMOLED (454×454) Capacitive Full Touch Screen",
        },
        {
          key: "memory",
          value:
            "Flash Memory: RAM:578KB+ROM 640KB \nExternal flash memory: 1Gb",
        },
        {
          key: "battery",
          value:
            "3.8V 260mAh Lithium Polymer Battery\nCharging Method: Magnetic Charging\nStandby time: 15-25 days\nUsage time: 7-15 days",
        },
        { key: "connectivity", value: "Bluetooth 5.0" },
      ],
    },
    {
      name: "Exterior",
      specs: [
        { key: "dimention", value: "45*45*12mm" },
        { key: "weights", value: "65g" },
        { key: "color", value: "black" },
      ],
    },
    {
      name: "Warranty Information",
      specs: [{ key: "warranty", value: "6 Month Brand Warranty" }],
    },
  ],
  questions: [
    {
      id: "q1",
      userId: "user1",
      productId: "1",
      question: "Is this watch compatible with iPhone 14?",
      answer:
        "Yes, this smartwatch is compatible with iOS 10.0 and above, so it works perfectly with iPhone 14.",
      createdAt: "2024-01-15T00:00:00Z",
      user: { id: "user1", name: "John Doe", email: "john@example.com" },
      answerDate: "2024-01-15",
    },
    {
      id: "q2",
      userId: "user2",
      productId: "1",
      question: "How long does the battery last with normal usage?",
      answer:
        "With normal usage, the battery lasts 7-15 days. For standby mode, it can last up to 25 days.",
      createdAt: "2024-01-10T00:00:00Z",
      user: { id: "user2", name: "Sarah Wilson", email: "sarah@example.com" },
      answerDate: "2024-01-10",
    },
    {
      id: "q3",
      userId: "user3",
      productId: "1",
      question: "Is the watch waterproof for swimming?",
      answer:
        "Yes, it has 3ATM water resistance, making it suitable for swimming and water sports.",
      createdAt: "2024-01-08T00:00:00Z",
      user: { id: "user3", name: "Mike Johnson", email: "mike@example.com" },
      answerDate: "2024-01-08",
    },
  ],
  reviews: [
    {
      id: "r1",
      userId: "user4",
      productId: "1",
      rating: 5,
      comment:
        "I've been using this watch for 2 months now and I'm impressed with its performance. The battery easily lasts 10-12 days with regular use, and the display is crisp and bright. Highly recommended!",
      createdAt: "2024-01-20T00:00:00Z",
      user: {
        id: "user4",
        name: "Alex Thompson",
        email: "alex@example.com",
      },
      date: "2024-01-20",
    },
    {
      id: "r2",
      userId: "user5",
      productId: "1",
      rating: 4,
      comment:
        "The watch has all the features I need. The build quality is solid and it looks premium. Only minor issue is that the charging cable is a bit short, but overall very satisfied.",
      createdAt: "2024-01-18T00:00:00Z",
      user: { id: "user5", name: "Emma Davis", email: "emma@example.com" },
      date: "2024-01-18",
    },
    {
      id: "r3",
      userId: "user6",
      productId: "1",
      rating: 5,
      comment:
        "As a fitness enthusiast, this watch meets all my needs. The heart rate monitoring is accurate, and I love the waterproof feature for swimming. The app connectivity is seamless.",
      createdAt: "2024-01-15T00:00:00Z",
      user: { id: "user6", name: "David Chen", email: "david@example.com" },
      date: "2024-01-15",
    },
    {
      id: "r4",
      userId: "user7",
      productId: "1",
      rating: 4,
      comment:
        "The watch looks great and has a premium feel. The AMOLED display is beautiful and easy to read in sunlight. Setup was easy and it pairs quickly with my phone.",
      createdAt: "2024-01-12T00:00:00Z",
      user: {
        id: "user7",
        name: "Lisa Rodriguez",
        email: "lisa@example.com",
      },
      date: "2024-01-12",
    },
  ],
};

const ProductPage = () => {
  const breadcrumbItems = [
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
  ];
  return (
    <>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6">
        <Breadcrumb items={breadcrumbItems} />
      </section>

      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDetailsCard product={product} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductSpecifications specifications={product.specifications} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductDescription html={product.description} />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductQuestions
          questions={product.questions}
          productId={product.id}
        />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.rating}
          totalReviews={product.reviews.length}
        />
      </section>
      <section className="container mx-auto max-w-[1280px] px-4 sm:px-6 pb-4 md:pb-8">
        <RelatedProducts id={product.id} />
      </section>
    </>
  );
};
export default ProductPage;
