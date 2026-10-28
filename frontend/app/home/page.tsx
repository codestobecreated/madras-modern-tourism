import "./home.css";
import Header from "./include/header";
import Hero from "./include/hero";
import TripSearch from "./include/trip-search";
import Destinations from "./include/destinations";
import About from "./include/about";
import FeaturedTours from "./include/featured-tours";
import TourTypes from "./include/tour-types";
import Testimonials from "./include/testimonials";
import OfferBanner from "./include/offer-banner";
import Counters from "./include/counters";
import Gallery from "./include/gallery";
import WhyChoose from "./include/why-choose";
import Blog from "./include/blog";
import Brands from "./include/brands";
import Promos from "./include/promos";
import Footer from "./include/footer";
import BackToTop from "./include/back-to-top";
import RevealOnScroll from "./include/reveal-on-scroll";

export default function HomePage() {
  return (
    <div className="mmt w-full overflow-x-hidden bg-white font-jakarta text-[16px] leading-[1.8] text-body">
      <Header />
      <main>
        <Hero />
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
