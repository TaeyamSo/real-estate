"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import MediaInput from "../MediaInput";
import { VALIDATORS, combine } from "../adminTypes";
import type { MediaField, ServiceItem } from "../adminTypes";

/* ── Shared service editor used by both Residents & Owners ── */
function ServiceEditor({
  services,
  onChange,
  errors,
}: {
  services: ServiceItem[];
  onChange: (items: ServiceItem[]) => void;
  errors: Record<string, string>;
}) {
  const update = (idx: number, field: keyof ServiceItem, value: string) => {
    const next = services.map((s, i) => (i === idx ? { ...s, [field]: value } : s));
    onChange(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {services.map((svc, idx) => (
        <div
          key={svc.id}
          style={{
            background: "#060f1e",
            border: "1px solid #1a2e4a",
            borderRadius: 10,
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(197,160,33,0.1)",
                border: "1px solid rgba(197,160,33,0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.65rem",
                fontWeight: 900,
                color: "#C5A021",
                flexShrink: 0,
              }}
            >
              {idx + 1}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>
              Service Card {idx + 1}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 12 }}>
            <FormField
              label="Icon"
              value={svc.icon}
              onChange={(v) => update(idx, "icon", v)}
              error={errors[`${svc.id}_icon`]}
              maxChars={4}
              placeholder="📋"
              hint="Emoji"
            />
            <FormField
              label="Title"
              required
              value={svc.title}
              onChange={(v) => update(idx, "title", v)}
              error={errors[`${svc.id}_title`]}
              maxChars={60}
              placeholder="Service title"
            />
          </div>
          <FormField
            label="Description"
            required
            value={svc.description}
            onChange={(v) => update(idx, "description", v)}
            error={errors[`${svc.id}_description`]}
            maxChars={200}
            multiline
            rows={3}
            placeholder="Brief service description..."
          />
        </div>
      ))}
    </div>
  );
}

/* ── Chapter sub-form ────────────────────────────────────── */
interface ChapterData {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  headingAccent: string;
  description: string;
  backgroundMedia: MediaField;
}
type ChapterTextField = Exclude<keyof ChapterData, "backgroundMedia">;
const CHAPTER_TEXT_VALIDATORS: Record<ChapterTextField, (v: string) => string> = {
  badge: combine(VALIDATORS.required, VALIDATORS.maxChars(50)),
  headingLine1: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  headingLine2: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  headingLine3: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  headingAccent: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  description: combine(VALIDATORS.required, VALIDATORS.maxChars(400)),
};

/* ── Section sub-form ────────────────────────────────────── */
interface SectionData {
  heading: string;
  tagline: string;
  image: MediaField;
  services: ServiceItem[];
}
type SectionTextField = "heading" | "tagline";
const SECTION_TEXT_VALIDATORS: Record<SectionTextField, (v: string) => string> = {
  heading: combine(VALIDATORS.required, VALIDATORS.maxChars(60)),
  tagline: combine(VALIDATORS.required, VALIDATORS.maxChars(120)),
};

/* ── Residents defaults ──────────────────────────────────── */
const RESIDENTS_CHAPTER_DEFAULTS: ChapterData = {
  badge: "For Residents",
  headingLine1: "Why",
  headingLine2: "Residents",
  headingLine3: "Choose",
  headingAccent: "PNE",
  description:
    "We believe a great home starts with great management. From your very first application to the day you move out, we're committed to making your experience smooth, transparent, and genuinely stress-free.",
  backgroundMedia: {
    url: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1920&q=80",
    type: "image",
  },
};

const RESIDENTS_SECTION_DEFAULTS: SectionData = {
  heading: "Residents",
  tagline: "Quality living you can depend on.",
  image: {
    url: "https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=900&q=80",
    type: "image",
  },
  services: [
    { id: "rs1", icon: "📋", title: "Easy Online Applications", description: "Apply from anywhere — fast approvals, digital lease signing, and zero paperwork stress." },
    { id: "rs2", icon: "💳", title: "Flexible Online Payments", description: "Pay rent on your schedule through our secure resident portal with multiple payment methods." },
    { id: "rs3", icon: "🔧", title: "24/7 Maintenance Support", description: "Submit requests anytime and track progress — fast, reliable repairs from vetted local contractors." },
    { id: "rs4", icon: "🤝", title: "Local Experts, Real Care", description: "Honest communication and responsive support from the day you move in to the day you move out." },
  ],
};

function ResidentsIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function ResidentsAdmin({ onSave }: Props) {
  const [chapter, setChapter] = useState<ChapterData>(RESIDENTS_CHAPTER_DEFAULTS);
  const [chapterErrors, setChapterErrors] = useState<Partial<Record<ChapterTextField, string>>>({});
  const [chapterTouched, setChapterTouched] = useState<Partial<Record<ChapterTextField, boolean>>>({});
  const [chapterMediaError, setChapterMediaError] = useState("");

  const [section, setSection] = useState<SectionData>(RESIDENTS_SECTION_DEFAULTS);
  const [sectionErrors, setSectionErrors] = useState<Partial<Record<SectionTextField, string>>>({});
  const [sectionMediaError, setSectionMediaError] = useState("");
  const [serviceErrors, setServiceErrors] = useState<Record<string, string>>({});

  const setChapterField = useCallback(
    (key: ChapterTextField, value: string) => {
      setChapter((prev) => ({ ...prev, [key]: value }));
      if (chapterTouched[key]) {
        setChapterErrors((prev) => ({ ...prev, [key]: CHAPTER_TEXT_VALIDATORS[key](value) }));
      }
    },
    [chapterTouched]
  );

  const blurChapterField = useCallback(
    (key: ChapterTextField) => {
      setChapterTouched((prev) => ({ ...prev, [key]: true }));
      setChapterErrors((prev) => ({ ...prev, [key]: CHAPTER_TEXT_VALIDATORS[key](chapter[key]) }));
    },
    [chapter]
  );

  const setSectionField = useCallback(
    (key: SectionTextField, value: string) => {
      setSection((prev) => ({ ...prev, [key]: value }));
      setSectionErrors((prev) => ({ ...prev, [key]: SECTION_TEXT_VALIDATORS[key](value) }));
    },
    []
  );

  const handleSave = () => {
    const newChapterErrors: Partial<Record<ChapterTextField, string>> = {};
    const newSectionErrors: Partial<Record<SectionTextField, string>> = {};
    const newServiceErrors: Record<string, string> = {};
    let hasErr = false;

    (Object.keys(CHAPTER_TEXT_VALIDATORS) as ChapterTextField[]).forEach((k) => {
      const err = CHAPTER_TEXT_VALIDATORS[k](chapter[k]);
      if (err) hasErr = true;
      newChapterErrors[k] = err;
    });

    const cMediaErr = VALIDATORS.url(chapter.backgroundMedia.url);
    if (cMediaErr) hasErr = true;
    setChapterMediaError(cMediaErr);

    (Object.keys(SECTION_TEXT_VALIDATORS) as SectionTextField[]).forEach((k) => {
      const err = SECTION_TEXT_VALIDATORS[k](section[k] as string);
      if (err) hasErr = true;
      newSectionErrors[k] = err;
    });

    const sMediaErr = VALIDATORS.url(section.image.url);
    if (sMediaErr) hasErr = true;
    setSectionMediaError(sMediaErr);

    section.services.forEach((svc) => {
      const tErr = combine(VALIDATORS.required, VALIDATORS.maxChars(60))(svc.title);
      const dErr = combine(VALIDATORS.required, VALIDATORS.maxChars(200))(svc.description);
      if (tErr) hasErr = true;
      if (dErr) hasErr = true;
      newServiceErrors[`${svc.id}_title`] = tErr;
      newServiceErrors[`${svc.id}_description`] = dErr;
    });

    setChapterErrors(newChapterErrors);
    setChapterTouched({ badge: true, headingLine1: true, headingLine2: true, headingLine3: true, headingAccent: true, description: true });
    setSectionErrors(newSectionErrors);
    setServiceErrors(newServiceErrors);

    if (!hasErr) onSave();
  };

  const hasErrors =
    Object.values(chapterErrors).some(Boolean) ||
    Boolean(chapterMediaError) ||
    Object.values(sectionErrors).some(Boolean) ||
    Boolean(sectionMediaError) ||
    Object.values(serviceErrors).some(Boolean);

  return (
    <SectionShell
      title="Residents"
      description="Manage the Residents chapter (full-screen intro) and the services section below it."
      icon={<ResidentsIcon />}
      onSave={handleSave}
      hasErrors={hasErrors}
    >
      {/* Chapter */}
      <FormCard title="Residents Chapter — Full Screen Intro">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormField label="Badge" required value={chapter.badge} onChange={(v) => setChapterField("badge", v)} onBlur={() => blurChapterField("badge")} error={chapterErrors.badge} maxChars={50} />
          <FormField label="Description" required value={chapter.description} onChange={(v) => setChapterField("description", v)} onBlur={() => blurChapterField("description")} error={chapterErrors.description} maxChars={400} multiline rows={3} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {(["headingLine1", "headingLine2", "headingLine3", "headingAccent"] as ChapterTextField[]).map((k, i) => (
            <FormField
              key={k}
              label={i === 3 ? "Accent Word (gold)" : `Heading Word ${i + 1}`}
              required
              value={chapter[k]}
              onChange={(v) => setChapterField(k, v)}
              onBlur={() => blurChapterField(k)}
              error={chapterErrors[k]}
              maxChars={40}
              placeholder={["Why", "Residents", "Choose", "PNE"][i]}
            />
          ))}
        </div>
        <MediaInput
          label="Background Image or Video"
          required
          value={chapter.backgroundMedia}
          onChange={(v) => { setChapter((p) => ({ ...p, backgroundMedia: v })); setChapterMediaError(""); }}
          onBlur={() => setChapterMediaError(VALIDATORS.url(chapter.backgroundMedia.url))}
          error={chapterMediaError}
          hint="Full-screen background. Recommended 1920×1080."
        />
      </FormCard>

      {/* Section */}
      <FormCard title="Residents Section — Services">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormField label="Section Heading" required value={section.heading} onChange={(v) => setSectionField("heading", v)} error={sectionErrors.heading} maxChars={60} />
          <FormField label="Tagline" required value={section.tagline} onChange={(v) => setSectionField("tagline", v)} error={sectionErrors.tagline} maxChars={120} />
        </div>
        <MediaInput
          label="Section Image"
          required
          value={section.image}
          onChange={(v) => { setSection((p) => ({ ...p, image: v })); setSectionMediaError(""); }}
          onBlur={() => setSectionMediaError(VALIDATORS.url(section.image.url))}
          error={sectionMediaError}
          hint="Image displayed alongside the services list."
        />
        <div style={{ marginTop: 4 }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: 1.5, color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>
            Service Cards
          </div>
          <ServiceEditor
            services={section.services}
            onChange={(items) => setSection((p) => ({ ...p, services: items }))}
            errors={serviceErrors}
          />
        </div>
      </FormCard>
    </SectionShell>
  );
}
