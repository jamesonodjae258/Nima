'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workspace, setWorkspace] = useState('');
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
      {/* Header */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-[#242832]/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#C9471B] flex items-center justify-center text-[#08090C] font-bold shadow-sm">
            <span className="font-bold text-xs tracking-wider">N</span>
          </div>
          <span className="font-semibold text-base tracking-tight text-[#F5F5F7]">
            NIMA
          </span>
        </Link>

        <Link href="/login" className="text-xs text-[#8B93A1] hover:text-[#F5F5F7] transition-colors">
          Already have an account? <span className="text-[#FF6B35] font-medium">Log in</span>
        </Link>
      </header>

      {/* Main Signup Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl bg-[#111318] border border-[#242832] p-8 shadow-2xl space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-xl font-semibold text-[#F5F5F7] tracking-tight">
              Create your Nima workspace.
            </h1>
            <p className="text-xs text-[#8B93A1]">
              Give AI a job. 14-day free trial included.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Full Name
              </label>
              <Input
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Work Email
              </label>
              <Input
                type="email"
                placeholder="alex@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Workspace Name
              </label>
              <Input
                placeholder="Acme Revenue Ops"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Password
              </label>
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
              <span>{loading ? 'Creating workspace...' : 'Create workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </form>

          <div className="pt-2 text-center text-[11px] text-[#5C6370]">
            By signing up you agree to Nima&apos;s Terms and Privacy Policy.
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-[#242832]/60 px-6 flex items-center justify-center text-[11px] text-[#5C6370]">
        <span>© {new Date().getFullYear()} Nima AI Inc. Built for teams that want more from AI.</span>
      </footer>
    </div>
  );
}
