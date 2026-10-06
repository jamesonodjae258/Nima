"use client";

import React, { useState } from 'react';
import { ArrowUpRight, Play, Menu, X, Sparkles } from 'lucide-react';

export interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

export interface Partner {
    name?: string;
    logoUrl?: string;
    href: string;
}

export interface ResponsiveHeroBannerProps {
    logoUrl?: string;
    backgroundImageUrl?: string;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

export const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    logoUrl,
    backgroundImageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    navLinks = [
        { label: "Home", href: "#", isActive: true },
        { label: "Missions", href: "#" },
        { label: "Destinations", href: "#" },
        { label: "Technology", href: "#" },
        { label: "Book Flight", href: "#" }
    ],
    ctaButtonText = "Reserve Seat",
    ctaButtonHref = "#",
    badgeLabel = "New",
    badgeText = "First Commercial Flight to Mars 2026",
    title = "Journey Beyond Earth",
    titleLine2 = "Into the Cosmos",
    description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
    primaryButtonText = "Book Your Journey",
    primaryButtonHref = "#",
    secondaryButtonText = "Watch Launch",
    secondaryButtonHref = "#",
    partnersTitle = "Partnering with leading space agencies worldwide",
    partners = [
        { name: "NASA JPL", href: "#" },
        { name: "ESA Cosmos", href: "#" },
        { name: "AstroDynamics", href: "#" },
        { name: "Orbital Sciences", href: "#" },
        { name: "DeepSpace One", href: "#" }
    ]
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="w-full isolate min-h-screen overflow-hidden relative flex flex-col justify-between bg-[#08090C]">
            {/* ================= RICH DYNAMIC BACKGROUND (Non-Plain & Multi-Layered) ================= */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* 1. Base photographic cosmos backdrop */}
                <img
                    src={backgroundImageUrl}
                    alt="Space backdrop"
                    className="w-full h-full object-cover object-center absolute inset-0 scale-105 transition-transform duration-1000 ease-out"
                />

                {/* 2. Ambient glowing color orbs (adds cinematic depth and warm vibrant highlights) */}
                <div className="absolute -top-24 left-1/4 w-[550px] h-[550px] bg-[#FF6B35]/20 rounded-full blur-[140px] mix-blend-screen" />
                <div className="absolute top-1/3 -right-24 w-[650px] h-[650px] bg-[#6366F1]/20 rounded-full blur-[160px] mix-blend-screen" />
                <div className="absolute -bottom-20 left-1/3 w-[500px] h-[500px] bg-[#0EA5E9]/15 rounded-full blur-[150px] mix-blend-screen" />

                {/* 3. Subtle cosmic grid mesh */}
                <div 
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '48px 48px',
                        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)'
                    }}
                />

                {/* 4. Vignette and Contrast Overlays for pristine text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/80 via-[#08090C]/40 to-[#08090C] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#08090C_90%)] pointer-events-none" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>

            {/* ================= HEADER / NAVIGATION ================= */}
            <header className="z-20 relative pt-4 sm:pt-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Brand Logo */}
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 group transition-transform hover:scale-105"
                        >
                            {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="w-[100px] h-[40px] object-contain rounded" />
                            ) : (
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center shadow-lg shadow-[#FF6B35]/25 border border-white/20">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-xl font-bold tracking-tight text-white font-sans">
                                        AETHER<span className="text-[#FF6B35]">.</span>
                                    </span>
                                </div>
                            )}
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/5 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md shadow-2xl">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={`px-3.5 py-1.5 text-sm font-medium rounded-full font-sans transition-all duration-200 ${
                                            link.isActive 
                                                ? 'text-white bg-white/10 shadow-sm' 
                                                : 'text-white/70 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href={ctaButtonHref}
                                    className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 shadow-sm font-sans transition-all duration-200 group"
                                >
                                    <span>{ctaButtonText}</span>
                                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                            </div>
                        </nav>

                        {/* Mobile Menu Trigger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white hover:bg-white/20 transition-colors"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-3 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-xl p-4 shadow-2xl space-y-2 animate-fade-slide-in-1">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                                        link.isActive ? 'text-white bg-white/10' : 'text-white/80 hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-2 border-t border-white/10">
                                <a
                                    href={ctaButtonHref}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-white/90 transition-colors"
                                >
                                    {ctaButtonText}
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* ================= HERO CONTENT ================= */}
            <div className="z-10 relative flex-1 flex flex-col justify-center py-16 sm:py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="mx-auto max-w-3xl text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white/10 hover:bg-white/15 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-md animate-fade-slide-in-1 transition-all">
                            <span className="inline-flex items-center text-xs font-semibold text-neutral-950 bg-white rounded-full py-0.5 px-2.5 font-sans shadow-sm">
                                {badgeLabel}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-white/90 font-sans tracking-wide">
                                {badgeText}
                            </span>
                        </div>

                        {/* Hero Headline */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-normal leading-[1.1] text-white tracking-tight font-instrument-serif animate-fade-slide-in-2 drop-shadow-md">
                            {title}
                            <br className="hidden sm:block" />
                            <span className="italic opacity-95"> {titleLine2}</span>
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mt-6 mx-auto leading-relaxed animate-fade-slide-in-3 font-sans">
                            {description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-9 gap-3 items-center justify-center animate-fade-slide-in-4">
                            <a
                                href={primaryButtonHref}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-medium text-white bg-white/15 hover:bg-white/25 ring-1 ring-white/20 backdrop-blur-md rounded-full py-3.5 px-6 font-sans transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-black/20"
                            >
                                <span>{primaryButtonText}</span>
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 px-6 py-3.5 text-sm font-medium text-white/90 hover:text-white font-sans backdrop-blur-md transition-all duration-200"
                            >
                                <Play className="w-3.5 h-3.5 fill-current" />
                                <span>{secondaryButtonText}</span>
                            </a>
                        </div>
                    </div>

                    {/* Partner Section */}
                    {partners && partners.length > 0 && (
                        <div className="mx-auto mt-16 sm:mt-20 max-w-5xl">
                            <p className="animate-fade-slide-in-1 text-xs uppercase tracking-widest text-white/50 text-center font-sans">
                                {partnersTitle}
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 animate-fade-slide-in-2">
                                {partners.map((partner, index) => (
                                    <a
                                        key={index}
                                        href={partner.href}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm text-xs font-medium text-white/70 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
                                    >
                                        {partner.logoUrl ? (
                                            <img src={partner.logoUrl} alt={partner.name || "Partner"} className="h-4 w-auto object-contain" />
                                        ) : (
                                            <>
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]/80" />
                                                <span>{partner.name}</span>
                                            </>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;
