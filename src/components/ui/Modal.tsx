"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ContactFormData } from "@/types";

interface ModalProps {
  open: boolean;
  defaultType: "tenant" | "owner";
  onClose: () => void;
}

const EMPTY_FORM: Omit<ContactFormData, "type"> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export default function Modal({ open, defaultType, onClose }: ModalProps) {
  const [type, setType] = useState<"tenant" | "owner">(defaultType);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  // Sync tab when modal opens with a different defaultType
  useEffect(() => {
    if (open) {
      setType(defaultType);
      setForm(EMPTY_FORM);
      setSubmitted(false);
    }
  }, [open, defaultType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ContactFormData = { type, ...form };
    // Stub — replace with real API call when backend is ready
    console.log("Contact form submission:", data);
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    padding: "14px 16px",
    borderRadius: 12,
    border: "1.5px solid #e2e8f0",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    color: "#002147",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[2000] flex items-center justify-center p-5"
          style={{ background: "rgba(0,13,28,0.75)", backdropFilter: "blur(6px)" }}
        >
          <Dialog.Content
            className="relative w-full overflow-y-auto rounded-[24px]"
            style={{
              background: "white",
              maxWidth: 540,
              maxHeight: "90vh",
              padding: 40,
              borderTop: "5px solid #C5A021",
              animation: "modalSlide 0.25s ease-out",
            }}
          >
            {/* Close */}
            <Dialog.Close asChild>
              <button
                className="absolute top-[14px] right-[18px] flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:bg-[#f8fafc]"
                style={{
                  width: 36,
                  height: 36,
                  background: "transparent",
                  border: "none",
                  color: "#002147",
                }}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </Dialog.Close>

            <span
              className="inline-block text-[0.7rem] font-black tracking-[4px] uppercase px-[18px] py-[6px] rounded-full mb-[14px]"
              style={{ background: "#C5A021", color: "#002147" }}
            >
              Contact Us
            </span>

            <Dialog.Title
              className="font-black text-[1.8rem] mb-6"
              style={{ color: "#002147" }}
            >
              {type === "tenant" ? "Find Your Next Home" : "List Your Property"}
            </Dialog.Title>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-black text-xl mb-2" style={{ color: "#002147" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#64748b" }}>
                  We&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <>
                {/* Toggle tabs */}
                <div
                  className="grid grid-cols-2 rounded-xl p-1 mb-6"
                  style={{ background: "#f8fafc" }}
                >
                  {(["tenant", "owner"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className="py-3 px-[14px] rounded-[10px] font-bold text-[0.82rem] cursor-pointer transition-all duration-200 border-none"
                      style={{
                        fontFamily: "inherit",
                        background: type === t ? "#002147" : "transparent",
                        color: type === t ? "#C5A021" : "#002147",
                        boxShadow:
                          type === t ? "0 4px 12px rgba(0,33,71,0.2)" : "none",
                      }}
                    >
                      {t === "tenant" ? "I'm a Tenant" : "I'm a Property Owner"}
                    </button>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={form.firstName}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C5A021")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={form.lastName}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C5A021")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C5A021")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C5A021")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <textarea
                    name="message"
                    placeholder={
                      type === "tenant"
                        ? "Tell us about what you're looking for..."
                        : "Tell us about your property..."
                    }
                    rows={4}
                    required
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C5A021")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  />
                  <button
                    type="submit"
                    className="py-4 px-7 rounded-xl font-black tracking-[1px] cursor-pointer transition-all duration-200 mt-[6px]"
                    style={{
                      background: "#002147",
                      color: "#C5A021",
                      border: "none",
                      fontFamily: "inherit",
                      fontSize: "0.95rem",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#C5A021";
                      (e.currentTarget as HTMLButtonElement).style.color = "#002147";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#002147";
                      (e.currentTarget as HTMLButtonElement).style.color = "#C5A021";
                    }}
                  >
                    Send Message
                  </button>
                  <p className="text-center text-[0.85rem] mt-1" style={{ color: "#64748b" }}>
                    We reply within one business day.
                  </p>
                </form>
              </>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>

      <style jsx global>{`
        @keyframes modalSlide {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </Dialog.Root>
  );
}
