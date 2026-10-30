import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import { container, cx, Heading, section } from "../home/include/ui";
import BookNowForm from "./include/book-now-form";

export const metadata: Metadata = {
  title: "Book Now | Madras Modern Tourism",
};

export default function BookNowPage() {
  return (
    <SiteShell current="/book-now" title="Book Now">
      <section className={cx(section, "!pt-[50px] max1024:!pt-[40px] max767:!pt-[32px]")}>
        <div className={container}>
          <Heading
            tag="Booking Request"
            title="Plan Your Trip With Us"
            text="Fill in a few details and our travel planner will get back to you with availability and the best price."
            center
            reveal={false}
            className="mb-[36px]"
          />
          <BookNowForm />
        </div>
      </section>
    </SiteShell>
  );
}
