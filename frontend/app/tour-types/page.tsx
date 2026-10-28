import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import TypeGrid from "./include/type-grid";
import ToursByType from "./include/tours-by-type";

export const metadata: Metadata = {
  title: "Tour Types | Madras Modern Tourism",
};

export default function TourTypesPage() {
  return (
    <SiteShell current="/activities" title="Tour Types">
      <TypeGrid />
      <ToursByType />
    </SiteShell>
  );
}
