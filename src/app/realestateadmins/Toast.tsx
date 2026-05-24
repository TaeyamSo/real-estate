"use client";

import { useState, useCallback } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

function SuccessIcon() {
  return (
    <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg width={16} height={16} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg width={16} height={16} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

const TOAST_CONFIG = {
  success: {
    border: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    iconBg: "rgba(34,197,94,0.15)",
    iconColor: "#22c55e",
    Icon: SuccessIcon,
  },
  error: {
    border: "#ef4444",
    bg: "rgba(239,68,68,0.08)",
    iconBg: "rgba(239,68,68,0.15)",
    iconColor: "#ef4444",
    Icon: ErrorIcon,
  },
  info: {
    border: "#C5A021",
    bg: "rgba(197,160,33,0.08)",
    iconBg: "rgba(197,160,33,0.15)",
    iconColor: "#C5A021",
    Icon: InfoIcon,
  },
};

const DURATION = 3800;

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) {
  const cfg = TOAST_CONFIG[toast.type];
  const { Icon } = cfg;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: "#0a1628",
        border: `1px solid ${cfg.border}`,
        borderLeft: `3px solid ${cfg.border}`,
        borderRadius: 10,
        padding: "13px 14px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        minWidth: 280,
        maxWidth: 360,
        position: "relative",
        overflow: "hidden",
        animation: "toastIn 0.3s ease forwards",
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: cfg.border,
          animation: `toastProgress ${DURATION}ms linear forwards`,
          opacity: 0.6,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: cfg.iconBg,
          color: cfg.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>

      {/* Message */}
      <div style={{ flex: 1, paddingTop: 1 }}>
        <div
          style={{
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: cfg.iconColor,
            marginBottom: 3,
          }}
        >
          {toast.type === "success" ? "Saved" : toast.type === "error" ? "Error" : "Info"}
        </div>
        <div style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.45 }}>
          {toast.message}
        </div>
      </div>

      {/* Close */}
      <button
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#334155",
          padding: 2,
          display: "flex",
          alignItems: "center",
          transition: "color 0.15s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#334155"; }}
      >
        <CloseIcon />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ messages, onRemove }: ToastContainerProps) {
  if (messages.length === 0) return null;
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "flex-end",
        }}
        aria-live="polite"
        aria-label="Notifications"
      >
        {messages.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={onRemove} />
        ))}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(24px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes toastProgress {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </>
  );
}

/* ── Hook ─────────────────────────────────────────────────── */
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (type: ToastMessage["type"], message: string) => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, DURATION + 400);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
