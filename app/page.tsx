import FashionBrand from "./components/About";
import FeaturedProductsPage from "./components/FeaturedProduct";
import HeroBanner from "./components/HeroBanner";

const page = () => {
  return (
    <div className="text-4xl">
      <HeroBanner />
      <FashionBrand />
      <FeaturedProductsPage></FeaturedProductsPage>
    </div>
  );
};

export default page;
