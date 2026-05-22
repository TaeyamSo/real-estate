import type { Unit } from "@/types";
import Image from "next/image";
import { Bed, Bath, Maximize2, Calendar } from "lucide-react";

interface UnitCardProps {
  unit: Unit;
  onClick?: () => void;
}

export default function UnitCard({ unit, onClick }: UnitCardProps) {
  const isAvailable = unit.status === "Available";

  const cardBase =
    "group block w-full text-left rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-[6px]";

  const sharedStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  };

  const hoverEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.boxShadow = "0 24px 50px rgba(0, 0, 0, 0.45)";
    el.style.borderColor = "rgba(197, 160, 33, 0.4)";
  };

  const hoverLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
    el.style.borderColor = "rgba(255, 255, 255, 0.1)";
  };

  const inner = (
    <>
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={unit.imageUrl}
          alt={unit.address}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Bottom gradient for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {/* Status badge */}
        <div
          className="absolute top-3.5 left-3.5 flex items-center gap-1.25 text-[0.65rem] font-black tracking-[1.5px] uppercase px-3 py-1.25 rounded-full"
          style={{
            background: isAvailable ? "#C5A021" : "rgba(255,255,255,0.18)",
            color: isAvailable ? "#002147" : "rgba(255,255,255,0.85)",
            backdropFilter: isAvailable ? "none" : "blur(8px)",
          }}
        >
          {isAvailable && (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: "#002147" }}
            />
          )}
          {unit.status}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-1.25 mb-1.5">
          <span
            className="text-[1.5rem] font-black leading-none"
            style={{ color: "white" }}
          >
            ${unit.price.toLocaleString()}
          </span>
          <span
            className="text-[0.82rem] font-semibold"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            / mo
          </span>
        </div>

        {/* Address */}
        <div
          className="text-[0.78rem] mb-4 truncate"
          style={{ color: "rgba(255,255,255,0.48)" }}
        >
          {unit.address}
        </div>

        {/* Stats — no pills, clean inline row with gold icons */}
        <div
          className="flex items-center gap-3 text-[0.8rem] font-semibold mb-5 flex-wrap"
          style={{ color: "rgba(255,255,255,0.72)" }}
        >
          <span className="flex items-center gap-1.25">
            <Bed size={13} style={{ color: "#C5A021", flexShrink: 0 }} />
            {unit.beds} Bed{unit.beds !== 1 ? "s" : ""}
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span className="flex items-center gap-1.25">
            <Bath size={13} style={{ color: "#C5A021", flexShrink: 0 }} />
            {unit.baths} Bath{unit.baths !== 1 ? "s" : ""}
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span className="flex items-center gap-1.25">
            <Maximize2 size={13} style={{ color: "#C5A021", flexShrink: 0 }} />
            {unit.sqft.toLocaleString()} sqft
          </span>
        </div>

        {/* Availability */}
        <div
          className="flex items-center gap-1.75 text-[0.76rem] pt-3.5"
          style={{
            color: "rgba(255,255,255,0.4)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Calendar size={12} style={{ color: "#C5A021", flexShrink: 0 }} />
          Available:{" "}
          <span className="font-black" style={{ color: "#C5A021" }}>
            {unit.available}
          </span>
        </div>
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${cardBase} cursor-pointer`}
        style={{ ...sharedStyle, padding: 0 }}
        onMouseEnter={hoverEnter}
        onMouseLeave={hoverLeave}
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={unit.listingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardBase} no-underline`}
      style={sharedStyle}
      onMouseEnter={hoverEnter}
      onMouseLeave={hoverLeave}
    >
      {inner}
    </a>
  );
}
