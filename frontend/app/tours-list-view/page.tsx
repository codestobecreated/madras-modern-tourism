import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { allTours } from "../home/include/catalog";
import { container, Heading, section } from "../home/include/ui";
import TourRow from "./include/tour-row";

export const metadata: Metadata = {
  title: "Tours – List View | Madras Modern Tourism",
};

export default function ToursListViewPage() {
  return (
    <SiteShell current="/tours-page" title="Tours">
      <section className={section}>
        <div className={container}>
          <Heading tag="All Tours" title="Every trip, at a glance" text="Compare durations, group sizes and prices side by side." center />
          <div className="grid gap-[30px]">
            {allTours.map((t) => (
              <TourRow key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
