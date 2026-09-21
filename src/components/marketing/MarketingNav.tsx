'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Product', href: '/product' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090C]/85 backdrop-blur-md border-b border-[#242832]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#C9471B] flex items-center justify-center text-[#08090C] font-bold shadow-[0_0_12px_rgba(255,107,53,0.35)] group-hover:shadow-[0_0_18px_rgba(255,107,53,0.5)] transition-all">
            <span className="font-bold text-xs tracking-wider">N</span>
          </div>
          <span className="font-semibold text-base tracking-tight text-[#F5F5F7] group-hover:text-white transition-colors">
            NIMA
          </span>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-[#F5F5F7] font-semibold border-b-2 border-[#FF6B35]'
                    : 'text-[#8B93A1] hover:text-[#F5F5F7]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Auth & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-[#8B93A1] hover:text-[#F5F5F7] transition-colors px-3 py-1.5"
          >
            Log in
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="text-xs font-medium shadow-[0_0_15px_rgba(255,107,53,0.35)]"
            >
              <span>Get started</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/signup">
            <Button size="sm" className="text-xs font-medium py-1 px-2.5">
              <span>Start</span>
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318] rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#F5F5F7]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-[#242832] bg-[#0E1015]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  pathname === link.href
                    ? 'bg-[#171A21] text-[#F5F5F7] font-medium'
                    : 'text-[#8B93A1] hover:bg-[#171A21] hover:text-[#F5F5F7]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#242832]/60 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center text-xs font-medium py-2 text-[#8B93A1] hover:text-[#F5F5F7]"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="w-full"
            >
              <Button className="w-full text-xs font-medium justify-center">
                <span>Get started →</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
