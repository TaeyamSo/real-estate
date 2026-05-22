"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isActive = value !== "any";
  const selectedLabel = options.find((o) => o.value === value)?.label ?? label;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative", flex: 1, minWidth: 140 }}>
      {/* Label */}
      <label
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: "0.65rem",
          fontWeight: 900,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "#C5A021",
          cursor: "pointer",
        }}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
      </label>

      {/* Trigger button */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          padding: "11px 14px 11px 16px",
          borderRadius: 12,
          border: `1.5px solid ${
            open
              ? "rgba(197,160,33,0.7)"
              : isActive
              ? "rgba(197,160,33,0.45)"
              : "rgba(255,255,255,0.15)"
          }`,
          background: open
            ? "rgba(197,160,33,0.1)"
            : isActive
            ? "rgba(197,160,33,0.07)"
            : "rgba(255,255,255,0.06)",
          color: isActive ? "#C5A021" : "white",
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: "0.88rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          outline: "none",
          transition: "border-color 0.2s ease, background 0.2s ease, color 0.2s ease",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedLabel}
        </span>
        <span
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease",
            color: "#C5A021",
          }}
        >
          <ChevronDown size={15} />
        </span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              right: 0,
              background: "#001835",
              border: "1.5px solid rgba(197,160,33,0.28)",
              borderRadius: 14,
              boxShadow:
                "0 20px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(197,160,33,0.06)",
              overflow: "hidden",
              zIndex: 200,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {options.map((option, idx) => {
              const isSelected = value === option.value;
              const isLast = idx === options.length - 1;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                >
                  <OptionButton
                    label={option.label}
                    isSelected={isSelected}
                    isLast={isLast}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  />
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Separate component to manage per-option hover state cleanly
function OptionButton({
  label,
  isSelected,
  isLast,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  isLast: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "11px 16px",
        textAlign: "left",
        background: isSelected
          ? "rgba(197,160,33,0.13)"
          : hovered
          ? "rgba(255,255,255,0.055)"
          : "transparent",
        color: isSelected ? "#C5A021" : hovered ? "white" : "rgba(255,255,255,0.78)",
        fontFamily: "inherit",
        fontWeight: isSelected ? 700 : 500,
        fontSize: "0.88rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "none",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
        transition: "background 0.12s ease, color 0.12s ease",
        outline: "none",
        letterSpacing: "0.01em",
      }}
    >
      <span>{label}</span>
      {isSelected && (
        <Check size={13} strokeWidth={2.5} color="#C5A021" />
      )}
    </button>
  );
}
