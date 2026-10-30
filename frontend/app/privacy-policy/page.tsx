import type { Metadata } from "next";
import SiteShell from "../home/include/site-shell";
import LegalPage, { type LegalSection } from "../home/include/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Madras Modern Tourism",
};

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    body: [
      "When you enquire, book or plan a trip with us, we collect the details you give us, such as:",
      [
        "Your name, phone / WhatsApp number, email address and city.",
        "Travel details: destinations, dates, number of travellers, hotel and budget preferences and special requests.",
        "Passport, visa and identity details of travellers, only when needed to book flights, hotels or visas.",
        "Payment confirmations and invoices for bookings you make with us.",
      ],
      "We also collect basic technical data, such as browser type and pages visited, to keep the website working well.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: [
      [
        "To prepare quotations, itineraries and bookings you ask for.",
        "To book hotels, transfers, sightseeing, flights and visas with our travel partners.",
        "To contact you about your enquiry or trip by phone, WhatsApp or email.",
        "To send offers and travel news, only if you have agreed to receive them.",
        "To meet legal, tax and accounting requirements.",
      ],
    ],
  },
  {
    id: "sharing",
    title: "Sharing with travel partners",
    body: [
      "To deliver your trip we share the necessary details with hotels, ground handlers, transport providers, airlines and visa authorities. They may only use them to provide those services.",
      "We do not sell or rent your personal information to anyone.",
    ],
  },
  {
    id: "security",
    title: "How we protect your data",
    body: [
      "We keep your information on secure systems and limit access to staff who need it to handle your booking. No method of transfer or storage is fully secure, but we take reasonable steps to protect your data.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "We keep enquiry and booking records for as long as needed to provide our services and to meet legal and accounting requirements. Identity documents are deleted once they are no longer needed for your trip.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    body: [
      "Our website may use cookies to remember your preferences and understand how visitors use the site. You can block or delete cookies in your browser settings; some features may not work as expected without them.",
    ],
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    body: [
      [
        "Ask for a copy of the personal information we hold about you.",
        "Ask us to correct or delete your information, unless we must keep it by law.",
        "Unsubscribe from marketing messages at any time.",
      ],
      "To make a request, contact us using the details below.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: ["We may update this policy from time to time. The latest version will always be on this page with its update date."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SiteShell current="/about" title="Privacy Policy">
      <LegalPage
        current="/privacy-policy"
        updated="30 October 2026"
        intro="Madras Modern Tourism LLC respects your privacy. This policy explains what information we collect when you use our website or book a holiday with us, how we use it and the choices you have."
        sections={sections}
      />
    </SiteShell>
  );
}
