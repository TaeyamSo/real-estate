"use client";

import type { AdminSection } from "./AdminApp";

/* ── Section icon map ────────────────────────────────────── */
function HeroIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
function AboutIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
    </svg>
  );
}
function ResidentsIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function OwnersIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function ReviewsIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function FooterIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function UnitsIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

import type { ReactElement } from "react";

const SECTIONS: { id: AdminSection; label: string; sublabel: string; Icon: () => ReactElement }[] = [
  { id: "hero", label: "Hero", sublabel: "Background & headings", Icon: HeroIcon },
  { id: "about", label: "About", sublabel: "Text, images & stats", Icon: AboutIcon },
  { id: "residents", label: "Residents", sublabel: "Chapter & services", Icon: ResidentsIcon },
  { id: "owners", label: "Owners", sublabel: "Chapter & services", Icon: OwnersIcon },
  { id: "reviews", label: "Reviews", sublabel: "Manage testimonials", Icon: ReviewsIcon },
  { id: "footer", label: "Footer", sublabel: "Social & contact", Icon: FooterIcon },
  { id: "units", label: "Units", sublabel: "Listings & details", Icon: UnitsIcon },
];

interface SidebarProps {
  activeSection: AdminSection;
  onSelect: (section: AdminSection) => void;
  mobileOpen: boolean;
}

export default function Sidebar({ activeSection, onSelect, mobileOpen }: SidebarProps) {
  return (
    <aside
      style={{
        width: 240,
        flexShrink: 0,
        background: "#060f1e",
        borderRight: "1px solid #1a2e4a",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        zIndex: 50,
        transition: "transform 0.3s ease",
      }}
      className={mobileOpen ? "admin-sidebar-open" : "admin-sidebar"}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid #1a2e4a",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 4,
          }}
        >
          {/* Gold dot */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#C5A021",
              boxShadow: "0 0 8px rgba(197,160,33,0.6)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 900,
              letterSpacing: 3,
              color: "#C5A021",
              textTransform: "uppercase",
            }}
          >
            PNE Admin
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            color: "#334155",
            paddingLeft: 18,
          }}
        >
          Content Management
        </p>
      </div>

      {/* Section label */}
      <div
        style={{
          padding: "14px 20px 8px",
          fontSize: "0.65rem",
          letterSpacing: 2,
          color: "#334155",
          fontWeight: 700,
          textTransform: "uppercase",
          flexShrink: 0,
        }}
      >
        Sections
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "0 10px 16px" }}>
        {SECTIONS.map(({ id, label, sublabel, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: isActive ? "rgba(197,160,33,0.12)" : "transparent",
                color: isActive ? "#C5A021" : "#64748b",
                textAlign: "left",
                marginBottom: 2,
                transition: "all 0.18s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(197,160,33,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
                }
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  width: 3,
                  height: 32,
                  borderRadius: 2,
                  background: isActive ? "#C5A021" : "transparent",
                  flexShrink: 0,
                  transition: "background 0.18s",
                }}
              />
              {/* Icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: isActive ? "rgba(197,160,33,0.15)" : "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.18s",
                }}
              >
                <Icon />
              </div>
              {/* Text */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 800 : 500,
                    letterSpacing: 0.2,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: isActive ? "rgba(197,160,33,0.6)" : "#334155",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: 1.3,
                    marginTop: 1,
                  }}
                >
                  {sublabel}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "14px 20px",
          borderTop: "1px solid #1a2e4a",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: "0.68rem",
            color: "#1e3452",
            textAlign: "center",
            letterSpacing: 0.5,
          }}
        >
          v1.0 · Static Preview Mode
        </div>
      </div>

      <style>{`
        .admin-sidebar {
          transform: translateX(0);
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed !important;
            transform: translateX(-100%);
          }
          .admin-sidebar-open {
            position: fixed !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </aside>
  );
}
