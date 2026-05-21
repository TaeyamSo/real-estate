"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: ImageLightboxProps) {
  const prev = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const next = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  // Arrow-key navigation (Escape is handled by Radix Dialog)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.stopPropagation(); prev(); }
      if (e.key === "ArrowRight") { e.stopPropagation(); next(); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [prev, next]);

  return (
    // Using a separate Dialog.Root so Radix properly stacks this above the unit detail dialog
    // and pointer events are not blocked by the parent dialog's focus-trap.
    <Dialog.Root open onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0"
          style={{ background: "rgba(0,0,0,0.94)", backdropFilter: "blur(8px)", zIndex: 3000 }}
        />
        <Dialog.Content
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 3001, outline: "none" }}
          onOpenAutoFocus={(e) => e.preventDefault()}
          aria-describedby={undefined}
        >
          {/* Accessible title */}
          <Dialog.Title className="sr-only">
            Photo {currentIndex + 1} of {images.length}
          </Dialog.Title>

          {/* Counter */}
          <div
            className="absolute top-5 left-1/2 -translate-x-1/2 text-[0.8rem] font-black tracking-[3px] uppercase px-4 py-2 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "white", backdropFilter: "blur(6px)", zIndex: 1 }}
          >
            {currentIndex + 1} / {images.length}
          </div>

          {/* Close */}
          <Dialog.Close asChild>
            <button
              className="absolute top-5 right-5 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer"
              style={{ width: 44, height: 44, background: "rgba(255,255,255,0.1)", border: "none", color: "white", zIndex: 1 }}
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>
          </Dialog.Close>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer"
            style={{ width: 52, height: 52, background: "rgba(255,255,255,0.1)", border: "none", color: "white", zIndex: 1 }}
            onClick={prev}
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer"
            style={{ width: 52, height: 52, background: "rgba(255,255,255,0.1)", border: "none", color: "white", zIndex: 1 }}
            onClick={next}
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>

          {/* Main image with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative w-full h-full flex items-center justify-center px-16 md:px-24 py-16"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-full h-full" style={{ maxWidth: 1200, maxHeight: "80vh" }}>
                <Image
                  src={images[currentIndex]}
                  alt={`Photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 1200px"
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 1 }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => onIndexChange(i)}
                className="rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  width: i === currentIndex ? 24 : 8,
                  height: 8,
                  background: i === currentIndex ? "#C5A021" : "rgba(255,255,255,0.35)",
                  border: "none",
                }}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
