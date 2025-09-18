import CategoryProductSwiper from "./CategoryProductSwiper";

// const mobiles = [
//   {
//     id: "1",
//     image: "/assets/iphone2.png",
//     title: "iPhone 12 Pro Max - Silver 256GB Edition",
//     originalPrice: 24000,
//     discountPrice: 21999,
//     sold: 50,
//     totalStock: 100,
//     rating: 4.5,
//   },
//   {
//     id: "2",
//     image: "/assets/iphone.png",
//     title: "iPhone 13 Mini Compact Power with Sleek Design",
//     originalPrice: 20000,
//     discountPrice: 17999,
//     sold: 60,
//     totalStock: 80,
//     rating: 4.2,
//   },
//   {
//     id: "3",
//     image: "/assets/iphone2.png",
//     title: "iPhone 14 Pro Deep Purple - 128GB",
//     originalPrice: 28000,
//     discountPrice: 25500,
//     sold: 30,
//     totalStock: 60,
//     rating: 4.8,
//   },
//   {
//     id: "4",
//     image: "/assets/iphone.png",
//     title: "iPhone SE 3rd Gen Budget Beast with A15 Chip",
//     originalPrice: 12000,
//     discountPrice: 9999,
//     sold: 90,
//     totalStock: 120,
//     rating: 4.0,
//   },
//   {
//     id: "5",
//     image: "/assets/iphone2.png",
//     title: "iPhone 11 Pro Midnight Green - Triple Camera",
//     originalPrice: 18000,
//     discountPrice: 15500,
//     sold: 75,
//     totalStock: 90,
//     rating: 4.4,
//   },
//   {
//     id: "6",
//     image: "/assets/iphone.png",
//     title: "iPhone XR Affordable Big Screen Experience",
//     originalPrice: 15000,
//     discountPrice: 13000,
//     sold: 110,
//     totalStock: 130,
//     rating: 4.1,
//   },
//   {
//     id: "7",
//     image: "/assets/iphone2.png",
//     title: "iPhone 14 Pro Max Ultimate Flagship Powerhouse",
//     originalPrice: 30000,
//     discountPrice: 27500,
//     sold: 40,
//     totalStock: 70,
//     rating: 4.9,
//   },
//   {
//     id: "8",
//     image: "/assets/iphone.png",
//     title: "iPhone 13 Pro Stunning Display & Battery Life",
//     originalPrice: 26000,
//     discountPrice: 23900,
//     sold: 65,
//     totalStock: 85,
//     rating: 4.6,
//   },
//   {
//     id: "9",
//     image: "/assets/iphone2.png",
//     title: "iPhone 12 Mini Compact Yet Powerful",
//     originalPrice: 19000,
//     discountPrice: 17250,
//     sold: 95,
//     totalStock: 120,
//     rating: 4.3,
//   },
//   {
//     id: "10",
//     image: "/assets/iphone.png",
//     title: "iPhone 15 Ultra Futuristic Design & Performance",
//     originalPrice: 35000,
//     discountPrice: 32999,
//     sold: 20,
//     totalStock: 50,
//     rating: 5.0,
//   },
// ];

const HomeAllCategories = () => {
  return (
    <>
      <h1 className="text-center text-3xl md:text-4xl mb-12 font-bold uppercase">
        Shop by categories
      </h1>
      <CategoryProductSwiper title="Smart Band" categoryName={"band"} />
      <CategoryProductSwiper title="Watches" categoryName={"watches"} />
      <CategoryProductSwiper title="Earbuds" categoryName={"earbuds"} />
      <CategoryProductSwiper title="Routers" categoryName={"routers"} />
      <CategoryProductSwiper title="Chargers" categoryName={"chargers"} />
    </>
  );
};

export default HomeAllCategories;
