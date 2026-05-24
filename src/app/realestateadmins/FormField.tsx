"use client";

import { useState } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  maxChars?: number;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  hint?: string;
  type?: "text" | "number" | "email" | "tel" | "url";
  disabled?: boolean;
}

export default function FormField({
  label,
  required,
  value,
  onChange,
  onBlur,
  error,
  maxChars,
  multiline,
  rows = 4,
  placeholder,
  hint,
  type = "text",
  disabled,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  const ratio = maxChars ? value.length / maxChars : 0;
  const counterColor =
    ratio > 1 ? "#ef4444" : ratio > 0.85 ? "#C5A021" : "#334155";

  const borderColor = error
    ? "#ef4444"
    : focused
    ? "#C5A021"
    : "#1e3452";

  const sharedInputStyle: React.CSSProperties = {
    width: "100%",
    background: disabled ? "rgba(10,22,40,0.4)" : "#0d1e35",
    border: `1px solid ${borderColor}`,
    borderRadius: 9,
    padding: multiline ? "11px 14px" : "11px 14px",
    color: disabled ? "#64748b" : "#e2e8f0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxSizing: "border-box",
    fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "text",
    boxShadow: focused ? `0 0 0 3px rgba(197,160,33,0.08)` : "none",
  };

  return (
    <div style={{ marginBottom: 18 }}>
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
          userSelect: "none",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#C5A021", marginLeft: 4 }} title="Required">
            *
          </span>
        )}
      </label>

      {/* Input or Textarea */}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          style={{ ...sharedInputStyle, resize: "vertical", lineHeight: 1.65 }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          placeholder={placeholder}
          disabled={disabled}
          style={sharedInputStyle}
        />
      )}

      {/* Footer row: error/hint + char counter */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 5,
          gap: 8,
          minHeight: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          {error ? (
            <span
              style={{
                fontSize: "0.73rem",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <svg width={11} height={11} fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </span>
          ) : hint ? (
            <span style={{ fontSize: "0.73rem", color: "#334155" }}>{hint}</span>
          ) : null}
        </div>
        {maxChars && (
          <span
            style={{
              fontSize: "0.7rem",
              color: counterColor,
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
              transition: "color 0.2s",
            }}
          >
            {value.length} / {maxChars}
          </span>
        )}
      </div>
    </div>
  );
}
