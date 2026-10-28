// Static content for the About page. Images live in public/images/about/<section>/.

/** About page image, e.g. aboutImg("guides/guide-1") -> /images/about/guides/guide-1.webp */
export const aboutImg = (path: string) => `/images/about/${path}.webp`;

export const knowUs = {
  text: "We plan trips across Tamil Nadu the way locals travel it: unhurried, well fed and full of stories, with every stay and transfer checked by our own team.",
  feature: {
    image: aboutImg("know-us/consultation"),
    title: "Free Consultation",
    text: "Tell us your dates and budget and we will sketch a plan for you, free.",
  },
  checks: [
    "Hand-picked stays from beach huts to heritage homes",
    "Licensed drivers and local guides on every tour",
    "Expert planners available all week",
  ],
  photoMain: aboutImg("know-us/main-photo"),
  photoMainCaption: "Beautiful Places",
  photoSmall: aboutImg("know-us/small-photo"),
  badge: aboutImg("know-us/badge"),
  shape: aboutImg("know-us/shape"),
};

export const reviews = [
  {
    name: "Kavya Raman",
    role: "Web Designer",
    date: "05 Nov 25",
    image: aboutImg("testimonials/avatar-1"),
    text: "Our Madurai and Rameswaram trip was perfectly planned. The guide was warm, punctual and full of stories, and every hotel was better than the photos.",
  },
  {
    name: "Arjun Mehta",
    role: "President of Sales",
    date: "05 Nov 25",
    image: aboutImg("testimonials/avatar-2"),
    text: "Booked Ooty for the family at the last minute and everything just worked: hotels, cab and the toy train. We will book our next holiday here too.",
  },
  {
    name: "Priya Raman",
    role: "Founder & CEO",
    date: "05 Nov 25",
    image: aboutImg("testimonials/avatar-3"),
    text: "Honest pricing and great support on WhatsApp throughout the trip. The Chettinad food trail alone was worth it. Highly recommended for first-timers.",
  },
  {
    name: "Rahul Nair",
    role: "Photographer",
    date: "05 Nov 25",
    image: aboutImg("testimonials/avatar-4"),
    text: "The Western Ghats photo walk was the highlight of our year. Sunrise spots we would never have found ourselves, and a guide who knew every trail.",
  },
];

export const guides = [
  { name: "Lakshmi Iyer", role: "Consultant", image: aboutImg("guides/guide-3") },
  { name: "Karthik Rajan", role: "Consultant", image: aboutImg("guides/guide-4") },
  { name: "Meena Sundar", role: "Consultant", image: aboutImg("guides/guide-5") },
  { name: "Vikram Das", role: "Consultant", image: aboutImg("guides/guide-6") },
  { name: "Anitha Kumar", role: "Consultant", image: aboutImg("guides/guide-1") },
  { name: "Suresh Babu", role: "Consultant", image: aboutImg("guides/guide-2") },
];
