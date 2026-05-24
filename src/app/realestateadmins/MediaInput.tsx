"use client";

import { useState } from "react";
import type { MediaField } from "./adminTypes";

function LinkIcon() {
  return (
    <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function ImageIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}
function VideoIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}
function ClearIcon() {
  return (
    <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

type DetectedType = "image" | "video" | "youtube" | "unknown";

function detectType(url: string): DetectedType {
  if (!url.trim()) return "unknown";
  const lower = url.toLowerCase().trim();
  if (/\.(mp4|webm|ogg|mov|avi)(\?|#|$)/.test(lower)) return "video";
  if (/youtube\.com\/watch|youtu\.be\/|youtube\.com\/embed/.test(lower)) return "youtube";
  return "image";
}

function getYoutubeEmbed(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

function isValidUrl(url: string): boolean {
  return /^https?:\/\/.+/.test(url.trim());
}

const TYPE_BADGES: Record<DetectedType, { label: string; color: string; bg: string }> = {
  image: { label: "IMAGE", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  video: { label: "VIDEO", color: "#C5A021", bg: "rgba(197,160,33,0.1)" },
  youtube: { label: "YOUTUBE", color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  unknown: { label: "UNKNOWN", color: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

interface MediaInputProps {
  label: string;
  required?: boolean;
  value: MediaField;
  onChange: (value: MediaField) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
}

export default function MediaInput({
  label,
  required,
  value,
  onChange,
  onBlur,
  error,
  hint,
}: MediaInputProps) {
  const [focused, setFocused] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);

  const url = value.url;
  const detectedType = detectType(url);
  const valid = isValidUrl(url);
  const badge = TYPE_BADGES[detectedType];

  const borderColor = error ? "#ef4444" : focused ? "#C5A021" : "#1e3452";

  const handleUrlChange = (newUrl: string) => {
    setImgError(false);
    setPreviewVisible(true);
    const t = detectType(newUrl);
    onChange({
      url: newUrl,
      type: t === "video" || t === "youtube" ? "video" : "image",
    });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      {/* Label */}
      <label
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: 1.5,
          color: "#94a3b8",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: "#C5A021", marginLeft: 4 }}>*</span>}
      </label>

      {/* URL input row */}
      <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#334155",
              pointerEvents: "none",
            }}
          >
            <LinkIcon />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              onBlur?.();
            }}
            placeholder="https://example.com/image.jpg or video.mp4"
            style={{
              width: "100%",
              background: "#0d1e35",
              border: `1px solid ${borderColor}`,
              borderRadius: 9,
              padding: "11px 14px 11px 36px",
              color: "#e2e8f0",
              fontSize: "0.88rem",
              outline: "none",
              boxSizing: "border-box",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
              boxShadow: focused ? "0 0 0 3px rgba(197,160,33,0.08)" : "none",
            }}
          />
        </div>

        {/* Clear button */}
        {url && (
          <button
            type="button"
            onClick={() => { handleUrlChange(""); setPreviewVisible(false); }}
            title="Clear URL"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: 9,
              padding: "0 12px",
              cursor: "pointer",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"; }}
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {/* Error / hint */}
      {(error || hint) && (
        <div style={{ marginTop: 5 }}>
          {error ? (
            <span style={{ fontSize: "0.73rem", color: "#ef4444", display: "flex", alignItems: "center", gap: 4 }}>
              <svg width={11} height={11} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </span>
          ) : (
            <span style={{ fontSize: "0.73rem", color: "#334155" }}>{hint}</span>
          )}
        </div>
      )}

      {/* Preview */}
      {url && valid && previewVisible && (
        <div
          style={{
            marginTop: 12,
            background: "#080f1d",
            border: "1px solid #1a2e4a",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* Preview header */}
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #1a2e4a",
              background: "#060f1e",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: detectedType === "video" || detectedType === "youtube"
                    ? "#C5A021"
                    : "#22c55e",
                }}
              >
                {detectedType === "video" || detectedType === "youtube" ? (
                  <VideoIcon />
                ) : (
                  <ImageIcon />
                )}
              </span>
              <span style={{ fontSize: "0.7rem", color: "#64748b" }}>Live Preview</span>
              <span
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: badge.color,
                  background: badge.bg,
                  border: `1px solid ${badge.color}33`,
                  borderRadius: 4,
                  padding: "1px 6px",
                }}
              >
                {badge.label}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setPreviewVisible(false)}
              title="Hide preview"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#334155",
                display: "flex",
                alignItems: "center",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#334155"; }}
            >
              <ClearIcon />
            </button>
          </div>

          {/* Preview content */}
          <div style={{ padding: 12 }}>
            {detectedType === "youtube" ? (
              <div style={{ position: "relative", paddingBottom: "40%", height: 0 }}>
                <iframe
                  src={getYoutubeEmbed(url)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: 6,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                  allowFullScreen
                  title="YouTube preview"
                />
              </div>
            ) : detectedType === "video" ? (
              /* eslint-disable-next-line jsx-a11y/media-has-caption */
              <video
                src={url}
                controls
                style={{
                  width: "100%",
                  maxHeight: 200,
                  borderRadius: 6,
                  background: "#000",
                }}
              />
            ) : imgError ? (
              <div
                style={{
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  fontSize: "0.8rem",
                  gap: 8,
                }}
              >
                <ImageIcon />
                Image could not be loaded — check the URL
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt="Media preview"
                onError={() => setImgError(true)}
                onLoad={() => setImgError(false)}
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  borderRadius: 6,
                  display: "block",
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Show preview button when hidden */}
      {url && valid && !previewVisible && (
        <button
          type="button"
          onClick={() => setPreviewVisible(true)}
          style={{
            marginTop: 8,
            background: "none",
            border: "1px solid #1a2e4a",
            borderRadius: 7,
            padding: "5px 12px",
            fontSize: "0.74rem",
            color: "#64748b",
            cursor: "pointer",
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
          Show preview
        </button>
      )}
    </div>
  );
}
