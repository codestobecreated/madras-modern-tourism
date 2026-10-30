import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import LegalPage, { type LegalSection } from "../home/include/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Madras Modern Tourism",
};

const sections: LegalSection[] = [
  {
    id: "quotations",
    title: "Quotations and rates",
    body: [
      [
        "All quotations are offers only. No hotel rooms or services are blocked until the booking is confirmed.",
        "Rates are per person, in INR, on a sharing basis unless stated otherwise.",
        "Rates and availability are subject to change until confirmation, including for peak season, public and school holidays, and changes in the number of travellers, rooms or travel dates.",
        "Quotations are valid for the period stated on them, subject to availability and reconfirmation at the time of booking.",
      ],
    ],
  },
  {
    id: "booking-payment",
    title: "Booking and payment",
    body: [
      "A booking is confirmed only after we receive the advance payment and send you a written confirmation. The balance must be paid by the date shown on your confirmation; unpaid bookings may be cancelled.",
    ],
  },
  {
    id: "inclusions",
    title: "Inclusions and exclusions",
    body: [
      "Each package lists exactly what is included and excluded. Unless clearly stated as included, the following are not part of the package:",
      [
        "International and domestic flight tickets.",
        "Visa fees, travel insurance and local tourism taxes or city fees.",
        "Tips for drivers and guides, porterage and personal expenses.",
        "Optional tours, water sports and meals not mentioned in the itinerary.",
        "Early check-in, late check-out and midnight transfer surcharges.",
      ],
    ],
  },
  {
    id: "travel-documents",
    title: "Passports, visas and health",
    body: [
      "Travellers are responsible for holding a passport valid for at least 6 months from the date of arrival, the correct visa and any health documents required. We can help with visa applications, but approval is decided only by the relevant authorities and visa fees are non-refundable.",
    ],
  },
  {
    id: "hotels-transfers",
    title: "Hotels, transfers and sightseeing",
    body: [
      [
        "Hotels are subject to availability; a similar-category hotel may be offered if the quoted hotel is unavailable.",
        "Standard hotel check-in and check-out times apply. Hotels may ask for a refundable deposit at check-in.",
        "Shared (SIC) tours run on fixed schedules managed by the local operator.",
        "Luggage is limited to what the vehicle can safely carry, usually one suitcase and one small bag per person.",
        "Itineraries may be adjusted for weather, traffic, local events or operational reasons.",
      ],
    ],
  },
  {
    id: "changes-cancellations",
    title: "Changes and cancellations",
    body: [
      "Changes to confirmed bookings depend on availability and may carry extra charges. Cancellations are handled as per our Refund Policy.",
    ],
  },
  {
    id: "responsibility",
    title: "Our responsibility",
    body: [
      "We act as an agent for hotels, transport companies, airlines and other suppliers. We are not liable for delays, losses, injuries or extra costs caused by suppliers, weather, natural events, strikes, government actions or other circumstances beyond our control. We strongly recommend travel insurance.",
    ],
  },
  {
    id: "conduct",
    title: "Traveller conduct",
    body: [
      "Travellers must follow local laws, customs and the rules of hotels and service providers. Services may be withdrawn without refund for behaviour that puts others at risk or causes damage.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: ["These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the courts in Chennai, Tamil Nadu."],
  },
];

export default function TermsPage() {
  return (
    <SiteShell current="/about" title="Terms & Conditions">
      <LegalPage
        current="/terms-and-conditions"
        updated="30 October 2026"
        intro="These terms apply to all enquiries, quotations and bookings made with Madras Modern Tourism LLC. By confirming a booking you agree to them, together with the specific terms on your quotation."
        sections={sections}
      />
    </SiteShell>
  );
}
