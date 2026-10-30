import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { container, cx, Heading, section } from "../home/include/ui";
import TourPlanner from "./include/tour-planner";

export const metadata: Metadata = {
  title: "Custom Tour Planner | Madras Modern Tourism",
};

export default function CustomTourPage() {
  return (
    <SiteShell current="/about" title="Custom Tour Planner">
      <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
        <div className={container}>
          <Heading
            tag="Tailor-made Trips"
            title="Design Your Dream Holiday"
            text="Tell us where you want to go and what you love. Our planners will build a personalised itinerary and quote just for you."
            center
            reveal={false}
            className="mb-[36px]"
          />
          <TourPlanner />
        </div>
      </section>
    </SiteShell>
  );
}
