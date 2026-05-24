"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import { VALIDATORS, combine } from "../adminTypes";
import type { AdminReview } from "../adminTypes";

const DEFAULTS: AdminReview[] = [
  { id: "1", name: "Oliviana Contreras", role: "Verified Client", rating: 5, text: "The team was responsive, helpful, and made the whole process feel smooth and professional." },
  { id: "2", name: "Genesis Garza", role: "Verified Client", rating: 5, text: "Their attention to detail is unmatched. I've never had a more reliable management partner." },
  { id: "3", name: "Becky Alvarez", role: "Verified Client", rating: 5, text: "Found a great tenant immediately. The digital lease signing made everything incredibly easy." },
  { id: "4", name: "Marcus Whitfield", role: "Verified Client", rating: 5, text: "Owner reporting is crystal-clear and rent hits my account like clockwork. Highly recommend." },
  { id: "5", name: "Sofia Reyes", role: "Verified Client", rating: 5, text: "Maintenance requests get answered fast. As a tenant, I always feel taken care of." },
  { id: "6", name: "Jordan Williams", role: "Verified Tenant", rating: 5, text: "Moving in was seamless — everything was ready on day one. The team handled every detail without me asking." },
  { id: "7", name: "Priya Nair", role: "Verified Owner", rating: 5, text: "My vacancy rate dropped to nearly zero since switching to PNE. Outstanding leasing team, couldn't be happier." },
  { id: "8", name: "Derek Thompson", role: "Verified Owner", rating: 5, text: "The owner portal gives me full visibility into everything. I always know exactly what's happening with my properties." },
  { id: "9", name: "Layla Hassan", role: "Verified Tenant", rating: 5, text: "Responsive, professional, and genuinely caring. Best rental experience I've had in years — truly exceptional." },
  { id: "10", name: "Carlos Mendez", role: "Verified Owner", rating: 5, text: "Rent hits my account on time every single month without me lifting a finger. Exactly what I needed." },
];

const BLANK_REVIEW = (): AdminReview => ({
  id: `new-${Date.now()}`,
  name: "",
  role: "Verified Client",
  rating: 5,
  text: "",
});

type ReviewErrors = Record<string, Record<"name" | "role" | "rating" | "text", string>>;

function validateReview(r: AdminReview): Record<"name" | "role" | "rating" | "text", string> {
  return {
    name: combine(VALIDATORS.required, VALIDATORS.maxChars(60))(r.name),
    role: combine(VALIDATORS.required, VALIDATORS.maxChars(50))(r.role),
    rating: VALIDATORS.rating(String(r.rating)),
    text: combine(VALIDATORS.required, VALIDATORS.minChars(20), VALIDATORS.maxChars(300))(r.text),
  };
}

/* ── Star rating picker ───────────────────────────────────── */
function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          aria-label={`${star} stars`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.3rem",
            color: star <= (hover || value) ? "#C5A021" : "#1e3452",
            transition: "color 0.15s",
            padding: "0 1px",
            lineHeight: 1,
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ── Delete confirm ───────────────────────────────────────── */
function DeleteConfirm({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        background: "rgba(239,68,68,0.06)",
        border: "1px solid rgba(239,68,68,0.25)",
        borderRadius: 8,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: "0.78rem", color: "#ef4444", flex: 1 }}>
        Delete this review? This cannot be undone.
      </span>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "transparent", border: "1px solid #1a2e4a", borderRadius: 6,
            padding: "5px 12px", cursor: "pointer", color: "#64748b", fontSize: "0.78rem",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          style={{
            background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: "#ef4444",
            fontSize: "0.78rem", fontWeight: 700,
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function ReviewsIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function ReviewsAdmin({ onSave }: Props) {
  const [reviews, setReviews] = useState<AdminReview[]>(DEFAULTS);
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const updateReview = useCallback(
    (id: string, field: keyof AdminReview, value: string | number) => {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
      );
      // Live validation for expanded fields
      setErrors((prev) => {
        const r = reviews.find((r) => r.id === id);
        if (!r) return prev;
        const updated = { ...r, [field]: value };
        const fieldErrors = validateReview(updated as AdminReview);
        return { ...prev, [id]: fieldErrors };
      });
    },
    [reviews]
  );

  const addReview = () => {
    const blank = BLANK_REVIEW();
    setReviews((prev) => [...prev, blank]);
    setExpanded(blank.id);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setErrors((prev) => { const next = { ...prev }; delete next[id]; return next; });
    setConfirmDelete(null);
    if (expanded === id) setExpanded(null);
  };

  const handleSave = () => {
    const newErrors: ReviewErrors = {};
    let hasErr = false;
    reviews.forEach((r) => {
      const fe = validateReview(r);
      if (Object.values(fe).some(Boolean)) hasErr = true;
      newErrors[r.id] = fe;
    });
    setErrors(newErrors);
    // Expand first errored review
    if (hasErr) {
      const firstErr = reviews.find((r) => Object.values(newErrors[r.id] || {}).some(Boolean));
      if (firstErr) setExpanded(firstErr.id);
    } else {
      onSave();
    }
  };

  const hasErrors = Object.values(errors).some((fe) => fe && Object.values(fe).some(Boolean));

  return (
    <SectionShell
      title="Reviews"
      description="Add, edit, or remove customer testimonials shown on the homepage carousel."
      icon={<ReviewsIcon />}
      onSave={handleSave}
      hasErrors={hasErrors}
    >
      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total Reviews", value: reviews.length },
          { label: "Avg. Rating", value: reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "—" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              background: "#0a1628",
              border: "1px solid #1a2e4a",
              borderRadius: 10,
              padding: "12px 20px",
              textAlign: "center",
              minWidth: 120,
            }}
          >
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#C5A021" }}>{value}</div>
            <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: 2 }}>{label}</div>
          </div>
        ))}
        <button
          type="button"
          onClick={addReview}
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
          Add Review
        </button>
      </div>

      {/* Review list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {reviews.map((review, idx) => {
          const isOpen = expanded === review.id;
          const fe = errors[review.id];
          const hasFieldErrors = fe && Object.values(fe).some(Boolean);

          return (
            <div
              key={review.id}
              style={{
                background: "#0a1628",
                border: `1px solid ${hasFieldErrors ? "rgba(239,68,68,0.4)" : "#1a2e4a"}`,
                borderRadius: 12,
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              {/* Collapsed row */}
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : review.id)}
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
                {/* Avatar */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: hasFieldErrors ? "rgba(239,68,68,0.15)" : "rgba(197,160,33,0.1)",
                    border: `1px solid ${hasFieldErrors ? "rgba(239,68,68,0.3)" : "rgba(197,160,33,0.2)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: hasFieldErrors ? "#ef4444" : "#C5A021",
                    flexShrink: 0,
                  }}
                >
                  {review.name ? review.name[0].toUpperCase() : `${idx + 1}`}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#e2e8f0", marginBottom: 2 }}>
                    {review.name || <span style={{ color: "#64748b" }}>New Review</span>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "0.72rem", color: "#64748b" }}>{review.role}</span>
                    <span style={{ color: "#C5A021", fontSize: "0.75rem", letterSpacing: 1 }}>
                      {"★".repeat(review.rating)}
                    </span>
                  </div>
                </div>

                {hasFieldErrors && (
                  <span style={{ fontSize: "0.7rem", color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
                    Has errors
                  </span>
                )}

                <svg
                  width={16}
                  height={16}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Expanded editor */}
              {isOpen && (
                <div
                  style={{
                    padding: "0 16px 16px",
                    borderTop: "1px solid #1a2e4a",
                  }}
                >
                  <div style={{ paddingTop: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 4 }}>
                      <FormField
                        label="Reviewer Name"
                        required
                        value={review.name}
                        onChange={(v) => updateReview(review.id, "name", v)}
                        error={fe?.name}
                        maxChars={60}
                        placeholder="Full name"
                      />
                      <FormField
                        label="Role / Label"
                        required
                        value={review.role}
                        onChange={(v) => updateReview(review.id, "role", v)}
                        error={fe?.role}
                        maxChars={50}
                        placeholder="Verified Client"
                        hint='e.g. "Verified Owner", "Verified Tenant"'
                      />
                    </div>

                    <div style={{ marginBottom: 14 }}>
                      <label style={{ display: "block", marginBottom: 8, fontSize: "0.72rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase" }}>
                        Rating <span style={{ color: "#C5A021" }}>*</span>
                      </label>
                      <StarPicker
                        value={review.rating}
                        onChange={(v) => updateReview(review.id, "rating", v)}
                      />
                      {fe?.rating && (
                        <p style={{ margin: "6px 0 0", fontSize: "0.73rem", color: "#ef4444" }}>{fe.rating}</p>
                      )}
                    </div>

                    <FormField
                      label="Review Text"
                      required
                      value={review.text}
                      onChange={(v) => updateReview(review.id, "text", v)}
                      error={fe?.text}
                      maxChars={300}
                      multiline
                      rows={3}
                      placeholder="Customer testimonial..."
                      hint="Minimum 20 characters"
                    />

                    {/* Delete */}
                    {confirmDelete === review.id ? (
                      <DeleteConfirm
                        onConfirm={() => deleteReview(review.id)}
                        onCancel={() => setConfirmDelete(null)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(review.id)}
                        style={{
                          background: "none", border: "none", cursor: "pointer",
                          color: "#64748b", fontSize: "0.78rem", padding: 0,
                          display: "flex", alignItems: "center", gap: 5,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#64748b"; }}
                      >
                        <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" />
                        </svg>
                        Remove this review
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {reviews.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#334155",
            fontSize: "0.85rem",
            border: "1px dashed #1a2e4a",
            borderRadius: 10,
          }}
        >
          No reviews yet. Click &quot;Add Review&quot; to get started.
        </div>
      )}
    </SectionShell>
  );
}
