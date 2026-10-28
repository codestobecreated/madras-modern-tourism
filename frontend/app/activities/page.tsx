import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import ActivityGrid from "./include/activity-grid";
import ActivitiesCta from "./include/activities-cta";

export const metadata: Metadata = {
  title: "Activities | Madras Modern Tourism",
};

export default function ActivitiesPage() {
  return (
    <SiteShell current="/activities" title="Activities">
      <ActivityGrid />
      <ActivitiesCta />
    </SiteShell>
  );
}
