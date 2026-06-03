"use client";

import { motion, type Transition } from "framer-motion";
import { useRouter } from "next/navigation";

const NAV_HEIGHT = 83;

// Shared fade-up variant factory
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay } as Transition,
});

interface HeroSectionProps {
  onContactOpen: (type: "tenant" | "owner") => void;
}

export default function HeroSection({ onContactOpen }: HeroSectionProps) {
  const router = useRouter();

  const scrollTo = (href: string) => {
    if (href === "#home") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center text-center text-white relative"
      style={{
        height: "100vh",
        minHeight: 600,
        paddingTop: 83,
        overflow: "hidden",
      }}
    >
      {/* Background — fades + slight zoom on mount */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,33,71,0.55) 0%, rgba(0,13,28,0.75) 100%), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10 px-5 max-w-4xl">
        <motion.div
          {...fadeUp(0.4)}
          className="inline-block text-[0.7rem] font-black tracking-[5px] uppercase border rounded-full px-5 py-1.75 mb-4"
          style={{ color: "#C5A021", borderColor: "rgba(197,160,33,0.4)" }}
        >
          Central Ohio&apos;s Premier Property Management
        </motion.div>

        <motion.h1
          className="text-white font-black leading-[1.05] mb-2.5"
          style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-2px" }}
        >
          <motion.span className="block" {...fadeUp(0.65)}>PREMIER</motion.span>
          <motion.span className="block" style={{ color: "#C5A021" }} {...fadeUp(0.85)}>
            OVERSIGHT.
          </motion.span>
        </motion.h1>

        <motion.p
          {...fadeUp(1.05)}
          className="font-light uppercase tracking-[4px] mt-3 mb-7"
          style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}
        >
          Distinguished Management. Absolute Reliability.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 1.2 } },
          }}
        >
          {[
            { label: "View Available Units", action: () => router.push("/units"), gold: true },
            { label: "List Your Property", action: () => onContactOpen("owner"), gold: false },
            { label: "About Us", action: () => scrollTo("#about"), gold: false, outline: true },
          ].map(({ label, action, gold, outline }) => (
            <motion.button
              key={label}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              onClick={action}
              className="px-8 py-3 rounded-full font-black text-[0.8rem] tracking-[1px] uppercase cursor-pointer transition-all duration-300"
              style={
                gold
                  ? { background: "#C5A021", color: "#002147", border: "none" }
                  : outline
                  ? { background: "transparent", border: "2px solid rgba(255,255,255,0.5)", color: "white" }
                  : { background: "transparent", border: "2px solid #C5A021", color: "#C5A021" }
              }
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (gold) { el.style.background = "white"; }
                else if (outline) { el.style.borderColor = "#C5A021"; el.style.color = "#C5A021"; }
                else { el.style.background = "#C5A021"; el.style.color = "#002147"; }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                if (gold) { el.style.background = "#C5A021"; }
                else if (outline) { el.style.borderColor = "rgba(255,255,255,0.5)"; el.style.color = "white"; }
                else { el.style.background = "transparent"; el.style.color = "#C5A021"; }
              }}
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.8)}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.65rem", letterSpacing: "3px" }}
      >
        <div
          className="w-0.5 h-10 rounded-sm"
          style={{
            background: "linear-gradient(to bottom, rgba(197,160,33,0.8), transparent)",
            animation: "scrollPulse 1.8s ease-in-out infinite",
          }}
        />
        <span className="uppercase tracking-[3px]">Scroll</span>
      </motion.div>

      <style jsx>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  );
}
