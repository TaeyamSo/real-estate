export type MediaType = "image" | "video";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "google"
  | "other";

export const SOCIAL_PLATFORM_LABELS: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
  google: "Google",
  other: "Other",
};

export interface MediaField {
  url: string;
  type: MediaType;
}

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AdminReview {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface AdminUnit {
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
  description: string;
}

/* ── Validation helpers ──────────────────────────────────── */
export const VALIDATORS = {
  required: (v: string) => (v.trim() ? "" : "This field is required."),
  url: (v: string) => {
    if (!v.trim()) return "URL is required.";
    if (!/^https?:\/\/.+/.test(v.trim())) return "Must be a valid URL starting with https:// or http://";
    return "";
  },
  optionalUrl: (v: string) => {
    if (!v.trim()) return "";
    if (!/^https?:\/\/.+/.test(v.trim())) return "Must be a valid URL starting with https:// or http://";
    return "";
  },
  maxChars: (max: number) => (v: string) =>
    v.length > max ? `Exceeds ${max} character limit (${v.length - max} over).` : "",
  minChars: (min: number) => (v: string) =>
    v.trim().length < min ? `Minimum ${min} characters required.` : "",
  email: (v: string) => {
    if (!v.trim()) return "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return "Invalid email address.";
    return "";
  },
  phone: (v: string) => {
    if (!v.trim()) return "";
    if (!/^\+?[\d\s\-().]{7,20}$/.test(v.trim())) return "Invalid phone number.";
    return "";
  },
  positiveNumber: (v: string) => {
    if (!v.trim()) return "Required.";
    const n = Number(v);
    if (isNaN(n) || n <= 0) return "Must be a positive number.";
    return "";
  },
  positiveInt: (v: string) => {
    if (!v.trim()) return "Required.";
    const n = Number(v);
    if (!Number.isInteger(n) || n < 0) return "Must be a non-negative whole number.";
    return "";
  },
  rating: (v: string) => {
    const n = Number(v);
    if (isNaN(n) || n < 1 || n > 5) return "Rating must be between 1 and 5.";
    return "";
  },
};

export function combine(...fns: Array<(v: string) => string>) {
  return (v: string) => {
    for (const fn of fns) {
      const err = fn(v);
      if (err) return err;
    }
    return "";
  };
}
