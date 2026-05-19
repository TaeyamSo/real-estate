"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Residents", href: "#residents" },
  { label: "Owners", href: "#owners" },
  { label: "Available Units", href: "#units" },
  { label: "Reviews", href: "#reviews" },
];

interface NavbarProps {
  onContactOpen: (type: "tenant" | "owner") => void;
}

export default function Navbar({ onContactOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_HEIGHT = 83;

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b-[3px]"
      style={{
        background: "rgba(0,33,71,0.98)",
        borderColor: "#C5A021",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        transition: "box-shadow 0.3s",
      }}
    >
      <div className="flex items-center justify-between px-[5%] py-[15px]">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-[15px] cursor-pointer bg-transparent border-none"
        >
          <div
            className="rounded-full border-2 overflow-hidden flex-shrink-0"
            style={{
              width: 50,
              height: 50,
              borderColor: "#C5A021",
              background: "white",
            }}
          >
            <Image
              src="/logo.png"
              alt="PNE Property Management Logo"
              width={50}
              height={50}
              className="object-contain w-full h-full"
            />
          </div>
          <span
            className="font-black tracking-[2px] text-[1.1rem] uppercase"
            style={{ color: "#C5A021" }}
          >
            PNE Property Management
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-white font-bold text-[0.75rem] uppercase tracking-wide ml-[18px] cursor-pointer bg-transparent border-none transition-colors duration-200 hover:text-[#C5A021]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onContactOpen("tenant")}
            className="ml-[22px] font-black text-[0.75rem] uppercase tracking-[1px] px-5 py-[10px] rounded-full cursor-pointer transition-all duration-200 hover:bg-white"
            style={{
              background: "#C5A021",
              color: "#002147",
            }}
          >
            Contact
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] cursor-pointer bg-transparent border-none p-2"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className="block rounded-sm transition-all duration-300"
            style={{
              width: 26,
              height: 2,
              background: "#C5A021",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            className="block rounded-sm transition-all duration-300"
            style={{
              width: 26,
              height: 2,
              background: "#C5A021",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block rounded-sm transition-all duration-300"
            style={{
              width: 26,
              height: 2,
              background: "#C5A021",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? "400px" : "0px",
          borderBottom: menuOpen ? "3px solid #C5A021" : "none",
          background: "rgba(0,33,71,0.98)",
        }}
      >
        <div className="flex flex-col px-[5%] py-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-white font-bold text-[0.85rem] uppercase py-[14px] text-left cursor-pointer bg-transparent border-none border-b border-white/10 last:border-b-0 transition-colors hover:text-[#C5A021]"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onContactOpen("tenant");
            }}
            className="mt-4 mb-2 font-black text-[0.85rem] uppercase tracking-[1px] px-5 py-3 rounded-full cursor-pointer"
            style={{ background: "#C5A021", color: "#002147" }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
}
