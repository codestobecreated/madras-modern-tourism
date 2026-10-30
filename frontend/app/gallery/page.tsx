import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { container, cx, Heading, section } from "../home/include/ui";
import PhotoGallery from "./include/photo-gallery";

export const metadata: Metadata = {
  title: "Gallery | Madras Modern Tourism",
};

export default function GalleryPage() {
  return (
    <SiteShell current="/about" title="Gallery">
      <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
        <div className={container}>
          <Heading tag="Gallery" title="Moments From Our Destinations" text="Beaches, cities and heritage sights from the places our packages take you." center reveal={false} className="mb-[30px]" />
          <PhotoGallery />
        </div>
      </section>
    </SiteShell>
  );
}
