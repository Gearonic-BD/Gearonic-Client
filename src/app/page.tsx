import HomeFeaturedCategories from "@/components/HomeFeaturedCategories";
import HomeFlashSale from "@/components/HomeFlashSale";
import HomeSwiper from "@/components/HomeSwiper";

const Home = () => {
  return (
    <>
      <HomeSwiper />
      <HomeFlashSale />
      <HomeFeaturedCategories />
    </>
  );
};

export default Home;
