'use client';

import React from 'react';
import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#08090C] text-xs text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <img
                src="/logo/full-logo.png"
                alt="Nima"
                className="h-6 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>
            <p className="text-xs text-[#9CA3AF] max-w-sm leading-relaxed">
              Give AI a job. Autonomous agents that research, analyze, make decisions, and take action across your enterprise tools.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#9CA3AF]">
              <span className="w-2 h-2 rounded-full bg-[#32D583] shadow-[0_0_8px_rgba(50,213,131,0.5)]" />
              <span className="font-mono text-[11px]">Nima Core v2.4 Operational</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase text-[#F5F5F7] tracking-wider font-semibold">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-[#FF8C61] hover:text-[#FF6B35] font-medium transition-colors">
                  App Dashboard →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase text-[#F5F5F7] tracking-wider font-semibold">
              Resources
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  About Nima
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Guides & Playbooks
                </Link>
              </li>
              <li>
                <span className="text-[#9CA3AF]/90">System Status</span>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase text-[#F5F5F7] tracking-wider font-semibold">
              Connect
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#9CA3AF] hover:text-[#F5F5F7] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF]">
          <div>© {new Date().getFullYear()} Nima AI Inc. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
            <span>Enterprise-Grade Security</span>
            <span className="text-white/20">•</span>
            <span>Human-in-the-Loop Governance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
