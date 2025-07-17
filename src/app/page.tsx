import HomeFeaturedCategories from "@/components/HomeFeaturedCategories";
import HomeFeaturedProducts from "@/components/HomeFeaturedProducts";
import HomeFlashSale from "@/components/HomeFlashSale";
import HomeAllCategories from "@/components/HomeAllCategories";
import HomeSwiper from "@/components/HomeSwiper";

const Home = () => {
  return (
    <>
      <HomeSwiper />
      <HomeFlashSale />
      <HomeFeaturedCategories />
      <HomeFeaturedProducts />
      <HomeAllCategories />
     
    </>
  );
};

export default Home;
