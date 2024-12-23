import Navbar from "@/components/Navbar/Navbar";
import ProductsPage from "../../components/Products/products";
import CarouselTextBanner from "../../components/ui/carousel-text-banner";
import BannerDiscount from "@/components/ui/banner-discount";
import Footer from "@/components/Footer/Footer";

const HomePrincipal = () => {

  return(
    <>
  <Navbar/>
  <CarouselTextBanner/>
  <ProductsPage/>
  <BannerDiscount/>
  <Footer/>
    </>
  )
}

export default HomePrincipal;