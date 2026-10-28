// Static content for the home page sections. Swap these for backend data as the API grows.

export const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const contact = {
  address: "Anna Salai, Chennai, Tamil Nadu",
  email: "hello@madrasmoderntourism.com",
  phone: "+91 95660 48018",
};

export type NavItem = { label: string; href: string; children?: NavItem[] };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Tours",
    href: "/tours-page",
    children: [
      { label: "Tours Page", href: "/tours-page" },
      { label: "Tours – Filter Sidebar", href: "/tours-filter-sidebar" },
      { label: "Tours – List View", href: "/tours-list-view" },
    ],
  },
  { label: "Destination", href: "/destination" },
  {
    label: "Activities",
    href: "/activities",
    children: [
      { label: "Tour Types", href: "/tour-types" },
      { label: "All Activities", href: "/activities" },
    ],
  },
  {
    label: "Pages",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "How It Work", href: "/how-it-work" },
    ],
  },
  {
    label: "News",
    href: "/news",
    children: [{ label: "Latest News", href: "/news" }],
  },
  { label: "Contact", href: "/contact" },
];

export const heroSlides = [
  { script: "Amazing places to relax", title: "Beginning of your Travel Journey" },
  { script: "Explore Tamil Nadu", title: "Temples, Coasts & Hill Stations" },
  { script: "Unforgettable memories", title: "Plan Your Perfect Getaway" },
];

export const aboutFeatures = [
  { icon: "fa-solid fa-person-hiking", title: "Friendly Guide", text: "Local experts who know every street, story and hidden gem." },
  { icon: "fa-solid fa-suitcase-rolling", title: "Safety Travel", text: "Verified stays, licensed drivers and 24/7 trip support." },
];

export const aboutChecks = [
  "Award winning travel agency",
  "Hand-picked hotels and homestays",
  "Flexible, fully customisable itineraries",
];

/** Home page image by section folder, e.g. asset("tours/tour-hiker") -> /images/home/tours/tour-hiker.webp */
export const asset = (path: string) => `/images/home/${path}.webp`;

export type Tour = {
  slug: string;
  title: string;
  text: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string;
  group: string;
  location: string;
  price: number;
  oldPrice?: number;
  badge?: string;
};

export const tourTypes = [
  { icon: "fa-solid fa-person-hiking", title: "Adventure" },
  { icon: "fa-solid fa-person-swimming", title: "Windsurfing" },
  { icon: "fa-solid fa-parachute-box", title: "Paragliding" },
  { icon: "fa-solid fa-paw", title: "Wildlife" },
  { icon: "fa-solid fa-campground", title: "Hang Gliding" },
];

export const testimonials = [
  {
    name: "Kabin Martin",
    role: "Tourist",
    image: img("1438761681033-6461ffad8d80", 200),
    text: "Our Madurai and Rameswaram trip was perfectly planned. The guide was warm, punctual and full of stories.",
  },
  {
    name: "Robert Fox",
    role: "Tourist",
    image: img("1507003211169-0a1dd7228f2d", 200),
    text: "Booked Ooty for the family at the last minute and everything just worked — hotels, cab and the toy train.",
  },
  {
    name: "Jhon Smith",
    role: "Tourist",
    image: asset("testimonials/testi-1"),
    text: "Best way to see Chennai and Mahabalipuram as a first-time visitor. I'd travel with them again in a heartbeat.",
  },
  {
    name: "Priya Raman",
    role: "Tourist",
    image: img("1494790108377-be9c29b29330", 200),
    text: "Honest pricing and great support on WhatsApp throughout the trip. Highly recommended.",
  },
];

export const counters = [
  { value: 30.3, suffix: "k", label: "Happy Traveler", decimals: 1, icon: "fa-solid fa-person-walking-luggage" },
  { value: 40.5, suffix: "k", label: "Tent Sites", decimals: 1, icon: "fa-solid fa-campground" },
  { value: 88.9, suffix: "%", label: "Satisfaction Rate", decimals: 1, icon: "fa-solid fa-thumbs-up" },
  { value: 6.3, suffix: "+", label: "Year Of Service", decimals: 2, icon: "fa-solid fa-headset" },
];

export const gallery = [
  asset("tours/tour-paraglide"),
  asset("destinations/dest-beach"),
  asset("tours/tour-hiker"),
  asset("gallery/gallery-plane"),
  asset("tours/tour-photographer"),
];

export const whyChoose = [
  { icon: "fa-solid fa-plane-departure", title: "Professional & Certified" },
  { icon: "fa-solid fa-credit-card", title: "Best Price Guarantee" },
  { icon: "fa-solid fa-laptop", title: "Get Instant Tour Bookings" },
  { icon: "fa-solid fa-person-hiking", title: "Experienced Guide" },
];

export const posts = [
  { date: "04", month: "Nov", title: "Top 8 Amazing Places to Stay in Tamil Nadu", image: img("1602216056096-3b40cc0c9944") },
  { date: "04", month: "Nov", title: "Journeys are best measured with friends", image: img("1527631746610-bca00a040d60") },
  { date: "04", month: "Nov", title: "Top 5 destinations & adventure travel", image: img("1506905925346-21bda4d32df4") },
];

// Placeholder partner names; swap for real partner logos.
export const brands = ["airways", "stayco", "trekon", "roadtrip", "bluesea"];

export const promos = [
  { tag: "Special offer", title: "Book Your Adventure Today!", image: asset("promos/promo-couple"), tone: "blue" },
  { tag: "Special offer", title: "Pack Your Bags and Go!", image: asset("promos/promo-friends"), tone: "orange" },
];

export const footerLinks = {
  Company: [
    { label: "Tour Listings", href: "/tours-page" },
    { label: "Destinations", href: "/destination" },
    { label: "Tour Activities", href: "/activities" },
    { label: "Tour Types", href: "/tour-types" },
    { label: "How It Work", href: "/how-it-work" },
  ],
  Explore: [
    { label: "About", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Latest News", href: "/news" },
    { label: "Contact Now", href: "/contact" },
  ],
};
