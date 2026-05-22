"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Modal from "@/components/ui/Modal";
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

interface UnitsPageContentProps {
  units: Unit[];
}

export default function UnitsPageContent({ units }: UnitsPageContentProps) {
  // Contact modal
  const [contactOpen, setContactOpen] = useState(false);
  const [contactType, setContactType] = useState<"tenant" | "owner">("tenant");
  const openContact = (type: "tenant" | "owner") => {
    setContactType(type);
    setContactOpen(true);
  };

  // Unit detail modal
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  // Filters
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
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const hasActiveFilters = city !== "any" || price !== "any" || beds !== "any";

  return (
    <div style={{ background: "#002147", minHeight: "100vh" }}>
      <Navbar onContactOpen={openContact} />

      <main style={{ paddingTop: 83 }}>
        {/* ── Page hero ── */}
        <section
          style={{
            padding: "48px 5% 32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="max-w-325 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span
                className="inline-block text-[0.65rem] font-black tracking-[4px] uppercase px-4 py-1.5 rounded-full mb-4"
                style={{ background: "#C5A021", color: "#002147" }}
              >
                Central Ohio
              </span>
              <h1
                className="font-black text-[2.2rem] md:text-[3rem] leading-tight mb-3"
                style={{ color: "white" }}
              >
                Available Units
              </h1>
              <p className="text-[0.95rem] max-w-130" style={{ color: "rgba(255,255,255,0.55)" }}>
                Browse our current vacancies across Columbus, Hilliard, and Worthington. Click any unit to view full details and apply.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Filters ── */}
        <section style={{ padding: "24px 5% 0" }}>
          <div className="max-w-325 mx-auto">
            {/* Mobile filter toggle */}
            <button
              className="md:hidden flex items-center gap-2 text-[0.8rem] font-black uppercase tracking-[1.5px] px-4 py-3 rounded-xl mb-4 cursor-pointer transition-all duration-200"
              style={{
                background: hasActiveFilters ? "#C5A021" : "rgba(255,255,255,0.08)",
                color: hasActiveFilters ? "#002147" : "white",
                border: "1.5px solid " + (hasActiveFilters ? "#C5A021" : "rgba(255,255,255,0.18)"),
                fontFamily: "inherit",
              }}
              onClick={() => setFiltersOpen((o) => !o)}
            >
              <SlidersHorizontal size={15} />
              Filters {hasActiveFilters && "•"}
            </button>

            {/* Filter bar — always visible on md+, toggle on mobile */}
            <div
              className={`${filtersOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-3 md:gap-4 md:items-end mb-6 rounded-[20px] p-4 md:p-5`}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
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
                onClick={() => { setCity("any"); setPrice("any"); setBeds("any"); }}
                className="font-bold cursor-pointer transition-all duration-200 rounded-xl text-[0.8rem] uppercase tracking-[1px]"
                style={{
                  padding: "12px 22px",
                  border: "1.5px solid rgba(197,160,33,0.6)",
                  background: "transparent",
                  color: "#C5A021",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#C5A021"; (e.currentTarget as HTMLButtonElement).style.color = "#002147"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#C5A021"; }}
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {/* ── Results count ── */}
        <div className="max-w-325 mx-auto px-[5%] md:px-0" style={{ marginBottom: 20 }}>
          <p className="text-[0.78rem] font-bold" style={{ color: "rgba(255,255,255,0.4)" }}>
            {filtered.length} {filtered.length === 1 ? "unit" : "units"} found
          </p>
        </div>

        {/* ── Grid ── */}
        <section style={{ padding: "0 5% 80px" }}>
          <div className="max-w-325 mx-auto">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {filtered.map((unit, i) => (
                  <motion.div
                    key={unit.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                  >
                    <UnitCard unit={unit} onClick={() => setSelectedUnit(unit)} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="text-[2.5rem] mb-4 flex items-center justify-center rounded-full"
                  style={{ width: 72, height: 72, background: "rgba(255,255,255,0.06)" }}
                >
                  🏠
                </div>
                <p className="font-black text-[1.1rem] mb-2" style={{ color: "white" }}>
                  No units match your filters
                </p>
                <p className="text-[0.85rem] mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={() => { setCity("any"); setPrice("any"); setBeds("any"); }}
                  className="font-black text-[0.8rem] uppercase tracking-[1.5px] px-6 py-3 rounded-2xl cursor-pointer transition-all duration-200"
                  style={{ background: "#C5A021", color: "#002147", border: "none", fontFamily: "inherit" }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Unit detail dialog */}
      <UnitDetailModal
        unit={selectedUnit}
        onClose={() => setSelectedUnit(null)}
      />

      {/* Contact modal */}
      <Modal
        open={contactOpen}
        defaultType={contactType}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}
