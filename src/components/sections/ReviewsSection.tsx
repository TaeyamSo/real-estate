"use client";

import { useRef } from "react";
import ReviewCard from "@/components/ui/ReviewCard";
import type { Review } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = 370;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="reviews"
      className="text-center"
      style={{
        minHeight: "calc(100vh - 83px)",
        padding: "50px 5%",
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="max-w-[1300px] mx-auto w-full">
        <h2
          className="font-black text-[1.9rem] mb-3"
          style={{ color: "#002147" }}
        >
          What Our Property Owners &amp; Tenants Say
        </h2>

        {/* Rating */}
<div className="mb-5">
          <span className="font-bold text-[1rem]" style={{ color: "#002147" }}>
            EXCELLENT
          </span>
          <br />
          <span style={{ color: "#fbbc05", fontSize: "1.2rem" }}>★★★★★</span>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Previous reviews"
            className="absolute top-1/2 -translate-y-1/2 left-0 z-10 hidden sm:flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
            style={{
              width: 44,
              height: 44,
              background: "#002147",
              color: "#C5A021",
              border: "none",
              boxShadow: "0 6px 18px rgba(0,33,71,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#C5A021";
              (e.currentTarget as HTMLButtonElement).style.color = "#002147";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#002147";
              (e.currentTarget as HTMLButtonElement).style.color = "#C5A021";
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              padding: "20px 50px",
              scrollSnapType: "x mandatory",
            }}
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Next reviews"
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 hidden sm:flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
            style={{
              width: 44,
              height: 44,
              background: "#002147",
              color: "#C5A021",
              border: "none",
              boxShadow: "0 6px 18px rgba(0,33,71,0.25)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#C5A021";
              (e.currentTarget as HTMLButtonElement).style.color = "#002147";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#002147";
              (e.currentTarget as HTMLButtonElement).style.color = "#C5A021";
            }}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
