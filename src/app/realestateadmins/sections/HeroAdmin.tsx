"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import MediaInput from "../MediaInput";
import { VALIDATORS, combine } from "../adminTypes";
import type { MediaField } from "../adminTypes";

interface HeroData {
  badge: string;
  heading1: string;
  heading2: string;
  tagline: string;
  backgroundMedia: MediaField;
}

const DEFAULTS: HeroData = {
  badge: "Central Ohio's Premier Property Management",
  heading1: "PREMIER",
  heading2: "OVERSIGHT.",
  tagline: "Distinguished Management. Absolute Reliability.",
  backgroundMedia: {
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
    type: "image",
  },
};

type FieldKey = Exclude<keyof HeroData, "backgroundMedia">;

const FIELD_VALIDATORS: Record<FieldKey, (v: string) => string> = {
  badge: combine(VALIDATORS.required, VALIDATORS.maxChars(80)),
  heading1: combine(VALIDATORS.required, VALIDATORS.maxChars(60)),
  heading2: combine(VALIDATORS.required, VALIDATORS.maxChars(60)),
  tagline: combine(VALIDATORS.required, VALIDATORS.maxChars(150)),
};

function HeroIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function HeroAdmin({ onSave }: Props) {
  const [data, setData] = useState<HeroData>(DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [mediaError, setMediaError] = useState("");

  const setField = useCallback(
    (key: FieldKey, value: string) => {
      setData((prev) => ({ ...prev, [key]: value }));
      if (touched[key]) {
        const err = FIELD_VALIDATORS[key](value);
        setErrors((prev) => ({ ...prev, [key]: err }));
      }
    },
    [touched]
  );

  const blurField = useCallback(
    (key: FieldKey) => {
      setTouched((prev) => ({ ...prev, [key]: true }));
      const err = FIELD_VALIDATORS[key](data[key] as string);
      setErrors((prev) => ({ ...prev, [key]: err }));
    },
    [data]
  );

  const handleSave = () => {
    // Validate all fields
    const newErrors: Partial<Record<FieldKey, string>> = {};
    let allTouched: Partial<Record<FieldKey, boolean>> = {};
    let hasErr = false;

    (Object.keys(FIELD_VALIDATORS) as FieldKey[]).forEach((key) => {
      const err = FIELD_VALIDATORS[key](data[key] as string);
      if (err) hasErr = true;
      newErrors[key] = err;
      allTouched[key] = true;
    });

    const urlErr = VALIDATORS.url(data.backgroundMedia.url);
    if (urlErr) {
      setMediaError(urlErr);
      hasErr = true;
    } else {
      setMediaError("");
    }

    setErrors(newErrors);
    setTouched(allTouched);

    if (!hasErr) onSave();
  };

  const hasErrors =
    Object.values(errors).some(Boolean) || Boolean(mediaError);

  return (
    <SectionShell
      title="Hero Section"
      description="Manage the full-screen landing hero: the badge, main headings, tagline, and background media."
      icon={<HeroIcon />}
      onSave={handleSave}
      hasErrors={hasErrors}
    >
      {/* Text content */}
      <FormCard title="Text Content">
        <FormField
          label="Badge Text"
          required
          value={data.badge}
          onChange={(v) => setField("badge", v)}
          onBlur={() => blurField("badge")}
          error={errors.badge}
          maxChars={80}
          placeholder="Central Ohio's Premier Property Management"
          hint="Short phrase displayed above the main heading"
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FormField
            label="Heading Line 1"
            required
            value={data.heading1}
            onChange={(v) => setField("heading1", v)}
            onBlur={() => blurField("heading1")}
            error={errors.heading1}
            maxChars={60}
            placeholder="PREMIER"
            hint="First line (usually uppercase)"
          />
          <FormField
            label="Heading Line 2 (Accent)"
            required
            value={data.heading2}
            onChange={(v) => setField("heading2", v)}
            onBlur={() => blurField("heading2")}
            error={errors.heading2}
            maxChars={60}
            placeholder="OVERSIGHT."
            hint="Second line rendered in gold"
          />
        </div>
        <FormField
          label="Tagline"
          required
          value={data.tagline}
          onChange={(v) => setField("tagline", v)}
          onBlur={() => blurField("tagline")}
          error={errors.tagline}
          maxChars={150}
          placeholder="Distinguished Management. Absolute Reliability."
          hint="Subtitle shown below the main heading"
        />
      </FormCard>

      {/* Background media */}
      <FormCard title="Background Media">
        <MediaInput
          label="Background Image or Video URL"
          required
          value={data.backgroundMedia}
          onChange={(v) => {
            setData((prev) => ({ ...prev, backgroundMedia: v }));
            setMediaError("");
          }}
          onBlur={() => {
            const err = VALIDATORS.url(data.backgroundMedia.url);
            setMediaError(err);
          }}
          error={mediaError}
          hint="Paste a direct image URL or a video URL (.mp4, .webm) — YouTube links are also supported. Recommended: 1920×1080 or larger."
        />
        <div
          style={{
            padding: "10px 14px",
            background: "rgba(197,160,33,0.05)",
            border: "1px solid rgba(197,160,33,0.15)",
            borderRadius: 8,
            fontSize: "0.76rem",
            color: "#64748b",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "#C5A021" }}>Tip:</strong> For best performance, use compressed images under 2MB. Videos will autoplay muted. For videos, .mp4 format is recommended for broadest browser support.
        </div>
      </FormCard>
    </SectionShell>
  );
}
