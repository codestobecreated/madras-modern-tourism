import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { container, cx, section } from "../home/include/ui";
import FilterTours from "./include/filter-tours";

export const metadata: Metadata = {
  title: "Tours – Filter Sidebar | Madras Modern Tourism",
};

export default function ToursFilterSidebarPage() {
  return (
    <SiteShell current="/tours-page" title="Tours">
      <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
        <div className={container}>
          <FilterTours />
        </div>
      </section>
    </SiteShell>
  );
}
