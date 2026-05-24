"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Lock icon ───────────────────────────────────────────── */
function LockIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ── Eye icons ───────────────────────────────────────────── */
function EyeIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const ADMIN_PASSWORD = "123";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 30;
const LOCKOUT_KEY = "pne_admin_lockout";
const ATTEMPTS_KEY = "pne_admin_attempts";

interface PasswordGateProps {
  onLogin: () => void;
}

export default function PasswordGate({ onLogin }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  /* ── Load lockout state from localStorage on mount ── */
  useEffect(() => {
    const stored = localStorage.getItem(LOCKOUT_KEY);
    const storedAttempts = localStorage.getItem(ATTEMPTS_KEY);
    if (stored) {
      const until = parseInt(stored, 10);
      if (until > Date.now()) {
        setLockedUntil(until);
      } else {
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
      }
    }
    if (storedAttempts) setAttempts(parseInt(storedAttempts, 10));
  }, []);

  /* ── Countdown timer when locked ── */
  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const diff = lockedUntil - Date.now();
      if (diff <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        localStorage.removeItem(LOCKOUT_KEY);
        localStorage.removeItem(ATTEMPTS_KEY);
        setTimeLeft("");
        clearInterval(interval);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}:${secs.toString().padStart(2, "0")}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockedUntil && lockedUntil > Date.now()) return;

    if (password === ADMIN_PASSWORD) {
      localStorage.removeItem(LOCKOUT_KEY);
      localStorage.removeItem(ATTEMPTS_KEY);
      onLogin();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem(ATTEMPTS_KEY, String(newAttempts));
      triggerShake();

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockUntil = Date.now() + LOCKOUT_MINUTES * 60 * 1000;
        setLockedUntil(lockUntil);
        localStorage.setItem(LOCKOUT_KEY, String(lockUntil));
        setError(`Too many failed attempts. Access locked for ${LOCKOUT_MINUTES} minutes.`);
      } else {
        const remaining = MAX_ATTEMPTS - newAttempts;
        setError(`Incorrect password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`);
      }
      setPassword("");
    }
  };

  const isLocked = lockedUntil !== null && lockedUntil > Date.now();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050e1a 0%, #001533 50%, #050e1a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
        padding: 24,
      }}
    >
      {/* Decorative background grid */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(197,160,33,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,33,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          background: "rgba(10,22,40,0.95)",
          border: "1px solid #1a2e4a",
          borderTop: "3px solid #C5A021",
          borderRadius: 16,
          padding: "48px 40px 40px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(197,160,33,0.05)",
          animation: shake ? "adminShake 0.55s ease" : undefined,
        }}
      >
        {/* Logo / icon */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: isLocked
                ? "rgba(239,68,68,0.1)"
                : "rgba(197,160,33,0.1)",
              border: `2px solid ${isLocked ? "rgba(239,68,68,0.4)" : "rgba(197,160,33,0.4)"}`,
              color: isLocked ? "#ef4444" : "#C5A021",
              marginBottom: 20,
              transition: "all 0.4s ease",
            }}
          >
            <LockIcon size={30} />
          </div>

          <div
            style={{
              fontSize: "0.7rem",
              letterSpacing: 4,
              color: "#C5A021",
              fontWeight: 900,
              marginBottom: 8,
              textTransform: "uppercase",
            }}
          >
            PNE Property Management
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#e2e8f0",
              letterSpacing: -0.5,
            }}
          >
            Admin Dashboard
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "0.85rem",
              color: "#64748b",
            }}
          >
            Restricted access — authorized personnel only
          </p>
        </div>

        {/* Lockout banner */}
        {isLocked && (
          <div
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "#ef4444", fontWeight: 700, marginBottom: 4 }}>
              Account Temporarily Locked
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              Too many failed attempts. Try again in{" "}
              <span style={{ color: "#ef4444", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                {timeLeft}
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="admin-password"
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: 1.5,
                color: "#94a3b8",
                textTransform: "uppercase",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLocked}
                placeholder="Enter admin password"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  background: isLocked ? "rgba(10,22,40,0.5)" : "#0d1e35",
                  border: `1px solid ${error ? "#ef4444" : "#1e3452"}`,
                  borderRadius: 10,
                  padding: "12px 46px 12px 16px",
                  color: isLocked ? "#64748b" : "#e2e8f0",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                  cursor: isLocked ? "not-allowed" : "text",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "#C5A021";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = error ? "#ef4444" : "#1e3452";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLocked}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: isLocked ? "not-allowed" : "pointer",
                  color: "#64748b",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => { if (!isLocked) (e.currentTarget as HTMLButtonElement).style.color = "#C5A021"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#64748b"; }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Error message */}
            {error && !isLocked && (
              <p
                style={{
                  margin: "8px 0 0",
                  fontSize: "0.78rem",
                  color: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <svg width={13} height={13} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLocked || !password}
            style={{
              width: "100%",
              background: isLocked || !password
                ? "#1a2e4a"
                : "linear-gradient(135deg, #C5A021, #d4ae30)",
              border: "none",
              borderRadius: 10,
              padding: "13px 24px",
              color: isLocked || !password ? "#64748b" : "#002147",
              fontSize: "0.9rem",
              fontWeight: 900,
              letterSpacing: 0.5,
              cursor: isLocked || !password ? "not-allowed" : "pointer",
              transition: "all 0.25s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={(e) => {
              if (!isLocked && password) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(197,160,33,0.4)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <LockIcon size={16} />
            {isLocked ? "Access Locked" : "Unlock Dashboard"}
          </button>
        </form>

        <p
          style={{
            marginTop: 24,
            textAlign: "center",
            fontSize: "0.72rem",
            color: "#334155",
          }}
        >
          This page is not indexed or linked from the public site.
        </p>
      </div>

      <style>{`
        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  );
}
