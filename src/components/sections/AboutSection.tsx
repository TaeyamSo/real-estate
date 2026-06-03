"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, type Transition } from "framer-motion";
import { aboutStats } from "@/data/static";
import { useCounter } from "@/hooks/useCounter";

// Parse "200+" -> { num: 200, suffix: "+" }
function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { num: parseInt(match[1]), suffix: match[2] } : { num: 0, suffix: value };
}

function StatCounter({ stat, inView }: { stat: { value: string; label: string }; inView: boolean }) {
  const { num, suffix } = parseStat(stat.value);
  const display = useCounter(num, suffix, inView);
  return (
    <div className="rounded-2xl p-3 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(197,160,33,0.25)" }}>
      <div className="text-[1.4rem] font-black leading-none" style={{ color: "#C5A021" }}>{display}</div>
      <div className="text-[0.72rem] mt-1.5 tracking-[1px] uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>{stat.label}</div>
    </div>
  );
}

// Split text into animated word spans
function WordReveal({ text, delay = 0, className, style }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.025, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

interface AboutSectionProps {
  onContactOpen: (type: "tenant" | "owner") => void;
}

export default function AboutSection({ onContactOpen }: AboutSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });

  return (
    <section
      id="about"
      className="relative overflow-hidden flex items-start md:items-center"
      style={{ background: "#002147", minHeight: "100vh", padding: "83px 5% 50px" }}
    >
      {/* Watermark */}
      <span
        className="absolute pointer-events-none select-none font-black leading-none"
        style={{ right: "-2%", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(6rem, 22vw, 22rem)", color: "rgba(255,255,255,0.03)" }}
        aria-hidden="true"
      >PNE</span>

      <div
        className="relative z-10 grid gap-10 items-center w-full max-w-325 mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))" }}
      >
        {/* Image - tilted & floating */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -60, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: -4 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } as Transition}
          style={{ animation: "float 4s ease-in-out infinite" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
            alt="PNE Property Management Team"
            width={900}
            height={380}
            className="w-full object-cover rounded-3xl h-55 md:h-95"
            loading="lazy"
          />
          {/* Gold badge - spring bounce */}
          <motion.div
            className="absolute rounded-[20px] text-center shadow-2xl"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.6 }}
            style={{ bottom: -20, right: -20, background: "#C5A021", color: "#002147", padding: "22px 28px" }}
          >
            <div className="text-[2.4rem] font-black leading-none">200+</div>
            <div className="text-[0.7rem] font-bold tracking-[2px] uppercase mt-1">Units Managed</div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="text-white">
          <motion.span
            className="inline-block text-[0.7rem] font-black tracking-[4px] uppercase px-4.5 py-1.5 rounded-full mb-5.5"
            style={{ background: "#C5A021", color: "#002147" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            About Us
          </motion.span>

          {/* Heading - word-by-word */}
          <motion.h2
            className="font-black leading-[1.1] mb-4"
            style={{ fontSize: "2rem", color: "white" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
          >
            {["Built", "on", "Trust."].map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]" variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>{w}</motion.span>
            ))}
            <br />
            {["Driven", "by", "Results."].map((w, i) => (
              <motion.span key={i} className="inline-block mr-[0.25em]" style={{ color: "#C5A021" }} variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}>{w}</motion.span>
            ))}
          </motion.h2>

          <WordReveal
            text="PNE Property Management was founded with one mission: to make property ownership and renting a seamless, stress-free experience for everyone involved. Based in Grove City, Ohio, we've spent years building deep roots across Central Ohio's communities."
            delay={0.3}
            className="leading-[1.9] mb-4.5"
            style={{ color: "rgba(255,255,255,0.75)" }}
          />
          <WordReveal
            text="We combine decades of hands-on real estate expertise with modern technology and a people-first approach — bringing the same dedication, transparency, and professionalism to every interaction."
            delay={0.5}
            className="leading-[1.9] mb-4.5"
            style={{ color: "rgba(255,255,255,0.75)" }}
          />

          {/* Stats with counters */}
          <div ref={statsRef} className="grid grid-cols-3 gap-3 my-5">
            {aboutStats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} inView={statsInView} />
            ))}
          </div>

          <motion.button
            onClick={() => onContactOpen("tenant")}
            className="px-9.5 py-3.75 rounded-full font-bold text-[0.88rem] cursor-pointer transition-all duration-300"
            style={{ border: "2px solid #C5A021", background: "transparent", color: "#C5A021" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#C5A021"; (e.currentTarget as HTMLButtonElement).style.color = "#002147"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#C5A021"; }}
          >
            Get in Touch →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
