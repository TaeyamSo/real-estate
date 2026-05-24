"use client";

import { useState, useEffect, useCallback } from "react";
import PasswordGate from "./PasswordGate";
import Sidebar from "./Sidebar";
import Toast, { useToast } from "./Toast";
import HeroAdmin from "./sections/HeroAdmin";
import AboutAdmin from "./sections/AboutAdmin";
import ResidentsAdmin from "./sections/ResidentsAdmin";
import OwnersAdmin from "./sections/OwnersAdmin";
import ReviewsAdmin from "./sections/ReviewsAdmin";
import FooterAdmin from "./sections/FooterAdmin";
import UnitsAdmin from "./sections/UnitsAdmin";

export type AdminSection =
  | "hero"
  | "about"
  | "residents"
  | "owners"
  | "reviews"
  | "footer"
  | "units";

const SECTION_LABELS: Record<AdminSection, string> = {
  hero: "Hero Section",
  about: "About Section",
  residents: "Residents",
  owners: "Owners",
  reviews: "Reviews",
  footer: "Footer & Social Media",
  units: "Available Units",
};

function DownloadIcon() {
  return (
    <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

export default function AdminApp() {
  const [hydrated, setHydrated] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    setHydrated(true);
    if (sessionStorage.getItem("pne_admin_auth") === "true") {
      setAuthed(true);
    }
  }, []);

  const handleLogin = useCallback(() => {
    sessionStorage.setItem("pne_admin_auth", "true");
    setAuthed(true);
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("pne_admin_auth");
    setAuthed(false);
  }, []);

  const handleSectionSave = useCallback(
    (sectionName: string) => {
      addToast("success", `${sectionName} — changes saved. Connect backend to persist.`);
    },
    [addToast]
  );

  const handleExport = useCallback(() => {
    addToast("info", "Export will download a JSON file once wired to backend.");
  }, [addToast]);

  if (!hydrated) return null;
  if (!authed) return <PasswordGate onLogin={handleLogin} />;

  const label = SECTION_LABELS[activeSection];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: "#050e1a",
        color: "#e2e8f0",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 40,
          }}
        />
      )}

      <Sidebar
        activeSection={activeSection}
        onSelect={(s) => {
          setActiveSection(s);
          setSidebarOpen(false);
        }}
        mobileOpen={sidebarOpen}
      />

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Top bar ── */}
        <header
          style={{
            flexShrink: 0,
            height: 64,
            background: "#060f1e",
            borderBottom: "1px solid #1a2e4a",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            gap: 12,
            zIndex: 10,
          }}
        >
          {/* Left: hamburger + breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="admin-menu-btn"
              style={{
                background: "none",
                border: "1px solid #1a2e4a",
                borderRadius: 8,
                padding: "6px 8px",
                cursor: "pointer",
                color: "#94a3b8",
                display: "none",
                alignItems: "center",
                transition: "all 0.2s",
              }}
            >
              <MenuIcon />
            </button>
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#C5A021",
                  letterSpacing: 2,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Admin
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 900,
                  color: "#e2e8f0",
                  lineHeight: 1.1,
                }}
              >
                {label}
              </div>
            </div>
          </div>

          {/* Right: badges + buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: 1,
                fontWeight: 800,
                color: "#C5A021",
                background: "rgba(197,160,33,0.1)",
                border: "1px solid rgba(197,160,33,0.25)",
                borderRadius: 20,
                padding: "4px 10px",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Static Preview
            </span>

            <button
              onClick={handleExport}
              title="Export JSON (backend required)"
              style={{
                background: "transparent",
                border: "1px solid #1a2e4a",
                borderRadius: 8,
                padding: "7px 13px",
                color: "#94a3b8",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#C5A021";
                (e.currentTarget as HTMLButtonElement).style.color = "#C5A021";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a2e4a";
                (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
              }}
            >
              <DownloadIcon />
              <span className="admin-export-label">Export JSON</span>
            </button>

            <button
              onClick={handleLogout}
              title="Sign out"
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 8,
                padding: "7px 13px",
                color: "#ef4444",
                fontSize: "0.8rem",
                cursor: "pointer",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)";
              }}
            >
              <LogoutIcon />
              <span className="admin-logout-label">Sign Out</span>
            </button>
          </div>
        </header>

        {/* ── Scrollable content ── */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px 24px",
          }}
        >
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            {activeSection === "hero" && (
              <HeroAdmin onSave={() => handleSectionSave("Hero")} />
            )}
            {activeSection === "about" && (
              <AboutAdmin onSave={() => handleSectionSave("About")} />
            )}
            {activeSection === "residents" && (
              <ResidentsAdmin onSave={() => handleSectionSave("Residents")} />
            )}
            {activeSection === "owners" && (
              <OwnersAdmin onSave={() => handleSectionSave("Owners")} />
            )}
            {activeSection === "reviews" && (
              <ReviewsAdmin onSave={() => handleSectionSave("Reviews")} />
            )}
            {activeSection === "footer" && (
              <FooterAdmin onSave={() => handleSectionSave("Footer & Social")} />
            )}
            {activeSection === "units" && (
              <UnitsAdmin onSave={() => handleSectionSave("Units")} />
            )}
          </div>
        </main>
      </div>

      <Toast messages={toasts} onRemove={removeToast} />

      <style>{`
        @media (max-width: 768px) {
          .admin-menu-btn { display: flex !important; }
          .admin-export-label { display: none; }
          .admin-logout-label { display: none; }
        }
      `}</style>
    </div>
  );
}
