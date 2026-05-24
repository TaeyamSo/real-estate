"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import {
  VALIDATORS,
  combine,
  SOCIAL_PLATFORM_LABELS,
} from "../adminTypes";
import type { SocialLink, SocialPlatform } from "../adminTypes";

/* ── Social platform icon map ────────────────────────────── */
function SocialIcon({ platform }: { platform: SocialPlatform }) {
  switch (platform) {
    case "facebook":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case "instagram":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "x":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "youtube":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#060f1e" />
        </svg>
      );
    case "tiktok":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.72a4.85 4.85 0 0 1-1.03-.03z" />
        </svg>
      );
    case "google":
      return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.35 11.1H12.18V13.83H18.69C18.36 17.64 15.19 19.27 12.19 19.27C8.36 19.27 5 16.25 5 12C5 7.9 8.2 4.73 12.2 4.73C15.29 4.73 17.1 6.7 17.1 6.7L19 4.72C19 4.72 16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12C2.03 17.05 6.16 22 12.25 22C17.6 22 21.5 18.33 21.5 12.91C21.5 11.76 21.35 11.1 21.35 11.1Z" />
        </svg>
      );
    default:
      return (
        <svg width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
  }
}

const PLATFORM_OPTIONS = Object.entries(SOCIAL_PLATFORM_LABELS) as [SocialPlatform, string][];

interface FooterData {
  brandDescription: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  serviceAreas: string[];
  socialLinks: SocialLink[];
}

type TextField = "brandDescription" | "contactAddress" | "contactPhone" | "contactEmail";
const TEXT_VALIDATORS: Record<TextField, (v: string) => string> = {
  brandDescription: combine(VALIDATORS.required, VALIDATORS.maxChars(400)),
  contactAddress: VALIDATORS.maxChars(100),
  contactPhone: combine(VALIDATORS.phone, VALIDATORS.maxChars(20)),
  contactEmail: VALIDATORS.email,
};

const DEFAULTS: FooterData = {
  brandDescription:
    "Central Ohio's premier property management company. Serving residents and investors across Columbus, Hilliard, Grove City, and Worthington.",
  contactAddress: "Grove City, Ohio",
  contactPhone: "",
  contactEmail: "",
  serviceAreas: ["Columbus, OH", "Hilliard, OH", "Grove City, OH", "Worthington, OH", "Central Ohio"],
  socialLinks: [
    { id: "sl1", platform: "facebook", url: "" },
    { id: "sl2", platform: "instagram", url: "" },
    { id: "sl3", platform: "x", url: "" },
  ],
};

function FooterIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function FooterAdmin({ onSave }: Props) {
  const [data, setData] = useState<FooterData>(DEFAULTS);
  const [textErrors, setTextErrors] = useState<Partial<Record<TextField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<TextField, boolean>>>({});
  const [areaInput, setAreaInput] = useState("");
  const [areaError, setAreaError] = useState("");
  const [linkErrors, setLinkErrors] = useState<Record<string, string>>({});

  const setTextField = useCallback(
    (key: TextField, value: string) => {
      setData((prev) => ({ ...prev, [key]: value }));
      if (touched[key]) {
        setTextErrors((prev) => ({ ...prev, [key]: TEXT_VALIDATORS[key](value) }));
      }
    },
    [touched]
  );

  const blurTextField = useCallback(
    (key: TextField) => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      setTextErrors((prev) => ({ ...prev, [key]: TEXT_VALIDATORS[key](data[key]) }));
    },
    [data]
  );

  /* ── Service areas ── */
  const addArea = () => {
    const trimmed = areaInput.trim();
    if (!trimmed) { setAreaError("Area name cannot be empty."); return; }
    if (trimmed.length > 50) { setAreaError("Area name is too long (max 50 chars)."); return; }
    if (data.serviceAreas.includes(trimmed)) { setAreaError("This area is already listed."); return; }
    setData((prev) => ({ ...prev, serviceAreas: [...prev.serviceAreas, trimmed] }));
    setAreaInput("");
    setAreaError("");
  };

  const removeArea = (area: string) => {
    setData((prev) => ({ ...prev, serviceAreas: prev.serviceAreas.filter((a) => a !== area) }));
  };

  /* ── Social links ── */
  const updateLink = useCallback(
    (id: string, field: "platform" | "url", value: string) => {
      setData((prev) => ({
        ...prev,
        socialLinks: prev.socialLinks.map((l) =>
          l.id === id ? { ...l, [field]: value } : l
        ),
      }));
      if (field === "url") {
        const err = value.trim() ? VALIDATORS.optionalUrl(value) : "";
        setLinkErrors((prev) => ({ ...prev, [id]: err }));
      }
    },
    []
  );

  const addSocialLink = () => {
    setData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { id: `sl-${Date.now()}`, platform: "other", url: "" }],
    }));
  };

  const removeSocialLink = (id: string) => {
    setData((prev) => ({ ...prev, socialLinks: prev.socialLinks.filter((l) => l.id !== id) }));
    setLinkErrors((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleSave = () => {
    const newTextErrors: Partial<Record<TextField, string>> = {};
    const newLinkErrors: Record<string, string> = {};
    let hasErr = false;

    (Object.keys(TEXT_VALIDATORS) as TextField[]).forEach((key) => {
      const err = TEXT_VALIDATORS[key](data[key]);
      if (err) hasErr = true;
      newTextErrors[key] = err;
    });

    data.socialLinks.forEach((link) => {
      const err = VALIDATORS.optionalUrl(link.url);
      if (err) hasErr = true;
      newLinkErrors[link.id] = err;
    });

    setTextErrors(newTextErrors);
    setTouched({ brandDescription: true, contactAddress: true, contactPhone: true, contactEmail: true });
    setLinkErrors(newLinkErrors);

    if (!hasErr) onSave();
  };

  const hasErrors =
    Object.values(textErrors).some(Boolean) ||
    Object.values(linkErrors).some(Boolean);

  return (
    <SectionShell
      title="Footer & Social Media"
      description="Manage footer text, contact information, service areas, and social media links."
      icon={<FooterIcon />}
      onSave={handleSave}
      hasErrors={hasErrors}
    >
      {/* Brand */}
      <FormCard title="Brand Description">
        <FormField
          label="Brand Description"
          required
          value={data.brandDescription}
          onChange={(v) => setTextField("brandDescription", v)}
          onBlur={() => blurTextField("brandDescription")}
          error={textErrors.brandDescription}
          maxChars={400}
          multiline
          rows={3}
          placeholder="Short description of the company shown in the footer..."
        />
      </FormCard>

      {/* Contact info */}
      <FormCard title="Contact Information">
        <FormField
          label="Address / Location"
          value={data.contactAddress}
          onChange={(v) => setTextField("contactAddress", v)}
          onBlur={() => blurTextField("contactAddress")}
          error={textErrors.contactAddress}
          maxChars={100}
          placeholder="Grove City, Ohio"
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormField
            label="Phone Number"
            value={data.contactPhone}
            onChange={(v) => setTextField("contactPhone", v)}
            onBlur={() => blurTextField("contactPhone")}
            error={textErrors.contactPhone}
            maxChars={20}
            type="tel"
            placeholder="+1 (614) 555-0000"
            hint="Optional"
          />
          <FormField
            label="Email Address"
            value={data.contactEmail}
            onChange={(v) => setTextField("contactEmail", v)}
            onBlur={() => blurTextField("contactEmail")}
            error={textErrors.contactEmail}
            type="email"
            placeholder="info@pnepropertymanagement.com"
            hint="Optional"
          />
        </div>
      </FormCard>

      {/* Social media links */}
      <FormCard title="Social Media Links">
        <p style={{ margin: "0 0 16px", fontSize: "0.78rem", color: "#64748b", lineHeight: 1.55 }}>
          Links for Facebook, Instagram, X, and other platforms shown in the footer and contact modal. Leave URL blank to hide the icon.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.socialLinks.map((link) => (
            <div
              key={link.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                background: "#060f1e",
                border: `1px solid ${linkErrors[link.id] ? "rgba(239,68,68,0.4)" : "#1a2e4a"}`,
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              {/* Platform select */}
              <div style={{ flexShrink: 0 }}>
                <label style={{ display: "block", marginBottom: 5, fontSize: "0.68rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase" }}>
                  Platform
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                      color: "#C5A021", pointerEvents: "none",
                    }}
                  >
                    <SocialIcon platform={link.platform} />
                  </div>
                  <select
                    value={link.platform}
                    onChange={(e) => updateLink(link.id, "platform", e.target.value)}
                    style={{
                      background: "#0d1e35",
                      border: "1px solid #1e3452",
                      borderRadius: 8,
                      padding: "9px 10px 9px 32px",
                      color: "#e2e8f0",
                      fontSize: "0.82rem",
                      outline: "none",
                      cursor: "pointer",
                      minWidth: 130,
                      fontFamily: "inherit",
                      appearance: "none",
                    }}
                  >
                    {PLATFORM_OPTIONS.map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* URL input */}
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 5, fontSize: "0.68rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase" }}>
                  Profile URL
                </label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, "url", e.target.value)}
                  placeholder={`https://${link.platform === "x" ? "x.com" : `${link.platform}.com`}/yourprofile`}
                  style={{
                    width: "100%",
                    background: "#0d1e35",
                    border: `1px solid ${linkErrors[link.id] ? "#ef4444" : "#1e3452"}`,
                    borderRadius: 8,
                    padding: "9px 12px",
                    color: "#e2e8f0",
                    fontSize: "0.88rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
                {linkErrors[link.id] && (
                  <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: "#ef4444" }}>
                    {linkErrors[link.id]}
                  </p>
                )}
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeSocialLink(link.id)}
                title="Remove"
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#334155", padding: "28px 0 0", transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#334155"; }}
              >
                <svg width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addSocialLink}
          style={{
            marginTop: 12,
            background: "transparent",
            border: "1px dashed #1a2e4a",
            borderRadius: 10,
            padding: "10px",
            width: "100%",
            cursor: "pointer",
            color: "#64748b",
            fontSize: "0.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
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
          <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Social Link
        </button>
      </FormCard>

      {/* Service areas */}
      <FormCard title="Service Areas">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          {data.serviceAreas.map((area) => (
            <div
              key={area}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(197,160,33,0.08)",
                border: "1px solid rgba(197,160,33,0.2)",
                borderRadius: 20,
                padding: "5px 12px 5px 14px",
                fontSize: "0.8rem",
                color: "#C5A021",
              }}
            >
              {area}
              <button
                type="button"
                onClick={() => removeArea(area)}
                aria-label={`Remove ${area}`}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(197,160,33,0.5)", padding: 0, display: "flex", alignItems: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(197,160,33,0.5)"; }}
              >
                <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
          {data.serviceAreas.length === 0 && (
            <span style={{ fontSize: "0.78rem", color: "#334155" }}>No service areas added yet.</span>
          )}
        </div>

        {/* Add area input */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              value={areaInput}
              onChange={(e) => { setAreaInput(e.target.value); setAreaError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addArea(); } }}
              placeholder="e.g. Dublin, OH"
              maxLength={50}
              style={{
                width: "100%",
                background: "#0d1e35",
                border: `1px solid ${areaError ? "#ef4444" : "#1e3452"}`,
                borderRadius: 9,
                padding: "10px 14px",
                color: "#e2e8f0",
                fontSize: "0.88rem",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
            {areaError && (
              <p style={{ margin: "4px 0 0", fontSize: "0.73rem", color: "#ef4444" }}>{areaError}</p>
            )}
          </div>
          <button
            type="button"
            onClick={addArea}
            style={{
              background: "rgba(197,160,33,0.1)",
              border: "1px solid rgba(197,160,33,0.3)",
              borderRadius: 9,
              padding: "10px 16px",
              color: "#C5A021",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(197,160,33,0.18)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(197,160,33,0.1)"; }}
          >
            Add Area
          </button>
        </div>
      </FormCard>
    </SectionShell>
  );
}
