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
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/58784",
    status: "Available",
    description:
      "2666 Sawbury Boulevard is a well-located apartment-style condo in North Columbus, offering comfortable, low-maintenance living with quick access to shopping, dining, and everyday essentials. The home features a functional layout with a bright living space, a practical kitchen, and private bedrooms. Convenient to I-270, SR-315, and the Sawmill Road corridor — an ideal option for anyone looking for an easy commute near Worthington, Dublin, and Polaris. One year lease. $1,350 security deposit.",
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
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585128903994-4dc2af7f59c8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/60188",
    status: "Available",
    description:
      "Nestled on Thornfield Lane, this 2-bedroom home offers a cozy and functional floor plan ideal for individuals or couples. Enjoy easy access to downtown Columbus, nearby parks, and local dining. The open living area flows naturally into the kitchen, making everyday life comfortable and convenient. One year lease required.",
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
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/61308",
    status: "Available",
    description:
      "7891 Thornfield Lane is a charming 2-bedroom unit featuring updated flooring and a well-appointed kitchen. Located minutes from major highways, grocery stores, and Columbus Metro Parks. Perfect for those seeking a quiet neighborhood with all the convenience of city living nearby. One year lease. Security deposit equal to one month's rent.",
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
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/60178",
    status: "Available",
    description:
      "This spacious 5-bedroom executive home at 6170 Ravenhill Road in Hilliard sits on a generous lot in one of the area's most sought-after neighborhoods. Featuring 3 full baths, a large kitchen, formal dining room, and a finished basement. Moments from Hilliard City Schools, Scioto Darby Creek Metro Park, and the I-270 corridor. Ideal for growing families or professionals who demand space and quality. One year lease.",
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
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560440021-33f9b867899d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/60436",
    status: "Available",
    description:
      "4645 Merrimar Circle East is an affordable and well-maintained 2-bedroom unit on Columbus's east side. This home offers practical living with easy access to I-270, Eastland Mall, and local dining. A great opportunity for first-time renters or anyone looking to enjoy comfortable, hassle-free living at a competitive price point. One year lease. $1,100 security deposit.",
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
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585128903994-4dc2af7f59c8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl:
      "https://realestate07.managebuilding.com/Resident/public/rentals/47762",
    status: "Available",
    description:
      "Worthington Forest Place West offers a rare 3-bedroom rental in one of Columbus's most desirable suburbs. This home is steps from Worthington's charming downtown, excellent schools, and scenic parks. The bright, open floor plan includes a modern kitchen, spacious bedrooms, and a private backyard — perfect for families or professionals who value community, walkability, and quality of life. One year lease.",
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
