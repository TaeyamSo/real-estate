"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Residents", href: "#residents" },
  { label: "Owners", href: "#owners" },
  { label: "Available Units", href: "/units" },
  { label: "Reviews", href: "#reviews" },
];

interface NavbarProps {
  onContactOpen: (type: "tenant" | "owner") => void;
}

export default function Navbar({ onContactOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const router = useRouter();
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sectionIds = ["home", "about", "residents", "owners", "reviews"];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { threshold: 0.3 }
    );
    elements.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, [pathname]);

  const NAV_HEIGHT = 83;

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (href === "#home") {
      if (pathname !== "/") {
        router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
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
      <div className="flex items-center justify-between px-[5%] py-3.75">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#home")}
          className="flex items-center gap-3.75 cursor-pointer bg-transparent border-none"
        >
          <div
            className="rounded-full border-2 overflow-hidden shrink-0"
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
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/units"
                ? pathname === "/units"
                : pathname === "/" && activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-bold text-[0.75rem] uppercase tracking-wide ml-4.5 cursor-pointer bg-transparent border-none transition-colors duration-200 hover:text-[#C5A021]"
                style={{ color: isActive ? "#C5A021" : "white" }}
              >
                {link.label}
              </button>
            );
          })}
          <button
            onClick={() => onContactOpen("tenant")}
            className="ml-5.5 font-black text-[0.75rem] uppercase tracking-[1px] px-5 py-2.5 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150"
            style={{
              background: "linear-gradient(135deg, #C5A021, #F0D060, #C5A021, #A88010)",
              backgroundSize: "300% 300%",
              color: "#002147",
              border: "none",
              animation: "contactBtnShimmer 2.5s ease-in-out infinite",
            }}
          >
            Contact
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.25 cursor-pointer bg-transparent border-none p-2"
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
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/units"
                ? pathname === "/units"
                : pathname === "/" && activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-bold text-[0.85rem] uppercase py-3.5 text-left cursor-pointer bg-transparent border-none border-b border-white/10 last:border-b-0 transition-colors hover:text-[#C5A021]"
                style={{ color: isActive ? "#C5A021" : "white" }}
              >
                {link.label}
              </button>
            );
          })}
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
