"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ownerServices } from "@/data/static";

interface OwnersSectionProps {
  onContactOpen: (type: "tenant" | "owner") => void;
}

export default function OwnersSection({ onContactOpen }: OwnersSectionProps) {
  return (
    <section
      id="owners-detail"
      className="flex items-center"
      style={{ height: "100vh", padding: "83px 5% 50px", background: "#f8fafc", overflow: "hidden" }}
    >
      <div
        className="grid gap-8.75 items-center w-full max-w-325 mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))" }}
      >
        {/* Content â€” left on desktop */}
        <div>
          <motion.h2
            className="font-black mb-1"
            style={{ fontSize: "2rem", color: "#002147" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Owners &amp; Investors
          </motion.h2>
          <motion.p
            className="text-[1rem] mb-5"
            style={{ color: "#64748b" }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Oversight made efficient and rewarding.
          </motion.p>

          <motion.div
            className="flex flex-col gap-2.5 mb-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } } }}
          >
            {ownerServices.map((service) => (
              <motion.div
                key={service.title}
                className="flex gap-3.5 rounded-xl p-[12px_16px]"
                style={{ background: "white", borderLeft: "4px solid #002147" }}
                variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
              >
                <span className="text-2xl shrink-0">{service.icon}</span>
                <div>
                  <h4 className="m-0 mb-1 text-[1rem] font-bold" style={{ color: "#002147" }}>{service.title}</h4>
                  <p className="m-0 text-[0.88rem] leading-normal" style={{ color: "#555" }}>{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={() => onContactOpen("owner")}
            className="px-8.75 py-3.75 rounded-full font-bold text-[0.9rem] transition-all duration-300 cursor-pointer"
            style={{ border: "2px solid #002147", background: "transparent", color: "#002147" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#002147"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#002147"; }}
          >
            Contact Us for Peace of Mind
          </motion.button>
        </div>

        {/* Image â€” slides in from right with tilt */}
        <motion.div
          className="relative"
          style={{ isolation: "isolate" }}
          initial={{ opacity: 0, x: 80, rotate: 6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=800&q=80"
            alt="Property owners reviewing portfolio"
            width={800}
            height={380}
            className="w-full object-cover rounded-3xl"
            style={{ height: 380, boxShadow: "0 25px 50px rgba(0,33,71,0.15)" }}
            loading="lazy"
          />
          <motion.div
            className="absolute pointer-events-none"
            initial={{ scale: 0, transformOrigin: "bottom left" }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            style={{ inset: "15px 15px -15px -15px", border: "3px solid #C5A021", borderRadius: 30, zIndex: -1 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
