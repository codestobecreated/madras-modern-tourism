import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import DestinationGrid from "./include/destination-grid";
import PopularTours from "./include/popular-tours";

export const metadata: Metadata = {
  title: "Destination | Madras Modern Tourism",
};

export default function DestinationPage() {
  return (
    <SiteShell current="/destination" title="Destination">
      <DestinationGrid />
      <PopularTours />
    </SiteShell>
  );
}
