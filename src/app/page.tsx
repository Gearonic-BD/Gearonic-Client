import HomeFeaturedCategories from "@/components/HomeFeaturedCategories";
import HomeFeaturedProducts from "@/components/HomeFeaturedProducts";
import HomeFlashSale from "@/components/HomeFlashSale";
import HomeAllCategories from "@/components/HomeAllCategories";
import HomeSwiper from "@/components/HomeSwiper";

// Force dynamic rendering for home page since it uses components with no-store fetches
export const dynamic = "force-dynamic";

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
