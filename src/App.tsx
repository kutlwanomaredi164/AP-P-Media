/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DynamicLoader } from './components/DynamicLoader';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustSection } from './components/TrustSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedPortfolio } from './components/FeaturedPortfolio';
import { AboutSection } from './components/AboutSection';
import { ProcessTimeline } from './components/ProcessTimeline';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CinematicGallery } from './components/CinematicGallery';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MediaLightboxModal } from './components/MediaLightboxModal';
import { PortfolioItem, ServiceCategory } from './types';
import { GALLERY_ITEMS } from './data/mediaData';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>(
    'Wedding Photography & Videography'
  );
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBooking = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForBooking(serviceName);
    }
    scrollToSection('contact');
  };

  const handleSelectServiceFromCard = (serviceTitle: string) => {
    setSelectedServiceForBooking(serviceTitle);
    scrollToSection('contact');
  };

  const handleViewGallery = (category: ServiceCategory) => {
    setSelectedGalleryCategory(category);
    const el = document.getElementById('gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenGalleryLightbox = (imageUrl: string, title: string, caption: string) => {
    const matched = GALLERY_ITEMS.find((g) => g.image === imageUrl);
    setActiveModalItem({
      id: matched?.id || `gallery-${Date.now()}`,
      title,
      category: (matched?.category as ServiceCategory) || 'Weddings',
      client: 'AP Media Archive',
      location: 'South Africa',
      year: '2026',
      image: imageUrl,
      aspectRatio: 'landscape',
      description: caption,
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-white selection:text-black">
      {/* Dynamic Intro Cinematic Loading Screen */}
      <DynamicLoader />

      {/* Navigation Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main>
        {/* SECTION 1: HERO */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onExplorePortfolio={() => scrollToSection('portfolio')}
        />

        {/* SECTION 2: TRUST INDICATORS & CLIENT LOGOS */}
        <TrustSection />

        {/* SECTION 3: 8 CORE SERVICES */}
        <ServicesSection
          onSelectService={handleSelectServiceFromCard}
          onViewGallery={handleViewGallery}
        />

        {/* SECTION 4: FEATURED PORTFOLIO */}
        <FeaturedPortfolio onOpenItemModal={(item) => setActiveModalItem(item)} />

        {/* SECTION 5: ABOUT AP MEDIA */}
        <AboutSection />

        {/* SECTION 6: CLIENT EXPERIENCE / PROCESS TIMELINE */}
        <ProcessTimeline />

        {/* SECTION 7: RESULTS & STATISTICS */}
        <StatsSection />

        {/* SECTION 8: TESTIMONIALS */}
        <TestimonialsSection />

        {/* SECTION 9: CINEMATIC GALLERY EXPERIENCE */}
        <CinematicGallery
          selectedCategory={selectedGalleryCategory}
          onSelectCategory={setSelectedGalleryCategory}
          onOpenLightbox={handleOpenGalleryLightbox}
        />

        {/* SECTION 10: CONTACT & BOOKINGS */}
        <BookingSection
          initialService={selectedServiceForBooking}
          onExploreWork={() => scrollToSection('portfolio')}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectService={handleSelectServiceFromCard}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating WhatsApp Quick Action throughout site */}
      <FloatingWhatsApp />

      {/* Fullscreen Media Lightbox Modal */}
      <MediaLightboxModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
        onBookItem={(category) => {
          handleOpenBooking(category);
        }}
      />
    </div>
  );
}
