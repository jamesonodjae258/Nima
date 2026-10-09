'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F5F5F7] flex flex-col justify-between selection:bg-[#FF6B35]/30 selection:text-white">
      {/* Minimal Top Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-[#242832]/60">
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/logo/full-logo.png"
            alt="NIMA"
            className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        <Link href="/signup" className="text-xs text-[#8B93A1] hover:text-[#F5F5F7] transition-colors">
          Don&apos;t have an account? <span className="text-[#FF6B35] font-medium">Sign up</span>
        </Link>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl bg-[#111318] border border-[#242832] p-8 shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 mb-1 flex items-center justify-center">
              <img
                src="/logo/symbol.png"
                alt="Nima"
                className="w-10 h-10 object-contain drop-shadow-[0_0_12px_rgba(255,107,53,0.35)]"
              />
            </div>
            <h1 className="text-xl font-semibold text-[#F5F5F7] tracking-tight">
              Welcome back.
            </h1>
            <p className="text-xs text-[#8B93A1]">
              Sign in to your Nima workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Email
              </label>
              <Input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-[#F5F5F7]">
                  Password
                </label>
                <span className="text-[11px] text-[#8B93A1] hover:text-[#F5F5F7] cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <Input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-xs font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)] mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Log in'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#242832]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-mono">
              <span className="bg-[#111318] px-2 text-[#5C6370]">Or</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push('/dashboard')}
            className="w-full text-xs font-medium border-[#242832] hover:border-[#3D4454]"
          >
            <span>Continue with Google</span>
          </Button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="h-12 border-t border-[#242832]/60 px-6 flex items-center justify-center text-[11px] text-[#5C6370]">
        <span>© {new Date().getFullYear()} Nima AI Inc. Safe, auditable enterprise autonomy.</span>
      </footer>
    </div>
  );
}
