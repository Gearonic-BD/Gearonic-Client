import HomeFeaturedCategories from "@/components/HomeFeaturedCategories";
import HomeFeaturedProducts from "@/components/HomeFeaturedProducts";
import HomeFlashSale from "@/components/HomeFlashSale";
import HomeSwiper from "@/components/HomeSwiper";

const Home = () => {
  return (
    <>
      <HomeSwiper />
      <HomeFlashSale />
      <HomeFeaturedCategories />
      <HomeFeaturedProducts />
    </>
  );
};

export default Home;
