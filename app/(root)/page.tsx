import dynamic from "next/dynamic";
import HeroSection from "./components/hero-section";
import FilterSection from "./components/filter-section";

const OurServices = dynamic(() => import("./components/our-services"));
const ReviewSection = dynamic(() => import("./components/review-section"));
const WhyChooseUs = dynamic(() => import("./components/why-us"));

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
        <FilterSection />
        <OurServices />
        <WhyChooseUs />
        <ReviewSection />
      </main>
    </>
  );
}
