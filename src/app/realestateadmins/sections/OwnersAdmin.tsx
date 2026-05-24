"use client";

import { useState, useCallback } from "react";
import SectionShell, { FormCard } from "../SectionShell";
import FormField from "../FormField";
import MediaInput from "../MediaInput";
import { VALIDATORS, combine } from "../adminTypes";
import type { MediaField, ServiceItem } from "../adminTypes";

/* ── Reused service editor ───────────────────────────────── */
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
    onChange(services.map((s, i) => (i === idx ? { ...s, [field]: value } : s)));
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span
              style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "rgba(197,160,33,0.1)", border: "1px solid rgba(197,160,33,0.2)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem", fontWeight: 900, color: "#C5A021", flexShrink: 0,
              }}
            >
              {idx + 1}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>
              Service Card {idx + 1}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 12 }}>
            <FormField label="Icon" value={svc.icon} onChange={(v) => update(idx, "icon", v)} error={errors[`${svc.id}_icon`]} maxChars={4} placeholder="📢" hint="Emoji" />
            <FormField label="Title" required value={svc.title} onChange={(v) => update(idx, "title", v)} error={errors[`${svc.id}_title`]} maxChars={60} />
          </div>
          <FormField label="Description" required value={svc.description} onChange={(v) => update(idx, "description", v)} error={errors[`${svc.id}_description`]} maxChars={200} multiline rows={3} />
        </div>
      ))}
    </div>
  );
}

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
const CHAPTER_VALIDATORS: Record<ChapterTextField, (v: string) => string> = {
  badge: combine(VALIDATORS.required, VALIDATORS.maxChars(50)),
  headingLine1: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  headingLine2: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  headingLine3: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  headingAccent: combine(VALIDATORS.required, VALIDATORS.maxChars(40)),
  description: combine(VALIDATORS.required, VALIDATORS.maxChars(400)),
};

interface SectionData {
  heading: string;
  tagline: string;
  image: MediaField;
  services: ServiceItem[];
}
type SectionTextField = "heading" | "tagline";
const SECTION_VALIDATORS: Record<SectionTextField, (v: string) => string> = {
  heading: combine(VALIDATORS.required, VALIDATORS.maxChars(60)),
  tagline: combine(VALIDATORS.required, VALIDATORS.maxChars(120)),
};

const CHAPTER_DEFAULTS: ChapterData = {
  badge: "For Owners",
  headingLine1: "Why",
  headingLine2: "Property",
  headingLine3: "Owners",
  headingAccent: "Trust PNE",
  description:
    "Your investment deserves more than a hands-off management company. We bring proven systems, local expertise, and complete financial transparency to every property we manage.",
  backgroundMedia: {
    url: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1920&q=80",
    type: "image",
  },
};

const SECTION_DEFAULTS: SectionData = {
  heading: "Owners & Investors",
  tagline: "Oversight made efficient and rewarding.",
  image: {
    url: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80",
    type: "image",
  },
  services: [
    { id: "os1", icon: "📢", title: "Full-Service Leasing", description: "Professional listings across high-traffic platforms ensuring fast placement of high-quality tenants." },
    { id: "os2", icon: "💰", title: "Rent Collection & Direct Deposit", description: "Automated rent collection with real-time tracking and direct deposits straight to your account." },
    { id: "os3", icon: "📊", title: "Transparent Owner Reporting", description: "Detailed monthly statements and tax-ready documentation accessible through your dedicated owner portal." },
    { id: "os4", icon: "📉", title: "Strategic Vacancy Minimization", description: "Proactive marketing and tenant retention to keep your units occupied and ROI maximized." },
  ],
};

function OwnersIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

interface Props { onSave: () => void; }

export default function OwnersAdmin({ onSave }: Props) {
  const [chapter, setChapter] = useState<ChapterData>(CHAPTER_DEFAULTS);
  const [chapterErrors, setChapterErrors] = useState<Partial<Record<ChapterTextField, string>>>({});
  const [chapterTouched, setChapterTouched] = useState<Partial<Record<ChapterTextField, boolean>>>({});
  const [chapterMediaError, setChapterMediaError] = useState("");

  const [section, setSection] = useState<SectionData>(SECTION_DEFAULTS);
  const [sectionErrors, setSectionErrors] = useState<Partial<Record<SectionTextField, string>>>({});
  const [sectionMediaError, setSectionMediaError] = useState("");
  const [serviceErrors, setServiceErrors] = useState<Record<string, string>>({});

  const setChapterField = useCallback(
    (key: ChapterTextField, value: string) => {
      setChapter((prev) => ({ ...prev, [key]: value }));
      if (chapterTouched[key]) {
        setChapterErrors((prev) => ({ ...prev, [key]: CHAPTER_VALIDATORS[key](value) }));
      }
    },
    [chapterTouched]
  );

  const blurChapterField = useCallback(
    (key: ChapterTextField) => {
      setChapterTouched((prev) => ({ ...prev, [key]: true }));
      setChapterErrors((prev) => ({ ...prev, [key]: CHAPTER_VALIDATORS[key](chapter[key]) }));
    },
    [chapter]
  );

  const setSectionField = useCallback((key: SectionTextField, value: string) => {
    setSection((prev) => ({ ...prev, [key]: value }));
    setSectionErrors((prev) => ({ ...prev, [key]: SECTION_VALIDATORS[key](value) }));
  }, []);

  const handleSave = () => {
    const newChErr: Partial<Record<ChapterTextField, string>> = {};
    const newSecErr: Partial<Record<SectionTextField, string>> = {};
    const newSvcErr: Record<string, string> = {};
    let hasErr = false;

    (Object.keys(CHAPTER_VALIDATORS) as ChapterTextField[]).forEach((k) => {
      const err = CHAPTER_VALIDATORS[k](chapter[k]);
      if (err) hasErr = true;
      newChErr[k] = err;
    });
    const cMErr = VALIDATORS.url(chapter.backgroundMedia.url);
    if (cMErr) hasErr = true;
    setChapterMediaError(cMErr);

    (Object.keys(SECTION_VALIDATORS) as SectionTextField[]).forEach((k) => {
      const err = SECTION_VALIDATORS[k](section[k] as string);
      if (err) hasErr = true;
      newSecErr[k] = err;
    });
    const sMErr = VALIDATORS.url(section.image.url);
    if (sMErr) hasErr = true;
    setSectionMediaError(sMErr);

    section.services.forEach((svc) => {
      const tErr = combine(VALIDATORS.required, VALIDATORS.maxChars(60))(svc.title);
      const dErr = combine(VALIDATORS.required, VALIDATORS.maxChars(200))(svc.description);
      if (tErr) hasErr = true;
      if (dErr) hasErr = true;
      newSvcErr[`${svc.id}_title`] = tErr;
      newSvcErr[`${svc.id}_description`] = dErr;
    });

    setChapterErrors(newChErr);
    setChapterTouched({ badge: true, headingLine1: true, headingLine2: true, headingLine3: true, headingAccent: true, description: true });
    setSectionErrors(newSecErr);
    setServiceErrors(newSvcErr);
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
      title="Owners"
      description="Manage the Owners chapter (full-screen intro) and the services section below it."
      icon={<OwnersIcon />}
      onSave={handleSave}
      hasErrors={hasErrors}
    >
      {/* Chapter */}
      <FormCard title="Owners Chapter — Full Screen Intro">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <FormField label="Badge" required value={chapter.badge} onChange={(v) => setChapterField("badge", v)} onBlur={() => blurChapterField("badge")} error={chapterErrors.badge} maxChars={50} />
          <FormField label="Description" required value={chapter.description} onChange={(v) => setChapterField("description", v)} onBlur={() => blurChapterField("description")} error={chapterErrors.description} maxChars={400} multiline rows={3} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 14 }}>
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
              placeholder={["Why", "Property", "Owners", "Trust PNE"][i]}
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
      <FormCard title="Owners Section — Services">
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
