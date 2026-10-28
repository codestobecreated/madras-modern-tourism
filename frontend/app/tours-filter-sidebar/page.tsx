import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { container, section } from "../home/include/ui";
import FilterTours from "./include/filter-tours";

export const metadata: Metadata = {
  title: "Tours – Filter Sidebar | Madras Modern Tourism",
};

export default function ToursFilterSidebarPage() {
  return (
    <SiteShell current="/tours-page" title="Tours">
      <section className={section}>
        <div className={container}>
          <FilterTours />
        </div>
      </section>
    </SiteShell>
  );
}
