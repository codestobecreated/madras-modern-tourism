import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import LegalPage, { type LegalSection } from "../home/include/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy | Madras Modern Tourism",
};

const sections: LegalSection[] = [
  {
    id: "how-to-cancel",
    title: "How to cancel",
    body: [
      "Send your cancellation request by email or WhatsApp with your booking reference. The cancellation date is the day we receive your written request.",
    ],
  },
  {
    id: "cancellation-charges",
    title: "Cancellation charges",
    body: [
      "Charges are a percentage of the total package cost, based on how many days before departure you cancel:",
      [
        "30 days or more before departure: 25% of the package cost.",
        "15 to 29 days before departure: 50% of the package cost.",
        "7 to 14 days before departure: 75% of the package cost.",
        "Less than 7 days before departure, or no-show: 100% (no refund).",
      ],
      "During peak season, festivals and holiday periods, some hotels and services are non-refundable from the time of booking; these will be mentioned on your confirmation.",
    ],
  },
  {
    id: "non-refundable",
    title: "Non-refundable items",
    body: [
      [
        "Visa fees and visa service charges, whether or not the visa is approved.",
        "Flight tickets, refunded only as per the airline's fare rules.",
        "Travel insurance premiums.",
        "Hotels or services marked non-refundable at the time of booking.",
        "Unused services during the trip, such as missed tours, meals or hotel nights.",
      ],
    ],
  },
  {
    id: "changes",
    title: "Changes to your booking",
    body: [
      "Date or name changes are treated as a cancellation and a new booking if the supplier does not allow changes. Any difference in price and supplier charges will apply.",
    ],
  },
  {
    id: "our-cancellation",
    title: "If we cancel",
    body: [
      "If we have to cancel your trip for reasons within our control, we will offer an alternative of equal value or a full refund of the amount paid to us. We are not responsible for cancellations caused by weather, natural events, strikes, government restrictions or other events beyond our control; in such cases refunds depend on what suppliers return to us.",
    ],
  },
  {
    id: "refund-process",
    title: "Refund process",
    body: [
      "Approved refunds are made to the original payment method within 14 working days after we receive the refund from suppliers. Bank charges, if any, are borne by the traveller.",
    ],
  },
];

export default function RefundPolicyPage() {
  return (
    <SiteShell current="/about" title="Refund Policy">
      <LegalPage
        current="/refund-policy"
        updated="30 October 2026"
        intro="We understand plans can change. This policy explains how cancellations and refunds work for holidays booked with Madras Modern Tourism LLC. Specific terms on your booking confirmation take priority over this general policy."
        sections={sections}
      />
    </SiteShell>
  );
}
