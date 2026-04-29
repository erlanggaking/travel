import HeroSlider from "@/components/HeroSlider";
import ProductGrid from "@/components/ProductGrid";
import SearchBox from "@/components/SearchBox";
import PromoSection from "@/components/PromoSection";
import TourPackages from "@/components/TourPackages";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <SearchBox />
      <ProductGrid />
      <TourPackages />
      <PromoSection />
    </>
  );
}
