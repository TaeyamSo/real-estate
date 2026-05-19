"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ResidentsChapter from "@/components/sections/ResidentsChapter";
import ResidentsSection from "@/components/sections/ResidentsSection";
import OwnersChapter from "@/components/sections/OwnersChapter";
import OwnersSection from "@/components/sections/OwnersSection";
import UnitsSection from "@/components/sections/UnitsSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import ContactSection from "@/components/sections/ContactSection";
import Modal from "@/components/ui/Modal";
import { staticUnits, staticReviews } from "@/data/static";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"tenant" | "owner">("tenant");

  const openContact = (type: "tenant" | "owner") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <div>
      <Navbar onContactOpen={openContact} />

      <main>
        <HeroSection onContactOpen={openContact} />
        <AboutSection onContactOpen={openContact} />
        <ResidentsChapter />
        <ResidentsSection />
        <OwnersChapter />
        <OwnersSection onContactOpen={openContact} />

        {/* ── Free scroll from here ── */}
        <UnitsSection units={staticUnits} />
        <ReviewsSection reviews={staticReviews} />
        <ContactSection onContactOpen={openContact} />
      </main>

      <Footer />

      <Modal
        open={modalOpen}
        defaultType={modalType}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
