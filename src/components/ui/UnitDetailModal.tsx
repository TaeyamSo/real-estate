"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bed, Bath, Maximize2, MapPin, Calendar, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import type { Unit } from "@/types";
import ImageLightbox from "@/components/ui/ImageLightbox";

interface UnitDetailModalProps {
  unit: Unit | null;
  onClose: () => void;
}

/* ── Same stagger pattern as Modal.tsx ─────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" as const } },
};

const SPECS = (unit: Unit) => [
  { Icon: Bed,       label: `${unit.beds} Bd` },
  { Icon: Bath,      label: `${unit.baths} Ba` },
  { Icon: Maximize2, label: `${unit.sqft.toLocaleString()} sf` },
  { Icon: Calendar,  label: unit.available },
];

export default function UnitDetailModal({ unit, onClose }: UnitDetailModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const open = unit !== null;
  const images = unit?.images?.length ? unit.images : unit?.imageUrl ? [unit.imageUrl] : [];

  useEffect(() => {
    setCarouselIndex(0);
  }, [unit?.id]);

  const prevImage = () =>
    setCarouselIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () =>
    setCarouselIndex((i) => (i + 1) % images.length);

  return (
    <>
      <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-2000 flex items-center justify-center p-4"
            style={{ background: "rgba(0,13,28,0.82)", backdropFilter: "blur(8px)" }}
          >
            <Dialog.Content
              className="relative w-full"
              style={{ maxWidth: 500, outline: "none" }}
              aria-describedby={undefined}
            >
              <Dialog.Title className="sr-only">
                {unit ? `${unit.address} — $${unit.price.toLocaleString()}/mo` : "Unit Details"}
              </Dialog.Title>

              {/* ── Animated modal panel ── */}
              <motion.div
                className="relative w-full rounded-[20px] flex flex-col overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #002147 0%, #001433 100%)",
                  borderTop: "4px solid #C5A021",
                  maxHeight: "90vh",
                }}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                {/* Close */}
                <Dialog.Close asChild>
                  <button
                    className="absolute top-3 right-3 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 hover:text-[#C5A021] z-10"
                    style={{
                      width: 32,
                      height: 32,
                      background: "rgba(0,0,0,0.35)",
                      border: "none",
                      color: "rgba(255,255,255,0.65)",
                    }}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </Dialog.Close>

                {unit && (
                  <>
                    {/* ── [A] Image Carousel ── */}
                    <div
                      className="relative shrink-0 cursor-pointer overflow-hidden"
                      style={{ height: 240 }}
                      onClick={() => {
                        setLightboxIndex(carouselIndex);
                        setLightboxOpen(true);
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={carouselIndex}
                          className="absolute inset-0"
                          initial={{ opacity: 0, scale: 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <Image
                            src={images[carouselIndex] ?? ""}
                            alt={`${unit.address} photo ${carouselIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="500px"
                            priority
                          />
                          {/* bottom fade to match modal bg */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to bottom, transparent 50%, rgba(0,20,51,0.75) 100%)",
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Prev */}
                      {images.length > 1 && (
                        <button
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:bg-white/20 z-10"
                          style={{
                            width: 34,
                            height: 34,
                            background: "rgba(0,0,0,0.45)",
                            border: "none",
                            color: "white",
                            backdropFilter: "blur(4px)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage();
                          }}
                          aria-label="Previous photo"
                        >
                          <ChevronLeft size={17} />
                        </button>
                      )}

                      {/* Next */}
                      {images.length > 1 && (
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:bg-white/20 z-10"
                          style={{
                            width: 34,
                            height: 34,
                            background: "rgba(0,0,0,0.45)",
                            border: "none",
                            color: "white",
                            backdropFilter: "blur(4px)",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          aria-label="Next photo"
                        >
                          <ChevronRight size={17} />
                        </button>
                      )}

                      {/* Counter badge */}
                      <div
                        className="absolute bottom-3 right-3 text-[0.7rem] font-black tracking-[2px] px-3 py-1 rounded-full z-10"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          color: "white",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {carouselIndex + 1} / {images.length}
                      </div>

                      {/* Dot indicators */}
                      {images.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.25 z-10">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndex(i);
                              }}
                              className="rounded-full cursor-pointer transition-all duration-200"
                              style={{
                                width: i === carouselIndex ? 20 : 7,
                                height: 7,
                                background:
                                  i === carouselIndex
                                    ? "#C5A021"
                                    : "rgba(255,255,255,0.45)",
                                border: "none",
                              }}
                              aria-label={`Photo ${i + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ── [B] Details — stagger-animated, only description scrolls ── */}
                    <motion.div
                      className="flex flex-col px-6 py-5 flex-1 overflow-hidden"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Status badge */}
                      <motion.div variants={itemVariants} className="mb-3">
                        <span
                          className="inline-block text-[0.65rem] font-black tracking-[3px] uppercase px-3 py-1.25 rounded-full"
                          style={{ background: "#C5A021", color: "#002147" }}
                        >
                          {unit.status}
                        </span>
                      </motion.div>

                      {/* Price */}
                      <motion.div variants={itemVariants} className="mb-1 leading-none">
                        <span className="font-black text-[1.9rem] leading-none text-white">
                          ${unit.price.toLocaleString()}
                        </span>
                        <span
                          className="text-[0.95rem] font-bold ml-1"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          / mo
                        </span>
                      </motion.div>

                      {/* Address */}
                      <motion.div
                        variants={itemVariants}
                        className="flex items-start gap-2 mt-2 mb-4"
                      >
                        <MapPin
                          size={13}
                          className="mt-0.75 shrink-0"
                          style={{ color: "#C5A021" }}
                        />
                        <span
                          className="text-[0.83rem]"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          {unit.address}
                        </span>
                      </motion.div>

                      {/* Spec pills — icons spring-animate like tab icons in Modal.tsx */}
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap gap-1.75 mb-4"
                      >
                        {SPECS(unit).map(({ Icon, label }, i) => (
                          <div
                            key={label}
                            className="flex items-center gap-1.5 text-[0.72rem] font-bold px-3 py-1.5 rounded-lg"
                            style={{
                              background: "rgba(255,255,255,0.08)",
                              color: "white",
                              border: "1.5px solid rgba(255,255,255,0.16)",
                            }}
                          >
                            <motion.span
                              key={`${unit.id}-icon-${i}`}
                              initial={{ scale: 0.4, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 450,
                                damping: 16,
                                delay: 0.18 + i * 0.06,
                              }}
                              className="flex items-center"
                              style={{ color: "#C5A021" }}
                            >
                              <Icon size={12} />
                            </motion.span>
                            {label}
                          </div>
                        ))}
                      </motion.div>

                      {/* Divider */}
                      <motion.div
                        variants={itemVariants}
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.12)",
                          marginBottom: 14,
                          flexShrink: 0,
                        }}
                      />

                      {/* Description — ONLY this box scrolls */}
                      {unit.description && (
                        <motion.div variants={itemVariants} className="mb-3">
                          <p
                            className="text-[0.72rem] font-black uppercase tracking-[2px] mb-2"
                            style={{ color: "#C5A021" }}
                          >
                            About this unit
                          </p>
                          <div
                            style={{
                              maxHeight: 90,
                              overflowY: "auto",
                              paddingRight: 4,
                            }}
                          >
                            <p
                              className="text-[0.82rem] leading-relaxed"
                              style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}
                            >
                              {unit.description}
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* Unit meta */}
                      <motion.div variants={itemVariants}>
                        <span
                          className="text-[0.7rem]"
                          style={{ color: "rgba(255,255,255,0.28)" }}
                        >
                          Unit #{unit.id} · {unit.city}
                        </span>
                      </motion.div>
                    </motion.div>

                    {/* ── [C] CTA footer — always pinned ── */}
                    <div
                      className="flex flex-col sm:flex-row gap-3 px-6 py-4 shrink-0"
                      style={{
                        background: "#001835",
                        borderTop: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <a
                        href={unit.listingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 flex-1 font-black text-[0.82rem] uppercase tracking-[1.5px] py-2.75 rounded-xl transition-all duration-200 no-underline"
                        style={{ background: "#C5A021", color: "#002147" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "white";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "#C5A021";
                        }}
                      >
                        Apply Now <ExternalLink size={13} />
                      </a>
                      <Dialog.Close asChild>
                        <button
                          className="flex-1 font-black text-[0.82rem] uppercase tracking-[1.5px] py-2.75 rounded-xl cursor-pointer transition-all duration-200"
                          style={{
                            background: "transparent",
                            border: "2px solid rgba(255,255,255,0.2)",
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "inherit",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "white";
                            (e.currentTarget as HTMLButtonElement).style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor =
                              "rgba(255,255,255,0.2)";
                            (e.currentTarget as HTMLButtonElement).style.color =
                              "rgba(255,255,255,0.7)";
                          }}
                        >
                          Close
                        </button>
                      </Dialog.Close>
                    </div>
                  </>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Lightbox — outside Dialog so it sits above */}
      {lightboxOpen && images.length > 0 && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}
