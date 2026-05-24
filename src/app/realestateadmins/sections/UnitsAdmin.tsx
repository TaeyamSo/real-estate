"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import MediaInput from "../MediaInput";
import { VALIDATORS, combine } from "../adminTypes";
import type { AdminUnit, MediaField } from "../adminTypes";

const DEFAULTS: AdminUnit[] = [
  {
    id: "58784",
    city: "Columbus",
    price: 1350,
    beds: 2,
    baths: 1,
    sqft: 1200,
    address: "2666 Sawbury Boulevard — Columbus, OH",
    available: "January 21",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583845112203-29329902332e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl: "https://realestate07.managebuilding.com/Resident/public/rentals/58784",
    status: "Available",
    description: "2666 Sawbury Boulevard is a well-located apartment-style condo in North Columbus, offering comfortable, low-maintenance living with quick access to shopping, dining, and everyday essentials.",
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
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585128903994-4dc2af7f59c8?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl: "https://realestate07.managebuilding.com/Resident/public/rentals/60188",
    status: "Available",
    description: "Nestled on Thornfield Lane, this 2-bedroom home offers a cozy and functional floor plan ideal for individuals or couples.",
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
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl: "https://realestate07.managebuilding.com/Resident/public/rentals/61308",
    status: "Available",
    description: "7891 Thornfield Lane is a charming 2-bedroom unit featuring updated flooring and a well-appointed kitchen.",
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
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl: "https://realestate07.managebuilding.com/Resident/public/rentals/60178",
    status: "Available",
    description: "This spacious 5-bedroom executive home at 6170 Ravenhill Road in Hilliard sits on a generous lot in one of the area's most sought-after neighborhoods.",
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
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl: "https://realestate07.managebuilding.com/Resident/public/rentals/60436",
    status: "Available",
    description: "4645 Merrimar Circle East is an affordable and well-maintained 2-bedroom unit on Columbus's east side.",
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
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
    ],
    listingUrl: "https://realestate07.managebuilding.com/Resident/public/rentals/47762",
    status: "Available",
    description: "Worthington Forest Place West offers a rare 3-bedroom rental in one of Columbus's most desirable suburbs.",
  },
];

type UnitErrors = Partial<{
  city: string; price: string; beds: string; baths: string; sqft: string;
  address: string; available: string; imageUrl: string; listingUrl: string; description: string;
}> & { images?: string[] };

function validateUnit(u: AdminUnit): UnitErrors {
  return {
    city: combine(VALIDATORS.required, VALIDATORS.maxChars(60))(u.city),
    price: VALIDATORS.positiveNumber(String(u.price)),
    beds: VALIDATORS.positiveInt(String(u.beds)),
    baths: VALIDATORS.positiveInt(String(u.baths)),
    sqft: VALIDATORS.positiveInt(String(u.sqft)),
    address: combine(VALIDATORS.required, VALIDATORS.maxChars(120))(u.address),
    available: VALIDATORS.maxChars(30)(u.available),
    imageUrl: VALIDATORS.url(u.imageUrl),
    listingUrl: VALIDATORS.optionalUrl(u.listingUrl),
    description: VALIDATORS.maxChars(600)(u.description),
    images: u.images.map((img) => VALIDATORS.url(img)),
  };
}

function hasUnitErrors(e: UnitErrors): boolean {
  const { images, ...rest } = e;
  return Object.values(rest).some(Boolean) || (images ?? []).some(Boolean);
}

/* ── Delete confirm ─────────────────────────────────────── */
function DeleteConfirm({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontSize: "0.78rem", color: "#ef4444", flex: 1 }}>Delete this unit? This cannot be undone.</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={onCancel} style={{ background: "transparent", border: "1px solid #1a2e4a", borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: "#64748b", fontSize: "0.78rem" }}>Cancel</button>
        <button type="button" onClick={onConfirm} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: "#ef4444", fontSize: "0.78rem", fontWeight: 700 }}>Delete</button>
      </div>
    </div>
  );
}

/* ── Images array editor ────────────────────────────────── */
function ImagesEditor({
  images,
  onChange,
  errors,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
  errors: string[];
}) {
  const update = (idx: number, val: string) => {
    onChange(images.map((img, i) => (i === idx ? val : img)));
  };
  const remove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };
  const add = () => {
    if (images.length < 5) onChange([...images, ""]);
  };

  return (
    <div>
      <label style={{ display: "block", marginBottom: 8, fontSize: "0.68rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase" }}>
        Gallery Images <span style={{ color: "#64748b", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(max 5)</span>
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <input
                type="url"
                value={img}
                onChange={(e) => update(idx, e.target.value)}
                placeholder="https://images.unsplash.com/..."
                style={{
                  width: "100%",
                  background: "#0d1e35",
                  border: `1px solid ${errors[idx] ? "#ef4444" : "#1e3452"}`,
                  borderRadius: 8,
                  padding: "9px 12px",
                  color: "#e2e8f0",
                  fontSize: "0.83rem",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
              />
              {errors[idx] && (
                <p style={{ margin: "3px 0 0", fontSize: "0.72rem", color: "#ef4444" }}>{errors[idx]}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(idx)}
              title="Remove image"
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#334155", padding: "9px 0", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#334155"; }}
            >
              <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
        {images.length === 0 && (
          <p style={{ fontSize: "0.78rem", color: "#334155", margin: 0 }}>No gallery images yet.</p>
        )}
      </div>
      {images.length < 5 && (
        <button
          type="button"
          onClick={add}
          style={{
            marginTop: 10,
            background: "transparent",
            border: "1px dashed #1a2e4a",
            borderRadius: 8,
            padding: "8px 14px",
            cursor: "pointer",
            color: "#64748b",
            fontSize: "0.78rem",
            display: "flex",
            alignItems: "center",
            gap: 5,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#C5A021";
            (e.currentTarget as HTMLButtonElement).style.color = "#C5A021";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a2e4a";
            (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
          }}
        >
          <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Image URL
        </button>
      )}
    </div>
  );
}

function UnitsIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M1 22V8l8-6 7 5.25" />
      <path d="M22 22V10.5L15 6" />
      <rect x="8" y="14" width="8" height="8" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function UnitsAdmin({ onSave }: Props) {
  const [units, setUnits] = useState<AdminUnit[]>(DEFAULTS);
  const [errors, setErrors] = useState<Record<string, UnitErrors>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const updateUnit = useCallback(
    (id: string, patch: Partial<AdminUnit>) => {
      setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
      setErrors((prev) => {
        const unit = units.find((u) => u.id === id);
        if (!unit) return prev;
        const updated = { ...unit, ...patch };
        return { ...prev, [id]: validateUnit(updated as AdminUnit) };
      });
    },
    [units]
  );

  const addUnit = () => {
    const newId = `unit-${Date.now()}`;
    const blank: AdminUnit = {
      id: newId, city: "", price: 0, beds: 0, baths: 0, sqft: 0,
      address: "", available: "", imageUrl: "", images: [], listingUrl: "", status: "Available", description: "",
    };
    setUnits((prev) => [...prev, blank]);
    setExpanded(newId);
  };

  const deleteUnit = (id: string) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
    setErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
    setConfirmDelete(null);
    if (expanded === id) setExpanded(null);
  };

  const handleSave = () => {
    const newErrors: Record<string, UnitErrors> = {};
    let hasErr = false;
    units.forEach((u) => {
      const ue = validateUnit(u);
      if (hasUnitErrors(ue)) hasErr = true;
      newErrors[u.id] = ue;
    });
    setErrors(newErrors);
    if (hasErr) {
      const first = units.find((u) => hasUnitErrors(newErrors[u.id]));
      if (first) setExpanded(first.id);
    } else {
      onSave();
    }
  };

  const globalHasErrors = Object.values(errors).some(hasUnitErrors);

  const STATUS_COLORS: Record<AdminUnit["status"], string> = {
    Available: "#22c55e",
    "Coming Soon": "#C5A021",
  };

  return (
    <SectionShell
      title="Units & Listings"
      description="Manage rental unit listings shown on the units page. Each unit card links to its external listing."
      icon={<UnitsIcon />}
      onSave={handleSave}
      hasErrors={globalHasErrors}
    >
      {/* Stats + Add */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ background: "#0a1628", border: "1px solid #1a2e4a", borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 110 }}>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#C5A021" }}>{units.length}</div>
          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: 2 }}>Total Units</div>
        </div>
        <div style={{ background: "#0a1628", border: "1px solid #1a2e4a", borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 110 }}>
          <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#22c55e" }}>{units.filter((u) => u.status === "Available").length}</div>
          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: 2 }}>Available</div>
        </div>
        <button
          type="button"
          onClick={addUnit}
          style={{
            marginLeft: "auto",
            background: "rgba(197,160,33,0.1)",
            border: "1px solid rgba(197,160,33,0.3)",
            borderRadius: 10,
            padding: "10px 18px",
            color: "#C5A021",
            fontSize: "0.83rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(197,160,33,0.18)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(197,160,33,0.1)"; }}
        >
          <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Unit
        </button>
      </div>

      {/* Unit list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {units.map((unit) => {
          const isOpen = expanded === unit.id;
          const ue = errors[unit.id];
          const hasErr = ue ? hasUnitErrors(ue) : false;

          return (
            <div
              key={unit.id}
              style={{
                background: "#0a1628",
                border: `1px solid ${hasErr ? "rgba(239,68,68,0.4)" : "#1a2e4a"}`,
                borderRadius: 12,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Collapsed header */}
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : unit.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 54, height: 40, borderRadius: 7, overflow: "hidden",
                    background: "#0d1e35", border: "1px solid #1a2e4a", flexShrink: 0,
                  }}
                >
                  {unit.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={unit.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#1e3452" }}>
                      <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="m3 9 4-4 4 4 4-4 4 4" />
                      </svg>
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {unit.address || <span style={{ color: "#64748b" }}>New Unit</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    {unit.city && <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{unit.city}</span>}
                    {unit.price > 0 && <span style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600 }}>${unit.price.toLocaleString()}/mo</span>}
                    {unit.beds > 0 && <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{unit.beds}bd / {unit.baths}ba</span>}
                    <span style={{ fontSize: "0.7rem", color: STATUS_COLORS[unit.status] || "#64748b", background: `${STATUS_COLORS[unit.status]}18`, border: `1px solid ${STATUS_COLORS[unit.status]}33`, borderRadius: 20, padding: "1px 7px" }}>{unit.status}</span>
                  </div>
                </div>

                {hasErr && (
                  <span style={{ fontSize: "0.7rem", color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
                    Has errors
                  </span>
                )}

                <svg width={16} height={16} fill="none" stroke="#64748b" strokeWidth={2} viewBox="0 0 24 24"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Expanded editor */}
              {isOpen && (
                <div style={{ padding: "0 16px 20px", borderTop: "1px solid #1a2e4a" }}>
                  {/* ID (read-only) */}
                  <div style={{ paddingTop: 16, marginBottom: 14 }}>
                    <label style={{ display: "block", marginBottom: 5, fontSize: "0.68rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase" }}>
                      Unit ID <span style={{ color: "#334155", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(read-only)</span>
                    </label>
                    <div style={{ background: "#060f1e", border: "1px solid #1a2e4a", borderRadius: 8, padding: "9px 12px", fontSize: "0.83rem", color: "#334155", fontFamily: "monospace" }}>
                      {unit.id}
                    </div>
                  </div>

                  {/* Core fields grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <FormField label="City" required value={unit.city} onChange={(v) => updateUnit(unit.id, { city: v })} error={ue?.city} maxChars={60} placeholder="Columbus" />
                    <FormField label="Available Date" value={unit.available} onChange={(v) => updateUnit(unit.id, { available: v })} error={ue?.available} maxChars={30} placeholder="January 21" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                    <FormField label="Price ($/mo)" required value={String(unit.price)} onChange={(v) => updateUnit(unit.id, { price: Number(v) || 0 })} error={ue?.price} type="number" />
                    <FormField label="Bedrooms" required value={String(unit.beds)} onChange={(v) => updateUnit(unit.id, { beds: Number(v) || 0 })} error={ue?.beds} type="number" />
                    <FormField label="Bathrooms" required value={String(unit.baths)} onChange={(v) => updateUnit(unit.id, { baths: Number(v) || 0 })} error={ue?.baths} type="number" />
                    <FormField label="Sq Ft" required value={String(unit.sqft)} onChange={(v) => updateUnit(unit.id, { sqft: Number(v) || 0 })} error={ue?.sqft} type="number" />
                  </div>
                  <FormField label="Full Address" required value={unit.address} onChange={(v) => updateUnit(unit.id, { address: v })} error={ue?.address} maxChars={120} placeholder="123 Main St — Columbus, OH" />

                  {/* Status dropdown */}
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", marginBottom: 5, fontSize: "0.68rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase" }}>
                      Status <span style={{ color: "#C5A021" }}>*</span>
                    </label>
                    <select
                      value={unit.status}
                      onChange={(e) => updateUnit(unit.id, { status: e.target.value as AdminUnit["status"] })}
                      style={{
                        background: "#0d1e35", border: "1px solid #1e3452", borderRadius: 8,
                        padding: "9px 14px", color: "#e2e8f0", fontSize: "0.88rem",
                        outline: "none", cursor: "pointer", fontFamily: "inherit", minWidth: 180,
                        appearance: "none",
                      }}
                    >
                      <option value="Available">Available</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                  </div>

                  {/* Description */}
                  <FormField label="Description" value={unit.description} onChange={(v) => updateUnit(unit.id, { description: v })} error={ue?.description} maxChars={600} multiline rows={3} placeholder="Property description..." />

                  {/* Listing URL */}
                  <FormField label="External Listing URL" value={unit.listingUrl} onChange={(v) => updateUnit(unit.id, { listingUrl: v })} error={ue?.listingUrl} type="url" placeholder="https://realestate07.managebuilding.com/..." hint="Optional link to the full listing page" />

                  {/* Cover image */}
                  <MediaInput
                    label="Cover / Card Image"
                    required
                    value={{ url: unit.imageUrl, type: "image" }}
                    onChange={(v: MediaField) => updateUnit(unit.id, { imageUrl: v.url })}
                    error={ue?.imageUrl}
                    hint="Main image shown on the unit card (800×600 recommended)"
                  />

                  {/* Gallery images */}
                  <ImagesEditor
                    images={unit.images}
                    onChange={(imgs) => updateUnit(unit.id, { images: imgs })}
                    errors={ue?.images ?? []}
                  />

                  {/* Delete */}
                  <div style={{ marginTop: 18 }}>
                    {confirmDelete === unit.id ? (
                      <DeleteConfirm onConfirm={() => deleteUnit(unit.id)} onCancel={() => setConfirmDelete(null)} />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(unit.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: "0.78rem", padding: 0, display: "flex", alignItems: "center", gap: 5, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#64748b"; }}
                      >
                        <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" />
                        </svg>
                        Remove this unit
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {units.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#334155", fontSize: "0.85rem", border: "1px dashed #1a2e4a", borderRadius: 10 }}>
          No units yet. Click &quot;Add Unit&quot; to create your first listing.
        </div>
      )}
    </SectionShell>
  );
}
