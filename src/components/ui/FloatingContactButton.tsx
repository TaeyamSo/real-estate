"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/ui/Modal";

export default function FloatingContactButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  if (pathname?.startsWith("/realestateadmins")) return null;

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        aria-label="Contact us"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-150"
        style={{
          width: 56,
          height: 56,
          background: "linear-gradient(135deg, #C5A021, #F0D060, #C5A021, #A88010)",
          backgroundSize: "300% 300%",
          color: "#002147",
          border: "none",
          animation: "contactBtnShimmer 2.5s ease-in-out infinite",
          boxShadow: "0 4px 18px rgba(197,160,33,0.55), 0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </button>

      <Modal
        open={modalOpen}
        defaultType="tenant"
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
