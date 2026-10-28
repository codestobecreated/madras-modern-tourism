import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import Steps from "./include/steps";
import WhyBook from "./include/why-book";
import Faq from "./include/faq";
import FinalCta from "./include/final-cta";

export const metadata: Metadata = {
  title: "How It Work | Madras Modern Tourism",
};

export default function HowItWorkPage() {
  return (
    <SiteShell current="/about" title="How It Work">
      <Steps />
      <WhyBook />
      <Faq />
      <FinalCta />
    </SiteShell>
  );
}
