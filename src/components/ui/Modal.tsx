"use client";

import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Building2, CheckCircle2, AlertCircle, Send } from "lucide-react";

function FacebookIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
function XSocialIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import type { ContactFormData } from "@/types";

interface ModalProps {
  open: boolean;
  defaultType: "tenant" | "owner";
  onClose: () => void;
}

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

type FormField = keyof typeof EMPTY_FORM;

function validate(name: FormField, value: string): string {
  switch (name) {
    case "firstName":
      if (!value.trim()) return "We'd love to know your first name!";
      if (value.trim().length < 2) return "At least 2 characters, please.";
      break;
    case "lastName":
      if (!value.trim()) return "Don't forget your last name.";
      if (value.trim().length < 2) return "At least 2 characters, please.";
      break;
    case "email":
      if (!value.trim()) return "Your email address is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "That email doesn't look quite right.";
      break;
    case "phone":
      if (value.trim() && !/^\+?[\d\s\-().]{7,15}$/.test(value.trim()))
        return "Check that phone — something looks off.";
      break;
    case "message":
      if (!value.trim()) return "Tell us a little about what you need.";
      if (value.trim().length < 10) return "Tell us a bit more (at least 10 chars).";
      break;
  }
  return "";
}

/* ── Sparkle positions for success animation ──────────────── */
const SPARKLE_POSITIONS = [
  { x: -60, y: -54 },
  { x: 60, y: -50 },
  { x: -52, y: 58 },
  { x: 58, y: 52 },
];

/* ── Field stagger variants ───────────────────────────────── */
const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" as const } },
};

const formVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

/* ── Success celebration screen ───────────────────────────── */
function SuccessScreen() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mb-5">
        {SPARKLE_POSITIONS.map((pos, i) => (
          <motion.span
            key={i}
            className="absolute text-[#C5A021] text-lg select-none pointer-events-none"
            style={{ left: "50%", top: "50%", display: "block" }}
            initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 0 }}
            animate={{
              x: `calc(-50% + ${pos.x}px)`,
              y: `calc(-50% + ${pos.y}px)`,
              scale: [0, 1.4, 0.9],
              opacity: [0, 1, 0],
            }}
            transition={{ delay: 0.45 + i * 0.1, duration: 0.65, ease: "easeOut" }}
          >
            ✦
          </motion.span>
        ))}

        <svg width={84} height={84} viewBox="0 0 84 84" fill="none">
          <motion.circle
            cx={42}
            cy={42}
            r={34}
            stroke="#C5A021"
            strokeWidth={4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
          <motion.path
            d="M 24 42 L 36 55 L 61 28"
            stroke="#C5A021"
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
          />
        </svg>
      </div>

      <motion.h3
        className="font-black text-[1.2rem] text-white mb-2"
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
      >
        You&apos;re All Set! 🎉
      </motion.h3>
      <motion.p
        className="text-[0.83rem]"
        style={{ color: "rgba(255,255,255,0.6)" }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.4, ease: "easeOut" }}
      >
        We&apos;ll get back to you within one business day.
      </motion.p>
    </motion.div>
  );
}

/* ── Animated loading dots ─────────────────────────────────── */
function LoadingDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-[#002147]"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            delay: i * 0.14,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

/* ── Main Modal ────────────────────────────────────────────── */
export default function Modal({ open, defaultType, onClose }: ModalProps) {
  const [type, setType] = useState<"tenant" | "owner">(defaultType);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  const [focusedField, setFocusedField] = useState<FormField | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setType(defaultType);
      setForm(EMPTY_FORM);
      setErrors({});
      setTouched({});
      setFocusedField(null);
      setSubmitted(false);
      setIsSubmitting(false);
    }
  }, [open, defaultType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setFocusedField(null);
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Partial<Record<FormField, boolean>> = {};
    const allErrors: Partial<Record<FormField, string>> = {};
    (Object.keys(EMPTY_FORM) as FormField[]).forEach((f) => {
      allTouched[f] = true;
      allErrors[f] = validate(f, form[f]);
    });
    setTouched(allTouched);
    setErrors(allErrors);
    if (Object.values(allErrors).some((err) => err !== "")) return;

    setIsSubmitting(true);
    const data: ContactFormData = { type, ...form };
    // Stub — replace with real API call when backend is ready
    console.log("Contact form submission:", data);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  /* ── Style helpers ───────────────────────── */
  const getBorderColor = (field: FormField): string => {
    if (focusedField === field) return "#C5A021";
    if (!touched[field]) return "rgba(255,255,255,0.18)";
    if (errors[field]) return "#f87171";
    if (field === "phone" && !form.phone.trim()) return "rgba(255,255,255,0.18)";
    return "#22c55e";
  };

  const showValidIcon = (field: FormField): boolean => {
    if (!touched[field] || !!errors[field]) return false;
    if (field === "phone" && !form.phone.trim()) return false;
    return true;
  };

  const inputBase: React.CSSProperties = {
    borderRadius: 10,
    fontFamily: "inherit",
    fontSize: "0.84rem",
    color: "white",
    background: "rgba(255,255,255,0.08)",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const fieldStyle = (field: FormField): React.CSSProperties => ({
    ...inputBase,
    padding: "9px 36px 9px 12px",
    border: `1.5px solid ${getBorderColor(field)}`,
  });

  const textareaFieldStyle = (field: FormField): React.CSSProperties => ({
    ...inputBase,
    padding: "9px 12px",
    border: `1.5px solid ${getBorderColor(field)}`,
    resize: "none",
  });

  const fieldIcon = (field: FormField): React.ReactNode => {
    if (!touched[field]) return null;
    if (errors[field]) return <AlertCircle size={13} color="#f87171" />;
    if (showValidIcon(field)) return <CheckCircle2 size={13} color="#22c55e" />;
    return null;
  };

  const errMsg = (field: FormField): React.ReactNode =>
    touched[field] && errors[field] ? (
      <motion.p
        key={`${field}-err`}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="text-[0.69rem] pl-1 leading-none"
        style={{ color: "#fca5a5" }}
      >
        {errors[field]}
      </motion.p>
    ) : null;

  const renderInput = (field: FormField, placeholder: string, inputType?: string) => {
    const icon = fieldIcon(field);
    return (
      <div className="flex flex-col gap-0.75">
        <div className="relative">
          <input
            name={field}
            type={inputType ?? "text"}
            placeholder={placeholder}
            value={form[field]}
            onChange={handleChange}
            onFocus={() => setFocusedField(field)}
            onBlur={handleBlur}
            style={fieldStyle(field)}
          />
          {icon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              {icon}
            </span>
          )}
        </div>
        <AnimatePresence>{errMsg(field)}</AnimatePresence>
      </div>
    );
  };

  /* ── Render ──────────────────────────────── */
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-2000 flex items-center justify-center p-4"
          style={{ background: "rgba(0,13,28,0.82)", backdropFilter: "blur(8px)" }}
        >
          <Dialog.Content
            className="relative w-full rounded-[20px]"
            style={{
              background: "linear-gradient(160deg, #002147 0%, #001433 100%)",
              maxWidth: 480,
              padding: "20px 24px",
              borderTop: "4px solid #C5A021",
              animation: "modalSlide 0.25s ease-out",
              overflow: "hidden",
            }}
          >
            {/* Close button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-4 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:text-[#C5A021]"
                style={{
                  width: 32,
                  height: 32,
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.65)",
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </Dialog.Close>

            {/* Badge */}
            <span
              className="inline-block text-[0.65rem] font-black tracking-[3px] uppercase px-4 py-1.25 rounded-full mb-3"
              style={{ background: "#C5A021", color: "#002147" }}
            >
              Contact Us
            </span>

            {/* Title — updates with active tab */}
            <Dialog.Title className="font-black text-[1.3rem] leading-tight mb-4 text-white">
              {type === "tenant" ? "Find Your Next Home" : "List Your Property"}
            </Dialog.Title>

            <AnimatePresence mode="wait">
              {submitted ? (
                <SuccessScreen key="success" />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* ── Tab toggle ──────────────────── */}
                  <div
                    className="grid grid-cols-2 rounded-xl p-1.25 mb-4"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    {(["tenant", "owner"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className="flex items-center justify-center gap-1.75 py-2 px-2 rounded-[9px] font-bold text-[0.76rem] cursor-pointer transition-all duration-200 border-none"
                        style={{
                          fontFamily: "inherit",
                          background: type === t ? "#C5A021" : "transparent",
                          color: type === t ? "#002147" : "rgba(255,255,255,0.5)",
                          boxShadow:
                            type === t ? "0 3px 10px rgba(197,160,33,0.35)" : "none",
                        }}
                      >
                        {/* Icon pops + springs in when this tab becomes active */}
                        <motion.span
                          key={type === t ? `${t}-on` : `${t}-off`}
                          initial={
                            type === t
                              ? { scale: 0.45, rotate: -20 }
                              : { scale: 1, rotate: 0 }
                          }
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 450, damping: 16 }}
                          className="flex items-center"
                        >
                          {t === "tenant" ? <Home size={18} /> : <Building2 size={18} />}
                        </motion.span>
                        {t === "tenant" ? "I'm a Tenant" : "I'm a Property Owner"}
                      </button>
                    ))}
                  </div>

                  {/* ── Form ───────────────────────── */}
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={type}
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        className="flex flex-col gap-2"
                      >
                    {/* Name row */}
                    <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-2">
                      {renderInput("firstName", "First Name")}
                      {renderInput("lastName", "Last Name")}
                    </motion.div>

                    <motion.div variants={fieldVariants}>
                      {renderInput("email", "Email Address", "email")}
                    </motion.div>
                    <motion.div variants={fieldVariants}>
                      {renderInput("phone", "Phone Number (optional)", "tel")}
                    </motion.div>

                    {/* Message textarea */}
                    <motion.div variants={fieldVariants} className="flex flex-col gap-0.75">
                      <div className="relative">
                        <textarea
                          name="message"
                          placeholder={
                            type === "tenant"
                              ? "Tell us what you're looking for..."
                              : "Tell us about your property..."
                          }
                          rows={3}
                          value={form.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={handleBlur}
                          style={textareaFieldStyle("message")}
                        />
                        {fieldIcon("message") && (
                          <span className="absolute right-3 top-3 flex items-center pointer-events-none">
                            {fieldIcon("message")}
                          </span>
                        )}
                      </div>
                      <AnimatePresence>{errMsg("message")}</AnimatePresence>
                    </motion.div>

                    {/* Submit button */}
                    <motion.button
                      variants={fieldVariants}
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="flex items-center justify-center gap-2 py-2.75 px-6 rounded-xl font-black tracking-[1px] mt-1"
                      style={{
                        background: isSubmitting ? "rgba(197,160,33,0.72)" : "#C5A021",
                        color: "#002147",
                        border: "none",
                        fontFamily: "inherit",
                        fontSize: "0.88rem",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "background 0.2s",
                      }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isSubmitting ? (
                          <motion.span
                            key="sending"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2"
                          >
                            <span className="flex items-center gap-1.25">
                              <LoadingDots />
                            </span>
                            Sending
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-2"
                          >
                            <Send size={14} />
                            Send Message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <motion.div
                      variants={fieldVariants}
                      className="flex items-center justify-center gap-2 text-[0.72rem]"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      <span>We reply within one business day.</span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href="#"
                          aria-label="Facebook"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 hover:text-[#C5A021]"
                          style={{ color: "rgba(255,255,255,0.4)", lineHeight: 0 }}
                        >
                          <FacebookIcon size={12} />
                        </a>
                        <a
                          href="#"
                          aria-label="Instagram"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 hover:text-[#C5A021]"
                          style={{ color: "rgba(255,255,255,0.4)", lineHeight: 0 }}
                        >
                          <InstagramIcon size={12} />
                        </a>
                        <a
                          href="#"
                          aria-label="X (Twitter)"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-200 hover:text-[#C5A021]"
                          style={{ color: "rgba(255,255,255,0.4)", lineHeight: 0 }}
                        >
                          <XSocialIcon size={12} />
                        </a>
                      </div>
                    </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
