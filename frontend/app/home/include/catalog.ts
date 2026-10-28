// Site catalogue shared by the pages: tour packages (from Madras Modern Tourism quotations),
// destinations, tour types, activities and news. Swap for backend data when the API is ready.

import { asset, img, type Tour } from "./data";

/** `pax` is the group size (or people sharing a room when `label` says so, e.g. "Double sharing"). */
export type RateTable = { title: string; note?: string; rows: { pax: number; price: number; label?: string }[] };

export type TourDetail = Tour & {
  destination: string; // destination slug
  type: string; // tour type slug
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; points: string[] }[];
  includes: string[];
  excludes: string[];
  gallery: string[];
  /** Per-person rates by group size (one table per hotel when there are hotel options). */
  rates?: RateTable[];
  hotels?: string[];
  /** Extra info blocks such as child policy, tip policy and terms. */
  notes?: { title: string; items: string[] }[];
};

const day = (n: number, title: string, points: string[]) => ({ day: `Day ${n}`, title, points });

const baliHotels = ["Natya Kuta", "Radhana", "Boss Legian (Superior / Business Thematic)"];

const baliIncludes = (nights: number) => [
  "Welcome flower garland",
  "Airport–hotel–airport transfers",
  `${nights} nights' hotel accommodation with breakfast`,
  "English-speaking driver",
  "Tours and meals as per the program",
  "One bottle of mineral water during tours",
  "Entrance fees as per the itinerary",
];

const baliExcludes = [
  "International air tickets",
  "Visa on arrival: IDR 500,000 per person (as quoted by the supplier; subject to official charges)",
  "Nusa Penida island retribution fee: IDR 25,000 per person",
  "Personal expenses",
  "Tips and gratuities for the driver/guide",
  "Any services not specifically mentioned under inclusions",
];

const baliTerms = {
  title: "Important remarks",
  items: [
    "This quotation is an offer only; no booking has been made yet.",
    "Rates and availability are dynamic and subject to change until booking confirmation.",
    "Hotel accommodation is subject to availability at the time of booking.",
    "Early check-in and late check-out depend on hotel availability and may cost extra.",
    "The final itinerary and inclusions are subject to supplier confirmation.",
  ],
};

const baliDays = {
  arrival: day(1, "Arrival in Bali", ["Meet and greet upon arrival", "Transfer to the hotel", "Hotel check-in and leisure time"]),
  uluwatu: day(2, "Water Sports & Uluwatu Temple", [
    "Full-day water sports combo: Banana Boat, Jet Ski and Parasailing",
    "Visit Uluwatu Temple",
    "Traditional Kecak Dance performance",
  ]),
  penida: day(3, "West Nusa Penida Island Tour", [
    "Kelingking Beach, Broken Beach, Angel's Billabong and Crystal Bay",
    "Local lunch at Nusa Penida",
    "Island retribution fee of IDR 25,000 per person is excluded",
  ]),
};

export const allTours: TourDetail[] = [
  {
    slug: "bali-3-nights-4-days",
    title: "Bali Escape – 3 Nights / 4 Days",
    text: "Water sports, Uluwatu Temple with Kecak dance and a day on Nusa Penida island.",
    image: asset("destinations/dest-beach"),
    rating: 4.8, reviews: 24, duration: "4 Days - 3 Nights", group: "2-15", location: "Bali, Indonesia",
    price: 12603, badge: "Best Seller",
    destination: "bali", type: "beach",
    overview:
      "A short Bali holiday with comfortable hotel stays, sightseeing, transfers and exciting activities: a full day of water sports, sunset at Uluwatu Temple with the Kecak dance, and the famous cliffs and beaches of West Nusa Penida.",
    highlights: ["Banana Boat, Jet Ski and Parasailing combo", "Uluwatu Temple and Kecak Dance", "Kelingking Beach, Broken Beach and Crystal Bay on Nusa Penida", "Daily breakfast at your hotel"],
    itinerary: [baliDays.arrival, baliDays.uluwatu, baliDays.penida, day(4, "Departure", ["Breakfast at the hotel", "Transfer to the airport for your return flight"])],
    includes: baliIncludes(3),
    excludes: baliExcludes,
    gallery: [asset("destinations/dest-beach"), asset("tours/tour-paraglide"), asset("destinations/dest-harbour"), asset("gallery/gallery-plane")],
    hotels: baliHotels,
    rates: [{
      title: "Per person rate (INR)",
      note: "3 nights with breakfast",
      rows: [
        { pax: 2, price: 14781 }, { pax: 4, price: 13296 }, { pax: 6, price: 13989 },
        { pax: 8, price: 13197 }, { pax: 12, price: 12603 }, { pax: 15, price: 12702 },
      ],
    }],
    notes: [baliTerms],
  },
  {
    slug: "bali-4-nights-5-days",
    title: "Bali Explorer – 4 Nights / 5 Days",
    text: "Everything in the Bali escape plus Ubud, Kintamani volcano views and a coffee plantation.",
    image: asset("tours/tour-paraglide"),
    rating: 4.9, reviews: 31, duration: "5 Days - 4 Nights", group: "2-15", location: "Bali, Indonesia",
    price: 14682,
    destination: "bali", type: "adventure",
    overview:
      "Our most complete Bali package: water sports and Uluwatu Temple, the island tour of West Nusa Penida, and a day inland through the craft villages of Celuk and Mas, Ubud Palace and market, Kintamani volcano and a coffee plantation.",
    highlights: ["Water sports combo and Uluwatu Kecak Dance", "West Nusa Penida island tour with lunch", "Ubud Palace, Ubud Market and Kintamani volcano", "Coffee plantation and agro-tourism visit"],
    itinerary: [
      baliDays.arrival, baliDays.uluwatu, baliDays.penida,
      day(4, "Kintamani & Ubud Tour", ["Visit Celuk and Mas villages", "Explore Ubud Palace and Ubud Market", "Views of the Kintamani volcano", "Coffee plantation and agro-tourism attractions"]),
      day(5, "Departure", ["Breakfast at the hotel", "Transfer to the airport for your return flight"]),
    ],
    includes: baliIncludes(4),
    excludes: baliExcludes,
    gallery: [asset("tours/tour-paraglide"), asset("destinations/dest-beach"), asset("tours/tour-hiker"), asset("destinations/dest-harbour")],
    hotels: baliHotels,
    rates: [{
      title: "Per person rate (INR)",
      note: "4 nights with breakfast",
      rows: [
        { pax: 2, price: 17454 }, { pax: 4, price: 15375 }, { pax: 6, price: 16464 },
        { pax: 8, price: 15375 }, { pax: 12, price: 14682 }, { pax: 15, price: 14880 },
      ],
    }],
    notes: [baliTerms],
  },
  {
    slug: "kuala-lumpur-signature-journey",
    title: "Kuala Lumpur Signature Journey",
    text: "Putrajaya cruise, KL Tower, Genting Highlands cable car and a full day at Sunway Lagoon.",
    image: asset("destinations/dest-plaza"),
    rating: 4.7, reviews: 18, duration: "5 Days - 4 Nights", group: "2-8", location: "Kuala Lumpur, Malaysia",
    price: 26100,
    destination: "kuala-lumpur", type: "family",
    overview:
      "Five days in Malaysia's capital with daily breakfast and private transfers: Putrajaya with a lake cruise, the Kuala Lumpur city tour with KL Tower, Genting Highlands by cable car with a Batu Caves stop, and a full day at Sunway Lagoon Theme Park.",
    highlights: [
      "Putrajaya sightseeing with Cruise Tasik Putrajaya",
      "Kuala Lumpur city tour with KL Tower Observation Deck",
      "Genting Highlands with two-way cable car tickets",
      "Batu Caves photo stop",
      "Full-day Sunway Lagoon Theme Park visit",
      "Private airport transfers and sightseeing transportation",
    ],
    itinerary: [
      day(1, "Arrival in Kuala Lumpur | Putrajaya Tour", [
        "Arrive at Kuala Lumpur International Airport",
        "Half-day Putrajaya tour with Cruise Tasik Putrajaya",
        "Dataran Putra, Putra Mosque (photo stop), Perdana Putra and Seri Perdana (drive past)",
        "Putrajaya's iconic bridges and the International Convention Centre",
        "Hotel check-in; evening free for leisure",
      ]),
      day(2, "Kuala Lumpur City Tour (Breakfast)", [
        "Half-day city tour including KL Tower Observation Deck",
        "King's Palace, Independence Square and Petronas Twin Towers (photo stops)",
        "National Monument",
        "Evening free for leisure",
      ]),
      day(3, "Genting Highlands Tour (Breakfast)", [
        "Full-day Genting Highlands excursion",
        "Complimentary 20-minute stop at Batu Caves",
        "Scenic two-way cable car ride",
        "Return to the hotel in the evening",
      ]),
      day(4, "Sunway Lagoon Theme Park (Breakfast)", [
        "Full-day visit to Sunway Lagoon Theme Park",
        "Six zones: Amusement Park, Water Park, Wildlife Park, Scream Park, Nickelodeon Lost Lagoon and Extreme Park",
        "Return transfer to the hotel",
      ]),
      day(5, "Departure (Breakfast)", ["Breakfast and hotel check-out", "Transfer to Kuala Lumpur International Airport"]),
    ],
    includes: [
      "Four nights' accommodation in Kuala Lumpur",
      "Daily breakfast at the hotel",
      "Private air-conditioned airport transfers",
      "Private air-conditioned sightseeing transfers as per the itinerary",
      "Putrajaya sightseeing and Cruise Tasik Putrajaya entrance",
      "Kuala Lumpur city tour with KL Tower Observation Deck entrance",
      "Genting Highlands tour with two-way cable car tickets",
      "Sunway Lagoon Theme Park entrance",
    ],
    excludes: [
      "International and domestic flight tickets",
      "Malaysian tourism tax of MYR 10 per room per night",
      "Midnight transfer surcharge (11:00 PM – 6:00 AM), if applicable",
      "Peak-season, public holiday and school holiday surcharges, if applicable",
      "Optional tours, excursions and personal expenses",
      "Any services not specifically mentioned under inclusions",
    ],
    gallery: [asset("destinations/dest-plaza"), asset("promos/promo-friends"), asset("destinations/dest-harbour"), asset("promos/promo-couple")],
    hotels: [
      "Ramada Encore by Wyndham Chinatown (3★) – Standard Room",
      "Furama Bukit Bintang (3★) – Superior Room",
      "Royal Chulan Kuala Lumpur (4★) – Superior Room",
      "Pullman Kuala Lumpur City Centre (4★) – Deluxe Room",
      "Four Points by Sheraton KL City Centre (4★) – Deluxe Room",
    ],
    rates: [
      { title: "Ramada Encore Chinatown (3★)", note: "Standard Room (Deluxe)", rows: [{ pax: 2, price: 31800 }, { pax: 3, price: 33200 }, { pax: 4, price: 26100 }, { pax: 6, price: 28700 }, { pax: 8, price: 30100 }] },
      { title: "Furama Bukit Bintang (3★)", note: "Superior Room", rows: [{ pax: 2, price: 36600 }, { pax: 3, price: 36900 }, { pax: 4, price: 27900 }, { pax: 6, price: 33500 }, { pax: 8, price: 33800 }] },
      { title: "Royal Chulan Kuala Lumpur (4★)", note: "Superior Room", rows: [{ pax: 2, price: 40400 }, { pax: 3, price: 40600 }, { pax: 4, price: 29000 }, { pax: 6, price: 37200 }, { pax: 8, price: 37500 }] },
      { title: "Pullman KL City Centre (4★)", note: "Deluxe Room", rows: [{ pax: 2, price: 46600 }, { pax: 3, price: 44800 }, { pax: 4, price: 29600 }, { pax: 6, price: 43500 }, { pax: 8, price: 41700 }] },
      { title: "Four Points by Sheraton KLCC (4★)", note: "Deluxe Room", rows: [{ pax: 2, price: 49800 }, { pax: 3, price: 41900 }, { pax: 4, price: 29500 }, { pax: 6, price: 46600 }, { pax: 8, price: 38700 }] },
    ],
    notes: [{
      title: "Terms & conditions",
      items: [
        "Rates are per adult on a sharing basis, in INR.",
        "Rates are subject to availability and reconfirmation at the time of booking.",
        "No hotel rooms or services are blocked until confirmation.",
        "Final pricing depends on travel dates, number of passengers, room configuration and children's ages.",
        "The itinerary may be adjusted according to operational requirements.",
        "Flight tickets are not included unless specifically stated.",
      ],
    }],
  },
  {
    slug: "vietnam-da-nang-4-nights-5-days",
    title: "Vietnam Da Nang – 4 Nights / 5 Days",
    text: "Ba Na Hills Golden Bridge, Hoi An Ancient Town, Coconut Village and Hue city tour.",
    image: asset("destinations/dest-harbour"),
    rating: 4.8, reviews: 15, duration: "5 Days - 4 Nights", group: "2+", location: "Da Nang, Vietnam",
    price: 28680,
    destination: "da-nang", type: "culture",
    overview:
      "Four nights in Da Nang at a 3-star hotel (Anfada Hotel, Deluxe Room) with private airport transfers and shared (SIC) sightseeing with a guide: Ba Na Hills and the Golden Bridge, Hoi An's Coconut Village and Ancient Town, and the imperial city of Hue via the Hai Van Pass.",
    highlights: [
      "Ba Na Hills two-way cable car, Golden Bridge and Fantasy Park",
      "Basket boat ride at Hoi An Coconut Village",
      "Hoi An Ancient Town with a lantern boat ride",
      "Hue Imperial Citadel, Khai Dinh Tomb and Thien Mu Pagoda",
      "Lunch included on Days 2 and 4",
    ],
    itinerary: [
      day(1, "Arrival in Da Nang", ["Arrival at Da Nang Airport", "Private airport transfer", "Free time for leisure", "Overnight stay in Da Nang"]),
      day(2, "Ba Na Hills Full-Day Tour (Breakfast, Lunch)", ["Two-way cable car ride", "Golden Bridge and French Village", "Fantasy Park entry", "Shared tour with guide"]),
      day(3, "Coconut Village + Hoi An Ancient Town (Breakfast)", ["Hoi An Coconut Village", "Basket boat experience", "Explore Hoi An Ancient Town", "Lantern boat ride", "Shared tour with guide"]),
      day(4, "Hue City Tour (Breakfast, Lunch)", ["Scenic drive via Hai Van Pass", "Khai Dinh Tomb", "Imperial Citadel", "Thien Mu Pagoda", "Shared tour with guide"]),
      day(5, "Departure (Breakfast)", ["Breakfast at the hotel", "Private transfer to the airport", "Departure from Da Nang"]),
    ],
    includes: [
      "4 nights' accommodation in a 3-star hotel with daily breakfast",
      "Private airport transfers",
      "Sightseeing tours as per the itinerary (shared SIC)",
      "English-speaking guide on group tours",
      "Entrance fees for attractions in the itinerary",
      "Ba Na Hills two-way cable car and Fantasy Park entry",
      "Basket boat and lantern boat experiences",
      "Lunch on Days 2 and 4",
    ],
    excludes: [
      "International airfare",
      "Vietnam e-visa",
      "Driver and guide tips",
      "Meals not mentioned in the itinerary",
      "Beverages and personal expenses",
      "Travel insurance",
      "Early check-in and late check-out",
      "Additional expenses",
    ],
    gallery: [asset("destinations/dest-harbour"), asset("destinations/dest-plaza"), asset("destinations/dest-beach"), asset("tours/tour-photographer")],
    hotels: ["Anfada Hotel (3★) – Deluxe Room"],
    notes: [
      {
        title: "Child policy",
        items: [
          "Children 4 years: free of cost in the hotel (without bed).",
          "Child 0–3 years or under 100 cm: free on the land part.",
          "Child 4–7 years or 100–129 cm: 80% of the adult land charge; any entrance fees are paid directly.",
        ],
      },
      {
        title: "Tip policy",
        items: [
          "Tip for driver and guide is compulsory: USD 3–5 per person per day, collected in advance or on arrival.",
          "Tips for bellman, boat, cruise, cyclo and restaurants are at your discretion.",
          "Children from 4 years tip the same as adults.",
        ],
      },
      {
        title: "Terms & conditions",
        items: [
          "Rate is per adult, valid until 24 October 2026, subject to availability and reconfirmation.",
          "Hotel arrangements are subject to availability at the time of confirmation.",
          "Standard check-in is 3:00 PM and check-out is 12:00 PM.",
          "SIC tours run on a shared basis; schedules and vehicles are managed by the local operator.",
          "Each passenger may carry one 24-inch suitcase and one small handbag.",
          "A refundable or incidental hotel deposit may be required at check-in.",
        ],
      },
    ],
  },
  {
    slug: "sri-lanka-4-nights-5-days",
    title: "Sri Lanka – 4 Nights / 5 Days",
    text: "Kandy, the tea hills of Nuwara Eliya and two nights on the beach at Bentota.",
    image: asset("tours/tour-hiker"),
    rating: 4.8, reviews: 12, duration: "5 Days - 4 Nights", group: "2+", location: "Kandy · Nuwara Eliya · Bentota, Sri Lanka",
    price: 27650,
    destination: "sri-lanka", type: "culture",
    overview:
      "A private tour from the hill country to the coast: Pinnawala Elephant Orphanage and the Temple of the Tooth Relic in Kandy, tea estates and Gregory Lake in Nuwara Eliya (\"Little England\"), then two nights at a Bentota beach resort with a Madhu River boat safari. Breakfast and dinner daily, private A/C transfers with an English/Arabic speaking guide.",
    highlights: [
      "Pinnawala Elephant Orphanage feeding and river bathing",
      "Spice Garden with a complimentary head & shoulder massage",
      "Temple of the Tooth Relic and Kandy Lake",
      "Ramboda Falls, Hanuman temple and Ceylon tea factory tasting",
      "Madhu River boat safari and turtle hatchery",
      "Breakfast & dinner daily (half board)",
    ],
    itinerary: [
      day(1, "Arrival in BIA ➔ Kandy", [
        "Meet & greet at Bandaranaike International Airport by our representative",
        "En-route visit Pinnawala Elephant Orphanage: elephants feeding and river bathing",
        "En-route Spice Garden with a complimentary head & shoulder massage",
        "Evening visit to the Temple of the Tooth Relic",
        "Check in at Kandy and enjoy an evening walk around Kandy Lake",
      ]),
      day(2, "Kandy ➔ Nuwara Eliya (\"Little England\")", [
        "After breakfast, drive to Nuwara Eliya through scenic tea hill landscapes",
        "En-route Ramboda Hanuman temple, Ramboda Falls and a Ceylon tea factory with tea tasting",
        "Gregory Lake for boating/cycling, colonial architecture and the historic Post Office",
        "Evening: Seetha Amman Temple (optional)",
        "Overnight stay at Nuwara Eliya",
      ]),
      day(3, "Nuwara Eliya ➔ Bentota Beach Resort", [
        "After breakfast, transfer to the coast at Bentota",
        "Check in at the beach resort and unwind on the sandy shores",
        "Leisure time for beach activities and water sports (Jet Ski, Banana Boating)",
        "Overnight stay at Bentota",
      ]),
      day(4, "Bentota Coastal Excursions", [
        "Morning boat safari on the Madhu River: mangroves, islets and birdlife",
        "Visit a turtle hatchery conservation centre",
        "Sunset relaxation on Bentota Beach",
      ]),
      day(5, "Bentota ➔ Airport Departure", ["Breakfast at the hotel", "Private transfer to Bandaranaike International Airport for your flight"]),
    ],
    includes: [
      "Airport pick-up & drop-off at Bandaranaike International Airport",
      "Private transfers in an A/C coach with an English/Arabic speaking guide",
      "Breakfast & dinner at the hotel (half board)",
      "Sightseeing transfers in each city as per itinerary (without entrance fees)",
      "24/7 dedicated customer care",
      "Complimentary head & shoulder massage at the Spice Garden",
      "1 free SIM card with internet per room",
      "2 × 500 ml water bottles per person per day",
    ],
    excludes: [
      "International airfare and entry visa fees (www.eta.gov.lk)",
      "Entrance fees to monuments and sightseeing locations",
      "Lunch",
      "Meals outside the specified meal plan and personal expenses",
      "Camera & video permits at attractions",
      "GST, tips, driver portages, early check-in and late check-out",
    ],
    gallery: [asset("tours/tour-hiker"), asset("destinations/dest-beach"), asset("tours/tour-photographer"), asset("destinations/dest-harbour")],
    hotels: [
      "Standard (3★): Rivendell Kandy · Oakray Summerhill Breeze, Nuwara Eliya · Hibiscus Beach Hotel, Bentota – Deluxe rooms",
      "Superior (4★): Radisson Kandy · Rippon Grand Hills / The Blackpool, Nuwara Eliya · Hibiscus Beach Hotel, Bentota – Deluxe rooms",
      "Stay: Kandy 1 night · Nuwara Eliya 1 night · Bentota 2 nights, half board (breakfast & dinner)",
    ],
    rates: [
      { title: "Standard Package (3★)", note: "Half board", rows: [{ pax: 2, price: 29630, label: "Double sharing" }, { pax: 3, price: 27650, label: "Triple sharing" }] },
      { title: "Superior Package (4★)", note: "Half board", rows: [{ pax: 2, price: 31630, label: "Double sharing" }, { pax: 3, price: 28245, label: "Triple sharing" }] },
    ],
    notes: [{
      title: "Policy note",
      items: [
        "Rates are per person, in INR, on a half-board basis.",
        "Rates valid for South Asian & Middle East nationalities only (minimum 2–3 pax).",
        "Rooms are subject to availability.",
        "Standard check-in 14:00 | check-out 12:00.",
        "Travel is by flat-roof van with a private guide.",
      ],
    }],
  },
];

export const findTour = (slug: string) => allTours.find((t) => t.slug === slug);

/**
 * Per-person price for a group size: uses the first rate table (the cheapest hotel)
 * and the largest listed group size that fits, otherwise the "from" price.
 */
export const priceFor = (t: TourDetail, guests: number) => {
  const rows = t.rates?.[0]?.rows;
  if (!rows?.length) return t.price;
  const fit = [...rows].sort((a, b) => a.pax - b.pax).filter((r) => r.pax <= guests).pop();
  return (fit ?? rows[0]).price;
};

export const destinations = [
  { slug: "bali", name: "Bali", country: "Indonesia", subtitle: "TRAVEL TO", image: asset("destinations/dest-beach"), text: "Temples, cliffs and beaches: Uluwatu, Nusa Penida and Ubud, Indonesia." },
  { slug: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", subtitle: "PLACES IN", image: asset("destinations/dest-plaza"), text: "Petronas Towers, Genting Highlands and Sunway Lagoon, Malaysia." },
  { slug: "da-nang", name: "Da Nang", country: "Vietnam", subtitle: "TRAVEL TO", image: asset("destinations/dest-harbour"), text: "Ba Na Hills, Hoi An Ancient Town and Hue, Vietnam." },
  { slug: "sri-lanka", name: "Sri Lanka", country: "Sri Lanka", subtitle: "TRAVEL TO", image: asset("tours/tour-hiker"), text: "Kandy temples, Nuwara Eliya tea hills and Bentota beaches." },
];

export const tourTypeList = [
  { slug: "beach", title: "Beach & Islands", icon: "fa-solid fa-umbrella-beach", text: "Island tours, beaches and water sports." },
  { slug: "adventure", title: "Adventure", icon: "fa-solid fa-person-hiking", text: "Volcano views, island hopping and active days." },
  { slug: "family", title: "Family & Theme Parks", icon: "fa-solid fa-children", text: "Theme parks, cable cars and easy city tours." },
  { slug: "culture", title: "Culture & Heritage", icon: "fa-solid fa-landmark", text: "Ancient towns, citadels and temples." },
];

export const activities = [
  { title: "Temple Architecture Walk", icon: "fa-solid fa-gopuram", image: asset("destinations/dest-plaza"), price: 799, duration: "3 Hours", text: "Read the stories carved into Dravidian gopurams with a historian." },
  { title: "Kayaking in Pichavaram", icon: "fa-solid fa-water", image: asset("destinations/dest-harbour"), price: 1199, duration: "2 Hours", text: "Paddle through one of the world's largest mangrove forests." },
  { title: "Chettinad Cooking Class", icon: "fa-solid fa-bowl-food", image: asset("promos/promo-friends"), price: 1499, duration: "4 Hours", text: "Cook a full Chettinad meal in a heritage mansion kitchen." },
  { title: "Nilgiri Toy Train Ride", icon: "fa-solid fa-train", image: asset("tours/tour-hiker"), price: 699, duration: "5 Hours", text: "The UNESCO mountain railway from Mettupalayam to Ooty." },
  { title: "Scuba at Pondicherry", icon: "fa-solid fa-person-swimming", image: asset("destinations/dest-beach"), price: 5999, duration: "Half Day", text: "Beginner dives at Temple Reef with PADI instructors." },
  { title: "Tandem Paragliding", icon: "fa-solid fa-parachute-box", image: asset("tours/tour-paraglide"), price: 2999, duration: "1 Hour", text: "Fly over Kodaikanal's valleys with a certified pilot." },
];

export type Post = { slug: string; date: string; month: string; title: string; image: string; author: string; excerpt: string; body: string[] };

export const allPosts: Post[] = [
  {
    slug: "top-8-places-to-stay-in-tamil-nadu",
    date: "04", month: "Nov", title: "Top 8 Amazing Places to Stay in Tamil Nadu", image: img("1602216056096-3b40cc0c9944"), author: "Admin",
    excerpt: "From Chettinad mansions to tea-estate bungalows, these stays are part of the trip.",
    body: [
      "Tamil Nadu has stays that are destinations in themselves. In Karaikudi, restored Chettinad mansions serve multi-course banana-leaf lunches in courtyards lined with Burma teak.",
      "Up in the Nilgiris, colonial tea-estate bungalows come with fireplaces and morning walks through the bushes, while Pondicherry's White Town has quiet heritage guesthouses a short walk from the promenade.",
      "Ask our planners to mix one special stay into any tour: it changes the whole trip.",
    ],
  },
  {
    slug: "journeys-are-best-with-friends",
    date: "04", month: "Nov", title: "Journeys are best measured with friends", image: img("1527631746610-bca00a040d60"), author: "Admin",
    excerpt: "Group trips need a little planning and a lot of snacks. Here's how we make them easy.",
    body: [
      "Travelling with friends means splitting bills, agreeing on wake-up times and making space for everyone's must-sees.",
      "Our group packages handle the logistics: one vehicle, rooms close together and a guide who keeps the day moving while leaving room for detours.",
    ],
  },
  {
    slug: "top-5-destinations-adventure-travel",
    date: "04", month: "Nov", title: "Top 5 destinations & adventure travel", image: img("1506905925346-21bda4d32df4"), author: "Admin",
    excerpt: "Paragliding, treks and reef dives: where to go for an adrenaline weekend.",
    body: [
      "Kodaikanal for paragliding, the Nilgiris for ridge treks, Valparai for wildlife, Pondicherry for scuba and Yelagiri for climbing.",
      "Each of these works as a long weekend from Chennai or Bengaluru, and we can combine two on a five-day trip.",
    ],
  },
];

export const findPost = (slug: string) => allPosts.find((p) => p.slug === slug);
