import type { Unit, Review, Service, Stat } from "@/types";

export const staticUnits: Unit[] = [
  {
    id: "58784",
    city: "Columbus",
    price: 1350,
    beds: 2,
    baths: 1,
    sqft: 1200,
    address: "2666 Sawbury Boulevard — Columbus, OH",
    available: "January 21",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/58784",
    status: "Available",
  },
  {
    id: "60188",
    city: "Columbus",
    price: 1300,
    beds: 2,
    baths: 1,
    sqft: 840,
    address: "Thornfield Lane — Columbus, OH",
    available: "March 10",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/60188",
    status: "Available",
  },
  {
    id: "61308",
    city: "Columbus",
    price: 1300,
    beds: 2,
    baths: 1,
    sqft: 840,
    address: "7891 Thornfield Lane — Columbus, OH",
    available: "April 1",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/61308",
    status: "Available",
  },
  {
    id: "60178",
    city: "Hilliard",
    price: 3800,
    beds: 5,
    baths: 3,
    sqft: 3360,
    address: "6170 Ravenhill Road — Hilliard, OH",
    available: "April 7",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/60178",
    status: "Available",
  },
  {
    id: "60436",
    city: "Columbus",
    price: 1100,
    beds: 2,
    baths: 1,
    sqft: 875,
    address: "4645 Merrimar Circle East — Columbus, OH",
    available: "May 1",
    imageUrl:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/60436",
    status: "Available",
  },
  {
    id: "47762",
    city: "Worthington",
    price: 1900,
    beds: 3,
    baths: 2,
    sqft: 1358,
    address: "Worthington Forest Place West — Worthington, OH",
    available: "May 12",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/47762",
    status: "Available",
  },
];

export const staticReviews: Review[] = [
  {
    id: "1",
    name: "Oliviana Contreras",
    initial: "O",
    role: "Verified Client",
    rating: 5,
    text: "The team was responsive, helpful, and made the whole process feel smooth and professional.",
  },
  {
    id: "2",
    name: "Genesis Garza",
    initial: "G",
    role: "Verified Client",
    rating: 5,
    text: "Their attention to detail is unmatched. I've never had a more reliable management partner.",
  },
  {
    id: "3",
    name: "Becky Alvarez",
    initial: "B",
    role: "Verified Client",
    rating: 5,
    text: "Found a great tenant immediately. The digital lease signing made everything incredibly easy.",
  },
  {
    id: "4",
    name: "Marcus Whitfield",
    initial: "M",
    role: "Verified Client",
    rating: 5,
    text: "Owner reporting is crystal-clear and rent hits my account like clockwork. Highly recommend.",
  },
  {
    id: "5",
    name: "Sofia Reyes",
    initial: "S",
    role: "Verified Client",
    rating: 5,
    text: "Maintenance requests get answered fast. As a tenant, I always feel taken care of.",
  },
];

export const residentServices: Service[] = [
  {
    icon: "📋",
    title: "Easy Online Applications",
    description:
      "Apply from anywhere — fast approvals, digital lease signing, and zero paperwork stress.",
  },
  {
    icon: "💳",
    title: "Flexible Online Payments",
    description:
      "Pay rent on your schedule through our secure resident portal with multiple payment methods.",
  },
  {
    icon: "🔧",
    title: "24/7 Maintenance Support",
    description:
      "Submit requests anytime and track progress — fast, reliable repairs from vetted local contractors.",
  },
  {
    icon: "🤝",
    title: "Local Experts, Real Care",
    description:
      "Honest communication and responsive support from the day you move in to the day you move out.",
  },
];

export const ownerServices: Service[] = [
  {
    icon: "📢",
    title: "Full-Service Leasing",
    description:
      "Professional listings across high-traffic platforms ensuring fast placement of high-quality tenants.",
  },
  {
    icon: "💰",
    title: "Rent Collection & Direct Deposit",
    description:
      "Automated rent collection with real-time tracking and direct deposits straight to your account.",
  },
  {
    icon: "📊",
    title: "Transparent Owner Reporting",
    description:
      "Detailed monthly statements and tax-ready documentation accessible through your dedicated owner portal.",
  },
  {
    icon: "📉",
    title: "Strategic Vacancy Minimization",
    description:
      "Proactive marketing and tenant retention to keep your units occupied and ROI maximized.",
  },
];

export const aboutStats: Stat[] = [
  { value: "200+", label: "Units Managed" },
  { value: "10+", label: "Years Experience" },
  { value: "5★", label: "Client Rated" },
];
