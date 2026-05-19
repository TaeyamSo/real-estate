import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div
      className="flex-shrink-0 rounded-[12px] p-5 text-left snap-start"
      style={{
        flex: "0 0 300px",
        background: "white",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex items-center gap-[15px] mb-[15px]">
        <div
          className="rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
          style={{
            width: 50,
            height: 50,
            background: "#002147",
          }}
        >
          {review.initial}
        </div>
        <div>
          <strong className="block" style={{ color: "#002147" }}>
            {review.name}
          </strong>
          <small style={{ color: "#64748b" }}>{review.role}</small>
        </div>
      </div>
      <div className="mb-3" style={{ color: "#fbbc05", fontSize: "1.1rem" }}>
        {"★".repeat(review.rating)}
      </div>
      <p className="m-0 text-[0.95rem] leading-relaxed" style={{ color: "#334155" }}>
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}
