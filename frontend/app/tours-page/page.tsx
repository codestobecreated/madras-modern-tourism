import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import ToursGrid from "./include/tours-grid";

export const metadata: Metadata = {
  title: "Tours | Madras Modern Tourism",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ToursPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  return (
    <SiteShell current="/tours-page" title="Tours">
      <ToursGrid destination={first(sp.destination)} type={first(sp.type)} />
    </SiteShell>
  );
}
