"use client";

import React, { useState } from 'react';

export interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

export interface Partner {
    logoUrl: string;
    href: string;
    name?: string;
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
    logoUrl = "/images/hero/omi-logo.png",
    backgroundImageUrl = "/images/hero/cinematic-cosmic-arc.jpg",
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
        { logoUrl: "/images/hero/partner-nova.png", href: "#", name: "Nova" },
        { logoUrl: "/images/hero/partner-forge.png", href: "#", name: "Forge" },
        { logoUrl: "/images/hero/partner-flux.png", href: "#", name: "Flux" },
        { logoUrl: "/images/hero/partner-beam.png", href: "#", name: "Beam" },
        { logoUrl: "/images/hero/partner-echo.png", href: "#", name: "echo" }
    ]
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="w-full isolate min-h-screen overflow-hidden relative flex flex-col justify-between bg-black">
            {/* Cinematic cosmic arc background */}
            <img
                src={backgroundImageUrl}
                alt="Cosmic Arc Background"
                className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0 pointer-events-none select-none z-0"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30 z-0" />

            <header className="z-20 xl:top-4 relative">
                <div className="mx-6">
                    <div className="flex items-center justify-between pt-4">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center bg-center bg-no-repeat bg-contain w-[100px] h-[40px] rounded transition-transform hover:scale-105"
                            style={{ backgroundImage: `url(${logoUrl})` }}
                            aria-label="Home"
                        />

                        <nav className="hidden md:flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={`px-3 py-2 text-sm font-medium hover:text-white font-sans transition-colors ${
                                            link.isActive ? 'text-white/90' : 'text-white/80'
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href={ctaButtonHref}
                                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
                                >
                                    <span>{ctaButtonText}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M7 7h10v10" />
                                        <path d="M7 17 17 7" />
                                    </svg>
                                </a>
                            </div>
                        </nav>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur text-white/90"
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                    <path d="M4 5h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 19h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-3 p-4 rounded-2xl bg-neutral-950/90 border border-white/10 backdrop-blur-xl flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        link.isActive ? 'text-white bg-white/10' : 'text-white/80 hover:bg-white/5'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href={ctaButtonHref}
                                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-white/90"
                            >
                                <span>{ctaButtonText}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M7 7h10v10" />
                                    <path d="M7 17 17 7" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
            </header>

            <div className="z-10 relative flex-1 flex flex-col justify-center">
                <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-24 px-6 pb-16 w-full">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
                            <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2 font-sans">
                                {badgeLabel}
                            </span>
                            <span className="text-sm font-medium text-white/90 font-sans">
                                {badgeText}
                            </span>
                        </div>

                        <h1 className="sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-4xl text-white tracking-tight font-instrument-serif font-normal animate-fade-slide-in-2">
                            {title}
                            <br className="hidden sm:block" />
                            {titleLine2}
                        </h1>

                        <p className="sm:text-lg animate-fade-slide-in-3 text-base text-white/80 max-w-2xl mt-6 mx-auto font-sans leading-relaxed">
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center animate-fade-slide-in-4">
                            <a
                                href={primaryButtonHref}
                                className="inline-flex items-center gap-2 hover:bg-white/15 text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-3 px-5 font-sans transition-colors"
                            >
                                {primaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M5 12h14" />
                                    <path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-transparent px-5 py-3 text-sm font-medium text-white/90 hover:text-white font-sans transition-colors"
                            >
                                {secondaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mx-auto mt-20 max-w-5xl">
                        <p className="animate-fade-slide-in-1 text-sm text-white/70 text-center font-sans">
                            {partnersTitle}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 animate-fade-slide-in-2 text-white/70 mt-6 items-center justify-items-center gap-6">
                            {partners.map((partner, index) => (
                                <a
                                    key={index}
                                    href={partner.href}
                                    className="inline-flex items-center justify-center bg-center bg-no-repeat bg-contain w-[120px] h-[36px] opacity-80 hover:opacity-100 transition-opacity"
                                    style={{ backgroundImage: `url(${partner.logoUrl})` }}
                                    aria-label={partner.name || `Partner ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveHeroBanner;
