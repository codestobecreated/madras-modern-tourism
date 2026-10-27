export interface Tour {
  id: string;
  title: string;
  description?: string;
  location: string;
  image: string;
  galleryImages?: string[];
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  duration: string;
  capacity: string;
  category: string;
  featured?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  listingsCount: number;
  image: string;
  tagline?: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  stars: number;
  avatar: string;
}

export interface TourType {
  id: string;
  title: string;
  iconName: string;
  description: string;
  link: string;
}

export interface SliderSlide {
  id: string;
  tagline: string;
  title: string;
  bgShape?: string;
  image?: string;
  accentImage?: string;
  actionText: string;
}
