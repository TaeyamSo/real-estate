"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import MediaInput from "../MediaInput";
import { VALIDATORS, combine } from "../adminTypes";
import type { MediaField } from "../adminTypes";

interface StatItem { value: string; label: string; }

interface AboutData {
  badge: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  image: MediaField;
  stats: [StatItem, StatItem, StatItem];
}

const DEFAULTS: AboutData = {
  badge: "About Us",
  heading: "Built on Trust. Driven by Results.",
  paragraph1:
    "PNE Property Management was founded with one mission: to make property ownership and renting a seamless, stress-free experience for everyone involved. Based in Grove City, Ohio, we've spent years building deep roots across Central Ohio's communities.",
  paragraph2:
    "We combine decades of hands-on real estate expertise with modern technology and a people-first approach — bringing the same dedication, transparency, and professionalism to every interaction.",
  image: { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80", type: "image" },
  stats: [
    { value: "200+", label: "Units Managed" },
    { value: "10+", label: "Years Experience" },
    { value: "5★", label: "Client Rated" },
  ],
};

type TextField = "badge" | "heading" | "paragraph1" | "paragraph2";
const TEXT_VALIDATORS: Record<TextField, (v: string) => string> = {
  badge: combine(VALIDATORS.required, VALIDATORS.maxChars(50)),
  heading: combine(VALIDATORS.required, VALIDATORS.maxChars(100)),
  paragraph1: combine(VALIDATORS.required, VALIDATORS.maxChars(600)),
  paragraph2: combine(VALIDATORS.required, VALIDATORS.maxChars(600)),
};

function AboutIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function AboutAdmin({ onSave }: Props) {
  const [data, setData] = useState<AboutData>(DEFAULTS);
  const [textErrors, setTextErrors] = useState<Partial<Record<TextField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<TextField, boolean>>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, string>>({});
  const [statErrors, setStatErrors] = useState<Record<string, string>>({});

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

  const setImage = useCallback((key: "image", val: MediaField) => {
    setData((prev) => ({ ...prev, [key]: val }));
    setImageErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const blurImage = useCallback((key: "image") => {
    const err = VALIDATORS.url(data[key].url);
    setImageErrors((prev) => ({ ...prev, [key]: err }));
  }, [data]);

  const setStat = useCallback(
    (idx: number, field: "value" | "label", val: string) => {
      setData((prev) => {
        const stats = [...prev.stats] as [StatItem, StatItem, StatItem];
        stats[idx] = { ...stats[idx], [field]: val };
        return { ...prev, stats };
      });
      const key = `stat_${idx}_${field}`;
      const validator = field === "value"
        ? combine(VALIDATORS.required, VALIDATORS.maxChars(10))
        : combine(VALIDATORS.required, VALIDATORS.maxChars(30));
      setStatErrors((prev) => ({ ...prev, [key]: validator(val) }));
    },
    []
  );

  const handleSave = () => {
    const newTextErrors: Partial<Record<TextField, string>> = {};
    const newImageErrors: Record<string, string> = {};
    const newStatErrors: Record<string, string> = {};
    let hasErr = false;

    (Object.keys(TEXT_VALIDATORS) as TextField[]).forEach((key) => {
      const err = TEXT_VALIDATORS[key](data[key]);
      if (err) hasErr = true;
      newTextErrors[key] = err;
    });

    (["image"] as const).forEach((key) => {
      const err = VALIDATORS.url(data[key].url);
      if (err) hasErr = true;
      newImageErrors[key] = err;
    });

    data.stats.forEach((stat, idx) => {
      const vErr = combine(VALIDATORS.required, VALIDATORS.maxChars(10))(stat.value);
      const lErr = combine(VALIDATORS.required, VALIDATORS.maxChars(30))(stat.label);
      if (vErr) hasErr = true;
      if (lErr) hasErr = true;
      newStatErrors[`stat_${idx}_value`] = vErr;
      newStatErrors[`stat_${idx}_label`] = lErr;
    });

    setTextErrors(newTextErrors);
    setImageErrors(newImageErrors);
    setStatErrors(newStatErrors);
    setTouched({ badge: true, heading: true, paragraph1: true, paragraph2: true });

    if (!hasErr) onSave();
  };

  const hasErrors =
    Object.values(textErrors).some(Boolean) ||
    Object.values(imageErrors).some(Boolean) ||
    Object.values(statErrors).some(Boolean);

  return (
    <SectionShell
      title="About Section"
      description="Edit the about section text, image, and key stats displayed on the homepage."
      icon={<AboutIcon />}
      onSave={handleSave}
      hasErrors={hasErrors}
    >
      {/* Text */}
      <FormCard title="Text Content">
        <FormField
          label="Badge Text"
          required
          value={data.badge}
          onChange={(v) => setTextField("badge", v)}
          onBlur={() => blurTextField("badge")}
          error={textErrors.badge}
          maxChars={50}
          placeholder="About Us"
        />
        <FormField
          label="Section Heading"
          required
          value={data.heading}
          onChange={(v) => setTextField("heading", v)}
          onBlur={() => blurTextField("heading")}
          error={textErrors.heading}
          maxChars={100}
          placeholder="Built on Trust. Driven by Results."
        />
        <FormField
          label="Paragraph 1"
          required
          value={data.paragraph1}
          onChange={(v) => setTextField("paragraph1", v)}
          onBlur={() => blurTextField("paragraph1")}
          error={textErrors.paragraph1}
          maxChars={600}
          multiline
          rows={4}
          placeholder="Your company origin story..."
        />
        <FormField
          label="Paragraph 2"
          required
          value={data.paragraph2}
          onChange={(v) => setTextField("paragraph2", v)}
          onBlur={() => blurTextField("paragraph2")}
          error={textErrors.paragraph2}
          maxChars={600}
          multiline
          rows={4}
          placeholder="Your approach and values..."
        />
      </FormCard>

      {/* Images */}
      <FormCard title="About Image">
        <MediaInput
          label="About Section Image"
          required
          value={data.image}
          onChange={(v) => setImage("image", v)}
          onBlur={() => blurImage("image")}
          error={imageErrors.image}
          hint="Primary About image. Recommended: 1200×900px."
        />
      </FormCard>

      {/* Stats */}
      <FormCard title="Statistics (3 counters)">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {data.stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr",
                gap: 12,
                background: "#060f1e",
                border: "1px solid #1a2e4a",
                borderRadius: 9,
                padding: "14px 16px",
              }}
            >
              <FormField
                label={`Stat ${idx + 1} Value`}
                required
                value={stat.value}
                onChange={(v) => setStat(idx, "value", v)}
                error={statErrors[`stat_${idx}_value`]}
                maxChars={10}
                placeholder="200+"
                hint="e.g. 200+, 10+, 5★"
              />
              <FormField
                label={`Stat ${idx + 1} Label`}
                required
                value={stat.label}
                onChange={(v) => setStat(idx, "label", v)}
                error={statErrors[`stat_${idx}_label`]}
                maxChars={30}
                placeholder="Units Managed"
              />
            </div>
          ))}
        </div>
      </FormCard>
    </SectionShell>
  );
}
