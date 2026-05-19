import type { Unit } from "@/types";
import Image from "next/image";
import { Bed, Bath, Maximize2 } from "lucide-react";

interface UnitCardProps {
  unit: Unit;
}

export default function UnitCard({ unit }: UnitCardProps) {
  return (
    <a
      href={unit.listingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-[20px] overflow-hidden no-underline transition-all duration-300 hover:-translate-y-[6px]"
      style={{
        background: "white",
        color: "inherit",
        boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 15px 35px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 5px 20px rgba(0,0,0,0.06)";
      }}
    >
      {/* Image */}
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={unit.imageUrl}
          alt={unit.address}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div
          className="absolute top-[14px] left-[14px] text-[0.7rem] font-black tracking-[1px] uppercase px-3 py-[5px] rounded-full"
          style={{ background: "#C5A021", color: "#002147" }}
        >
          {unit.status}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div
          className="text-[1.2rem] font-black leading-none mb-1"
          style={{ color: "#002147" }}
        >
          ${unit.price.toLocaleString()} / mo
        </div>
          <div className="text-[0.8rem] mb-3" style={{ color: "#64748b" }}>
          {unit.address}
        </div>

        <div className="flex gap-[10px] flex-wrap mb-[18px]">
          <span
            className="flex items-center gap-[6px] text-[0.82rem] font-semibold px-3 py-[6px] rounded-lg"
            style={{ background: "#f8fafc", color: "#555" }}
          >
            <Bed size={14} /> {unit.beds} Bed{unit.beds !== 1 ? "s" : ""}
          </span>
          <span
            className="flex items-center gap-[6px] text-[0.82rem] font-semibold px-3 py-[6px] rounded-lg"
            style={{ background: "#f8fafc", color: "#555" }}
          >
            <Bath size={14} /> {unit.baths} Bath{unit.baths !== 1 ? "s" : ""}
          </span>
          <span
            className="flex items-center gap-[6px] text-[0.82rem] font-semibold px-3 py-[6px] rounded-lg"
            style={{ background: "#f8fafc", color: "#555" }}
          >
            <Maximize2 size={14} /> {unit.sqft.toLocaleString()} sqft
          </span>
        </div>

        <div
          className="text-[0.8rem] pt-[14px]"
          style={{
            color: "#64748b",
            borderTop: "1px solid #f0f4f8",
          }}
        >
          Available: <span className="font-bold" style={{ color: "#002147" }}>{unit.available}</span>
        </div>
      </div>
    </a>
  );
}
