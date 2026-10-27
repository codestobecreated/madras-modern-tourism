import { Tour, Destination, Testimonial, TourType, SliderSlide } from "./types";

export const SLIDES: SliderSlide[] = [
  {
    id: "slide-1",
    tagline: "Amazing places to relax",
    title: "Beginning of your Travel Journey",
    bgShape: "/assets/input_file_0.png",
    image: "/assets/input_file_24.png", // suitcases & globe
    accentImage: "/assets/input_file_21.png", // wing overlay beach
    actionText: "Discover More",
  },
  {
    id: "slide-2",
    tagline: "Unleash your inner adventurer",
    title: "Explore the Unknown Wonders",
    bgShape: "/assets/input_file_46.png",
    image: "/assets/input_file_2.png", // paraglider over snowy mountain
    accentImage: "/assets/input_file_18.png", // suitcase with window of plane
    actionText: "Start Booking"
  },
  {
    id: "slide-3",
    tagline: "Premium travel experiences",
    title: "Cherish Every Beautiful Milestone",
    bgShape: "/assets/input_file_37.png",
    image: "/assets/input_file_3.png", // hiker
    accentImage: "/assets/input_file_17.png", // happy backpacker boy
    actionText: "Explore Now"
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: "italy",
    name: "Italy",
    listingsCount: 5,
    tagline: "Places in",
    image: "/assets/input_file_10.png", // Seville Plaza de España as representative Europe
    category: "Europe"
  },
  {
    id: "france",
    name: "France",
    listingsCount: 3,
    tagline: "Places in",
    image: "/assets/input_file_5.png", // photographer as France
    category: "Europe"
  },
  {
    id: "maldives",
    name: "Maldives",
    listingsCount: 3,
    tagline: "Travel to",
    image: "/assets/input_file_9.png", // beach lounge chair
    category: "Asia"
  },
  {
    id: "rome",
    name: "Rome",
    listingsCount: 2,
    tagline: "Travel to",
    image: "/assets/input_file_4.png", // close up Opera House / Europe representation
    category: "Europe"
  }
];

export const TOURS: Tour[] = [
  {
    id: "tour-1",
    title: "Boathouse Neighborhood",
    description: "Experience the calming water views and rustic dock layout with standard guide options, perfect for families and small groups.",
    location: "Main Street, Brooklyn, NY",
    image: "/assets/input_file_20.png", // plane wing beach
    galleryImages: ["/assets/input_file_20.png", "/assets/input_file_9.png", "/assets/input_file_13.png"],
    price: 189,
    discountPrice: 259,
    rating: 4.4,
    reviewsCount: 3,
    duration: "4 Hours",
    capacity: "2-18",
    category: "Beache Tour"
  },
  {
    id: "tour-2",
    title: "Body Water Near Mountain",
    description: "Sail through glorious serene fjords flanked by dramatic heights, and capture beautiful landscape photos.",
    location: "Lake Louise, Alberta, Canada",
    image: "/assets/input_file_5.png", // photographer
    galleryImages: ["/assets/input_file_5.png", "/assets/input_file_3.png", "/assets/input_file_2.png"],
    price: 259,
    rating: 4.0,
    reviewsCount: 3,
    duration: "3 Days - 2 Nights",
    capacity: "2-18",
    category: "Nature Walks"
  },
  {
    id: "tour-3",
    title: "Adventure Tour Go Way",
    description: "Enjoy windsurfing, paragliding, or deep trekking on standard trails with our leading security teams.",
    location: "Queenstown, New Zealand",
    image: "/assets/input_file_2.png", // paraglider
    galleryImages: ["/assets/input_file_2.png", "/assets/input_file_3.png", "/assets/input_file_17.png"],
    price: 199,
    discountPrice: 269,
    rating: 3.7,
    reviewsCount: 3,
    duration: "3 Days - 2 Nights",
    capacity: "2-18",
    category: "Adventure"
  },
  {
    id: "tour-4",
    title: "Discovery Island Kayak Tour",
    description: "Fabulous small group ocean kayak excursion to remote sandy beaches, with scenic wildlife observation.",
    location: "Vancouver Island, BC",
    image: "/assets/input_file_20.png", // tropical beach
    galleryImages: ["/assets/input_file_20.png", "/assets/input_file_9.png", "/assets/input_file_13.png"],
    price: 259,
    rating: 4.3,
    reviewsCount: 2,
    duration: "3 Days - 2 Nights",
    capacity: "2-18",
    category: "Water Sports"
  },
  {
    id: "tour-5",
    title: "Man Standing on a Rock",
    description: "A breath-taking challenging hiking expedition to the peak for panoramic view points and starry night camps.",
    location: "Grand Canyon National Park",
    image: "/assets/input_file_3.png", // hiker on rock
    galleryImages: ["/assets/input_file_3.png", "/assets/input_file_5.png", "/assets/input_file_2.png"],
    price: 289,
    rating: 4.0,
    reviewsCount: 2,
    duration: "3 Days - 2 Nights",
    capacity: "2-18",
    category: "Nature Walks"
  },
  {
    id: "tour-6",
    title: "Rainbow Mountain Red Valley",
    description: "Wonders of multi-colored soils and active standard local culture in remote mountains with professional guides.",
    location: "Cusco, Peruvian Andes",
    image: "/assets/input_file_10.png", // historic Plaza
    galleryImages: ["/assets/input_file_10.png", "/assets/input_file_3.png", "/assets/input_file_5.png"],
    price: 239,
    discountPrice: 299,
    rating: 4.3,
    reviewsCount: 2,
    duration: "3 Days - 2 Nights",
    capacity: "2-18",
    category: "Adventure"
  }
];

export const TOUR_TYPES: TourType[] = [
  {
    id: "adventure",
    title: "Adventure",
    iconName: "Compass",
    description: "Passages of lorem Ipsum standard of tourism.",
    link: "#"
  },
  {
    id: "windsurfing",
    title: "Windsurfing",
    iconName: "Waves",
    description: "Incredible beach tours and breezy waves surfing.",
    link: "#"
  },
  {
    id: "paragliding",
    title: "Paragliding",
    iconName: "Plane",
    description: "Adrenaline rushing flight over gorgeous mountains.",
    link: "#"
  },
  {
    id: "wildlife",
    title: "Wildlife",
    iconName: "Tree",
    description: "Amazing safari and animal conservation park camps.",
    link: "#"
  },
  {
    id: "homestay",
    title: "Homestay",
    iconName: "Home",
    description: "Immersive traditional home hosting & cozy organic food.",
    link: "#"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Kabin Martin",
    role: "Regular Tourist",
    quote: "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci sit amet justo interdum hendrerit sagittis with absolute high standards of care.",
    stars: 5,
    avatar: "/assets/input_file_15.png" // blonde woman portrait
  },
  {
    id: "test-2",
    name: "Robert Fox",
    role: "Global Backpacker",
    quote: "Travivu is simply beautiful! Recreating standard layouts with absolute accuracy and professional staff. I've booked three destinations with them and everything was spotless.",
    stars: 5,
    avatar: "/assets/input_file_41.png" // wing in circle
  },
  {
    id: "test-3",
    name: "Jhon Smith",
    role: "Solo Trekker",
    quote: "Our mountain hiking program was organized spectacularly! Complete security kits provided, very helpful guide, and delicious meals throughout the wilderness trail.",
    stars: 5,
    avatar: "/assets/input_file_15.png"
  }
];

export const STATS = [
  { value: "30.3k", label: "Happy Traveler", icon: "Users" },
  { value: "40.5k", label: "Tent Sites", icon: "Tent" },
  { value: "88.9%", label: "Satisfaction Rate", icon: "Smile" },
  { value: "6.30+", label: "Year Of Service", icon: "Award" }
];

export const BRANDS = [
  "/assets/input_file_3.png",
  "/assets/input_file_5.png",
  "/assets/input_file_2.png",
  "/assets/input_file_10.png",
  "/assets/input_file_9.png"
];

export const GALLERY = [
  "/assets/input_file_1.png",  // Sydney
  "/assets/input_file_2.png",  // Paragliding
  "/assets/input_file_3.png",  // Hiker
  "/assets/input_file_4.png",  // Opera House close
  "/assets/input_file_5.png",  // Photographer
  "/assets/input_file_10.png"  // Seville Plaza
];
