export interface Unit {
  id: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  available: string;
  imageUrl: string;
  images: string[];
  listingUrl: string;
  status: "Available" | "Coming Soon";
  description?: string;
}

export interface Review {
  id: string;
  name: string;
  initial: string;
  role: string;
  rating: number;
  text: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ContactFormData {
  type: "tenant" | "owner";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
