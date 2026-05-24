"use client";

interface SectionShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSave: () => void;
  hasErrors?: boolean;
  icon?: React.ReactNode;
}

function SaveIcon() {
  return (
    <svg width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export default function SectionShell({
  title,
  description,
  children,
  onSave,
  hasErrors,
  icon,
}: SectionShellProps) {
  return (
    <div>
      {/* Section header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          {icon && (
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "rgba(197,160,33,0.1)",
                border: "1px solid rgba(197,160,33,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C5A021",
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
          )}
          <h2
            style={{
              margin: 0,
              fontSize: "1.3rem",
              fontWeight: 900,
              color: "#e2e8f0",
              letterSpacing: -0.3,
            }}
          >
            {title}
          </h2>
        </div>
        {description && (
          <p
            style={{
              margin: 0,
              fontSize: "0.83rem",
              color: "#64748b",
              lineHeight: 1.55,
              paddingLeft: icon ? 50 : 0,
            }}
          >
            {description}
          </p>
        )}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, #1a2e4a, transparent)",
            marginTop: 16,
          }}
        />
      </div>

      {/* Content */}
      {children}

      {/* Save button */}
      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: "1px solid #1a2e4a",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        {hasErrors ? (
          <p
            style={{
              margin: 0,
              fontSize: "0.78rem",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width={13} height={13} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Fix validation errors before saving
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#334155" }}>
            Changes will be applied once connected to backend
          </p>
        )}

        <button
          type="button"
          onClick={onSave}
          disabled={hasErrors}
          style={{
            background: hasErrors
              ? "#1a2e4a"
              : "linear-gradient(135deg, #C5A021, #d4ae30)",
            border: "none",
            borderRadius: 10,
            padding: "11px 24px",
            color: hasErrors ? "#64748b" : "#002147",
            fontSize: "0.88rem",
            fontWeight: 900,
            letterSpacing: 0.4,
            cursor: hasErrors ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (!hasErrors) {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(197,160,33,0.35)";
            }
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          <SaveIcon />
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* ── Shared card wrapper ─────────────────────────────────── */
export function FormCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#0a1628",
        border: "1px solid #1a2e4a",
        borderRadius: 12,
        padding: "22px 24px",
        marginBottom: 18,
      }}
    >
      {title && (
        <h3
          style={{
            margin: "0 0 18px",
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: 2,
            color: "#C5A021",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
