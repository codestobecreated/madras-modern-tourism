import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { container, cx } from "../home/include/ui";
import InfoCards from "./include/info-cards";
import ContactForm from "./include/contact-form";
import MapBlock from "./include/map-block";

export const metadata: Metadata = {
  title: "Contact | Madras Modern Tourism",
};

export default function ContactPage() {
  return (
    <SiteShell current="/contact" title="Contact">
      <InfoCards />
      <section className="pb-[120px] max1024:pb-[90px] max767:pb-[70px]">
        <div className={cx(container, "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-[40px] max1024:grid-cols-[1fr]")}>
          <ContactForm />
          <MapBlock />
        </div>
      </section>
    </SiteShell>
  );
}
