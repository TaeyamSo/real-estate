"use client";

import { motion } from "framer-motion";

const wordVariant = {
  hidden: { opacity: 0, y: -45 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const lineVariant = {
  hidden: {} as Record<string, never>,
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function ResidentsChapter() {
  return (
    <div
      id="residents"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "100vh" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1.0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0,33,71,0.92) 0%, rgba(0,13,28,0.97) 100%), url('https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <motion.span
        className="absolute pointer-events-none select-none font-black leading-none text-center"
        initial={{ opacity: 0, scale: 1.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ fontSize: "clamp(8rem, 22vw, 22rem)", color: "rgba(197,160,33,0.05)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", whiteSpace: "nowrap", letterSpacing: "-5px" }}
        aria-hidden="true"
      >RESIDENTS</motion.span>
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1"
        initial={{ scaleY: 0, transformOrigin: "top" }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        style={{ background: "linear-gradient(to bottom, transparent, #C5A021, transparent)" }}
      />
      <div className="relative z-10 text-center text-white px-8 max-w-4xl">
        <motion.span
          className="inline-block text-[0.7rem] font-black tracking-[4px] uppercase px-[18px] py-[6px] rounded-full mb-8"
          style={{ background: "#C5A021", color: "#002147" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >For Residents</motion.span>
        <h2
          className="font-black leading-[1.1] mb-4 overflow-hidden"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", letterSpacing: "-2px", color: "white" }}
        >
          <motion.span className="block" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delayChildren: 0.4, staggerChildren: 0.12 }} variants={lineVariant}>
            {["Why", "Residents"].map((word) => (
              <motion.span key={word} className="inline-block mr-[0.25em]" variants={wordVariant}>{word}</motion.span>
            ))}
          </motion.span>
          <motion.span className="block" style={{ color: "#C5A021" }} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delayChildren: 0.7, staggerChildren: 0.12 }} variants={lineVariant}>
            {["Choose", "PNE"].map((word) => (
              <motion.span key={word} className="inline-block mr-[0.25em]" variants={wordVariant}>{word}</motion.span>
            ))}
          </motion.span>
        </h2>
        <motion.p
          className="leading-[1.8] max-w-2xl mx-auto text-base"
          style={{ color: "rgba(255,255,255,0.7)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          We believe a great home starts with great management. From your very
          first application to the day you move out, we&apos;re committed to making
          your experience smooth, transparent, and genuinely stress-free.
        </motion.p>
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <div className="flex flex-col items-center gap-2" style={{ color: "rgba(255,255,255,0.4)" }}>
            <div
              className="w-[2px] h-10 rounded-sm"
              style={{ background: "linear-gradient(to bottom, rgba(197,160,33,0.8), transparent)", animation: "scrollPulse 1.8s ease-in-out infinite" }}
            />
            <span className="text-[0.65rem] uppercase tracking-[3px]">Discover More</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

