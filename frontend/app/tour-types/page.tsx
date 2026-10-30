import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import TypeExplorer from "./include/type-explorer";

export const metadata: Metadata = {
  title: "Tour Types | Madras Modern Tourism",
};

export default function TourTypesPage() {
  return (
    <SiteShell current="/activities" title="Tour Types">
      <TypeExplorer />
    </SiteShell>
  );
}
