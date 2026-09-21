'use client';

import React from 'react';
import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="w-full border-t border-[#242832] bg-[#08090C] text-xs text-[#8B93A1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#FF6B35] to-[#C9471B] flex items-center justify-center text-[#08090C] font-bold shadow-sm">
                <span className="font-bold text-[11px]">N</span>
              </div>
              <span className="font-semibold text-sm tracking-tight text-[#F5F5F7]">
                NIMA
              </span>
            </Link>
            <p className="text-xs text-[#8B93A1] max-w-sm leading-relaxed">
              Give AI a job. Autonomous agents that research, analyze, make decisions, and take action across your enterprise tools.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#5C6370]">
              <span className="w-2 h-2 rounded-full bg-[#32D583]" />
              <span>Nima Core v2.4 Operational</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono uppercase text-[#F5F5F7] tracking-wider font-semibold">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="hover:text-[#F5F5F7] transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#F5F5F7] transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#F5F5F7] transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-[#F5F5F7] transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#FF6B35] transition-colors">
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
                <Link href="/about" className="hover:text-[#F5F5F7] transition-colors">
                  About Nima
                </Link>
              </li>
              <li>
                <span className="text-[#5C6370] cursor-not-allowed">Documentation</span>
              </li>
              <li>
                <span className="text-[#5C6370] cursor-not-allowed">Guides & Playbooks</span>
              </li>
              <li>
                <span className="text-[#5C6370] cursor-not-allowed">System Status</span>
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
                  className="hover:text-[#F5F5F7] transition-colors"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F5F5F7] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-[#5C6370] cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-[#5C6370] cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-[#242832]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#5C6370]">
          <div>© {new Date().getFullYear()} Nima AI Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Enterprise-Grade Security</span>
            <span>•</span>
            <span>Human-in-the-Loop Governance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
