export type ServiceCategory =
  | 'All'
  | 'Weddings'
  | 'Corporate Events'
  | 'Conferences'
  | 'Brand Campaigns'
  | 'Music Productions'
  | 'Matric Dance'
  | 'Graduation'
  | 'Studio Shoots';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: ServiceCategory;
  image: string;
  deliverables: string[];
  startingRate: string;
  idealFor: string;
  highlightTag?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  client: string;
  location: string;
  year: string;
  image: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
  videoUrl?: string; // Optional direct video preview
  description: string;
  cameraSpecs?: string;
  featured?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  deliverables: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  category: string;
  rating: number;
  avatar: string;
  location: string;
  event: string;
}

export interface TrustBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  stat?: string;
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  packageTier: 'Standard' | 'Signature' | 'Luxury Cinema';
  eventDate: string;
  locationCity: string;
  estimatedGuests?: string;
  budgetRange: string;
  notes: string;
}
