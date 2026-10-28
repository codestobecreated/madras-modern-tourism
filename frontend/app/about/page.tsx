import type { Metadata } from "next";
import "../home/home.css";
import Header from "../home/include/header";
import PageBanner from "../home/include/page-banner";
import WhyChoose from "../home/include/why-choose";
import Brands from "../home/include/brands";
import Footer from "../home/include/footer";
import BackToTop from "../home/include/back-to-top";
import RevealOnScroll from "../home/include/reveal-on-scroll";
import GetToKnow from "./include/get-to-know";
import Reviews from "./include/reviews";
import CtaBanner from "./include/cta-banner";
import Guides from "./include/guides";

export const metadata: Metadata = {
  title: "About Us | Madras Modern Tourism",
};

export default function AboutPage() {
  return (
    <div className="mmt w-full overflow-x-hidden bg-white font-jakarta text-[16px] leading-[1.8] text-body">
      <Header current="/about" />
      <main>
        <PageBanner title="About Page" />
        <GetToKnow />
        <WhyChoose compact />
        <Reviews />
        <CtaBanner />
        <Guides />
        <div className="pt-[90px]">
          <Brands />
        </div>
      </main>
      <Footer />
      <BackToTop />
      <RevealOnScroll />
    </div>
  );
}
