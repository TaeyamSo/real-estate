"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import UnitCard from "@/components/ui/UnitCard";
import type { Unit } from "@/types";

const PRICE_RANGES = [
  { value: "any", label: "Any Price" },
  { value: "0-1500", label: "Under $1,500" },
  { value: "1500-2500", label: "$1,500 – $2,500" },
  { value: "2500-99999", label: "$2,500+" },
];

const BED_OPTIONS = [
  { value: "any", label: "Any Beds" },
  { value: "1", label: "1 Bed" },
  { value: "2", label: "2 Beds" },
  { value: "3", label: "3 Beds" },
  { value: "4+", label: "4+ Beds" },
];

interface UnitsSectionProps {
  units: Unit[];
}

export default function UnitsSection({ units }: UnitsSectionProps) {
  const cities = useMemo(
    () => ["any", ...Array.from(new Set(units.map((u) => u.city))).sort()],
    [units]
  );

  const [city, setCity] = useState("any");
  const [price, setPrice] = useState("any");
  const [beds, setBeds] = useState("any");

  const filtered = useMemo(() => {
    return units.filter((u) => {
      if (city !== "any" && u.city !== city) return false;
      if (price !== "any") {
        const [min, max] = price.split("-").map(Number);
        if (u.price < min || u.price > max) return false;
      }
      if (beds !== "any") {
        if (beds === "4+") {
          if (u.beds < 4) return false;
        } else {
          if (u.beds !== Number(beds)) return false;
        }
      }
      return true;
    });
  }, [units, city, price, beds]);

  const selectStyle: React.CSSProperties = {
    padding: "12px 14px",
    borderRadius: 12,
    border: "1.5px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontWeight: 700,
    fontFamily: "inherit",
    fontSize: "0.9rem",
    cursor: "pointer",
    outline: "none",
    width: "100%",
  };

  return (
    <section
      id="units"
      style={{
        minHeight: "calc(100vh - 83px)",
        padding: "40px 5%",
        background: "#002147",
      }}
    >
      {/* Header */}
      <motion.div
        className="max-w-[1300px] mx-auto mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2
          className="font-black text-[1.8rem] mb-1"
          style={{ color: "white" }}
        >
          Available Units
        </h2>
        <p className="text-[0.9rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
          Browse our current vacancies across Central Ohio. Filter to find your
          perfect fit.
        </p>
      </motion.div>

      {/* Filter bar */}
      <div
        className="max-w-[1100px] mx-auto mb-4 rounded-[20px] flex gap-[18px] flex-wrap items-end"
        style={{
          background: "rgba(255,255,255,0.06)",
          padding: "14px 18px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* Location */}
        <div className="flex flex-col gap-[6px] flex-1 min-w-[140px]">
          <label
            className="text-[0.7rem] font-black tracking-[1.5px] uppercase"
            style={{ color: "#C5A021" }}
          >
            Location
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={selectStyle}
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === "any" ? "All Locations" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-[6px] flex-1 min-w-[140px]">
          <label
            className="text-[0.7rem] font-black tracking-[1.5px] uppercase"
            style={{ color: "#C5A021" }}
          >
            Price Range
          </label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={selectStyle}
          >
            {PRICE_RANGES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-[6px] flex-1 min-w-[140px]">
          <label
            className="text-[0.7rem] font-black tracking-[1.5px] uppercase"
            style={{ color: "#C5A021" }}
          >
            Bedrooms
          </label>
          <select
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            style={selectStyle}
          >
            {BED_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            setCity("any");
            setPrice("any");
            setBeds("any");
          }}
          className="font-bold cursor-pointer transition-all duration-200 rounded-xl"
          style={{
            padding: "12px 22px",
            border: "1.5px solid #C5A021",
            background: "transparent",
            color: "#C5A021",
            fontFamily: "inherit",
            height: 46,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#C5A021";
            (e.currentTarget as HTMLButtonElement).style.color = "#002147";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#C5A021";
          }}
        >
          Reset
        </button>
      </div>

      {/* Count */}
      <div
        className="max-w-[1100px] mx-auto mb-6 text-[0.9rem]"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Showing{" "}
        <strong style={{ color: "#C5A021" }}>{filtered.length}</strong> of{" "}
        {units.length} units
      </div>

      {/* Grid */}
      <div
        className="max-w-[1300px] mx-auto mb-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.length === 0 ? (
          <div
            className="col-span-full text-center py-16 rounded-[20px]"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}
          >
            <p className="text-lg font-bold mb-2" style={{ color: "white" }}>No units match your filters.</p>
            <p className="text-sm">Try adjusting your search criteria.</p>
          </div>
        ) : (
          filtered.map((unit, i) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: Math.min(i * 0.06, 0.4) }}
            >
              <UnitCard unit={unit} />
            </motion.div>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="https://realestate07.managebuilding.com/Resident/public/rentals"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-full font-black text-[0.85rem] tracking-[1px] no-underline transition-all duration-300"
          style={{ background: "#C5A021", color: "#002147" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#002147";
            (e.currentTarget as HTMLAnchorElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#C5A021";
            (e.currentTarget as HTMLAnchorElement).style.color = "#002147";
          }}
        >
          View All Listings &amp; Apply Online →
        </a>
      </div>
    </section>
  );
}
