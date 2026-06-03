"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import UnitCard from "@/components/ui/UnitCard";
import UnitDetailModal from "@/components/ui/UnitDetailModal";
import FilterSelect from "@/components/ui/FilterSelect";
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
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const cities = useMemo(
    () => ["any", ...Array.from(new Set(units.map((u) => u.city))).sort()],
    [units]
  );
  const cityOptions = useMemo(
    () => cities.map((c) => ({ value: c, label: c === "any" ? "All Locations" : c })),
    [cities]
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
        className="max-w-325 mx-auto mb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link
          href="/units"
          aria-label="Open full Available Units page"
          className="group inline-flex items-center gap-2 mb-1 no-underline"
        >
          <h2
            className="font-black text-[1.8rem]"
            style={{ color: "white" }}
          >
            Available Units
          </h2>
          <span
            className="inline-flex w-8 h-8 items-center justify-center rounded-full border-[1.5px] border-[rgba(197,160,33,0.75)] bg-[rgba(197,160,33,0.06)] text-[#C5A021] transition-all duration-200 group-hover:scale-105 group-hover:border-[#C5A021] group-hover:bg-[#C5A021] group-hover:text-[#002147]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
        <p className="text-[0.9rem]" style={{ color: "rgba(255,255,255,0.6)" }}>
          Browse our current vacancies across Central Ohio. Filter to find your
          perfect fit.
        </p>
      </motion.div>

      {/* Filter bar */}
      <div
        className="max-w-275 mx-auto mb-4 rounded-[20px] flex gap-4.5 flex-wrap items-end"
        style={{
          background: "rgba(255,255,255,0.06)",
          padding: "14px 18px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* Location */}
        <FilterSelect
          label="Location"
          value={city}
          options={cityOptions}
          onChange={setCity}
        />

        {/* Price */}
        <FilterSelect
          label="Price Range"
          value={price}
          options={PRICE_RANGES}
          onChange={setPrice}
        />

        {/* Bedrooms */}
        <FilterSelect
          label="Bedrooms"
          value={beds}
          options={BED_OPTIONS}
          onChange={setBeds}
        />

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
        className="max-w-275 mx-auto mb-6 text-[0.9rem]"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Showing{" "}
        <strong style={{ color: "#C5A021" }}>{filtered.length}</strong> of{" "}
        {units.length} units
      </div>

      {/* Grid */}
      <div
        className="max-w-325 mx-auto mb-6"
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
              <UnitCard unit={unit} onClick={() => setSelectedUnit(unit)} />
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

      <UnitDetailModal
        unit={selectedUnit}
        onClose={() => setSelectedUnit(null)}
      />
    </section>
  );
}
