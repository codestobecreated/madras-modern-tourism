import "@/components/home/home.css";
import Header from "@/components/home/Header";
import HeroSlider from "@/components/home/HeroSlider";
import TripSearch from "@/components/home/TripSearch";
import Destinations from "@/components/home/Destinations";
import { BackToTop, Counters, RevealOnScroll, Testimonials } from "@/components/home/Interactive";
import {
  About,
  Blog,
  Brands,
  FeaturedTours,
  Footer,
  Gallery,
  OfferBanner,
  Promos,
  TourTypes,
  WhyChoose,
} from "@/components/home/Sections";

export default function Page() {
  return (
    <div className="mmt">
      <Header />
      <main>
        <HeroSlider />
        <TripSearch />
        <Destinations />
        <About />
        <FeaturedTours />
        <TourTypes />
        <Testimonials />
        <OfferBanner />
        <Counters />
        <Gallery />
        <WhyChoose />
        <Blog />
        <Brands />
        <Promos />
      </main>
      <Footer />
      <BackToTop />
      <RevealOnScroll />
    </div>
  );
}
