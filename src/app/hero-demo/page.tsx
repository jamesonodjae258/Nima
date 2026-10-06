'use client';

import React from 'react';
import ResponsiveHeroBanner from '@/components/ui/responsive-hero-banner';

export default function HeroDemoPage() {
  return (
    <main className="min-h-screen bg-[#08090C]">
      <ResponsiveHeroBanner
        badgeLabel="New"
        badgeText="First Commercial Flight to Mars 2026"
        title="Journey Beyond Earth"
        titleLine2="Into the Cosmos"
        description="Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable."
        primaryButtonText="Book Your Journey"
        secondaryButtonText="Watch Launch"
        ctaButtonText="Reserve Seat"
        partnersTitle="Partnering with leading space agencies worldwide"
      />
    </main>
  );
}
