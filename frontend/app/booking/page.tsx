import type { Metadata } from "next";
import { Suspense } from "react";
import SiteShell from "../home/include/site-shell";
import { container, section } from "../home/include/ui";
import BookingFlow from "./include/booking-flow";

export const metadata: Metadata = {
  title: "Booking | Madras Modern Tourism",
};

export default function BookingPage() {
  return (
    <SiteShell current="/tours-page" title="Booking">
      <section className={section}>
        <div className={container}>
          <Suspense fallback={<p className="py-[60px] text-center">Loading booking…</p>}>
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
