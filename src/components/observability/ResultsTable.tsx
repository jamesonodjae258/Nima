'use client';

import React, { useState, useMemo } from 'react';
import { ProspectDetail } from '@/types';
import { mockProspects } from '@/data/mockData';
import { ProspectDetailDrawer } from './ProspectDetailDrawer';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';

interface ResultsTableProps {
  prospects?: ProspectDetail[];
  agentName?: string;
}

export function ResultsTable({
  prospects = mockProspects,
  agentName = 'Lead Researcher',
}: ResultsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Qualified' | 'Review' | 'Rejected'>('All');
  const [scoreFilter, setScoreFilter] = useState<'All' | '90+' | '80-89' | '<80'>('All');
  const [sortBy, setSortBy] = useState<'score_desc' | 'score_asc' | 'company' | 'contact'>('score_desc');
  const [selectedProspect, setSelectedProspect] = useState<ProspectDetail | null>(null);

  // Filter & Sort computation
  const filteredProspects = useMemo(() => {
    return prospects
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.company.toLowerCase().includes(q) ||
            p.contact.toLowerCase().includes(q) ||
            p.role.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q);
          if (!match) return false;
        }

        // Status filter
        if (statusFilter !== 'All' && p.status !== statusFilter) {
          return false;
        }

        // Score filter
        if (scoreFilter === '90+' && p.score < 90) return false;
        if (scoreFilter === '80-89' && (p.score < 80 || p.score >= 90)) return false;
        if (scoreFilter === '<80' && p.score >= 80) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score_desc') return b.score - a.score;
        if (sortBy === 'score_asc') return a.score - b.score;
        if (sortBy === 'company') return a.company.localeCompare(b.company);
        if (sortBy === 'contact') return a.contact.localeCompare(b.contact);
        return 0;
      });
  }, [prospects, searchQuery, statusFilter, scoreFilter, sortBy]);

  const qualifiedCount = prospects.filter((p) => p.status === 'Qualified').length;

  const handleExportCsv = () => {
    const headers = ['Company', 'Contact', 'Role', 'Location', 'Score', 'Status', 'Company Size', 'Funding'];
    const rows = filteredProspects.map((p) => [
      `"${p.company}"`,
      `"${p.contact}"`,
      `"${p.role}"`,
      `"${p.location}"`,
      p.score,
      `"${p.status}"`,
      `"${p.companySize}"`,
      `"${p.funding}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nima_qualified_prospects_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative">
      {/* Header & Subheading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-[#F5F5F7] tracking-tight">
              Results
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30 font-medium">
              {filteredProspects.length} shown
            </span>
          </div>
          <p className="text-xs text-[#8B93A1] mt-0.5">
            {qualifiedCount} prospects qualified by {agentName}. Click any row to inspect signals and firmographics.
          </p>
        </div>

        {/* Export Button */}
        <button
          type="button"
          onClick={handleExportCsv}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#171A21] hover:bg-[#242832] text-[#F5F5F7] border border-[#242832] text-xs font-medium transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-4 pb-4 border-b border-[#242832]/60">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8B93A1] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, contact, or title..."
            className="w-full pl-9 pr-3.5 py-2 bg-[#08090C] border border-[#242832] rounded-lg text-xs text-[#F5F5F7] placeholder-[#8B93A1] focus:outline-none focus:border-[#FF6B35] transition-colors"
          />
        </div>

        {/* Filter Badges & Selects */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Status Tabs */}
          <div className="flex items-center bg-[#08090C] p-1 rounded-lg border border-[#242832]">
            {(['All', 'Qualified', 'Review', 'Rejected'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#171A21] text-white shadow-sm border border-[#242832]'
                    : 'text-[#8B93A1] hover:text-[#F5F5F7]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Score Range Filter */}
          <div className="flex items-center gap-1.5 bg-[#08090C] px-2.5 py-1.5 rounded-lg border border-[#242832] text-xs text-[#8B93A1]">
            <Filter className="w-3 h-3 text-[#FF6B35]" />
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value as any)}
              className="bg-transparent text-[#F5F5F7] text-xs focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#111318]">Score: All</option>
              <option value="90+" className="bg-[#111318]">Score: 90+</option>
              <option value="80-89" className="bg-[#111318]">Score: 80 - 89</option>
              <option value="<80" className="bg-[#111318]">Score: &lt;80</option>
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-1.5 bg-[#08090C] px-2.5 py-1.5 rounded-lg border border-[#242832] text-xs text-[#8B93A1]">
            <ArrowUpDown className="w-3 h-3" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-[#F5F5F7] text-xs focus:outline-none cursor-pointer"
            >
              <option value="score_desc" className="bg-[#111318]">Sort: Highest Score</option>
              <option value="score_asc" className="bg-[#111318]">Sort: Lowest Score</option>
              <option value="company" className="bg-[#111318]">Sort: Company (A-Z)</option>
              <option value="contact" className="bg-[#111318]">Sort: Contact (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#242832] text-[11px] font-mono text-[#8B93A1] uppercase tracking-wider">
              <th className="pb-3 font-medium pl-3">Company</th>
              <th className="pb-3 font-medium">Contact</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Location</th>
              <th className="pb-3 font-medium text-center">Score</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right pr-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#242832]/60 text-xs">
            {filteredProspects.map((prospect) => {
              const isSelected = selectedProspect?.id === prospect.id;
              const isQualified = prospect.status === 'Qualified';
              const isReview = prospect.status === 'Review';
              const isRejected = prospect.status === 'Rejected';

              return (
                <tr
                  key={prospect.id}
                  onClick={() => setSelectedProspect(prospect)}
                  className={`hover:bg-[#171A21]/70 transition-colors cursor-pointer group ${
                    isSelected ? 'bg-[#171A21] ring-1 ring-[#FF6B35]/50' : ''
                  }`}
                >
                  {/* Company */}
                  <td className="py-3 pl-3 font-medium text-[#F5F5F7] group-hover:text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35]/60" />
                      <span>{prospect.company}</span>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3 text-[#F5F5F7] font-medium">
                    {prospect.contact}
                  </td>

                  {/* Role */}
                  <td className="py-3 text-[#8B93A1]">
                    {prospect.role}
                  </td>

                  {/* Location */}
                  <td className="py-3 text-[#8B93A1] font-mono text-[11px]">
                    {prospect.location}
                  </td>

                  {/* Score */}
                  <td className="py-3 text-center">
                    <span
                      className={`inline-block font-mono font-bold px-2 py-0.5 rounded text-xs ${
                        prospect.score >= 90
                          ? 'bg-[#32D583]/10 text-[#32D583] border border-[#32D583]/30'
                          : prospect.score >= 80
                          ? 'bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30'
                          : 'bg-[#F5B544]/10 text-[#F5B544] border border-[#F5B544]/30'
                      }`}
                    >
                      {prospect.score}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-mono ${
                        isQualified
                          ? 'text-[#32D583] bg-[#32D583]/10'
                          : isReview
                          ? 'text-[#F5B544] bg-[#F5B544]/10'
                          : 'text-[#F04438] bg-[#F04438]/10'
                      }`}
                    >
                      {isQualified ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : isReview ? (
                        <AlertCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      <span>{prospect.status}</span>
                    </span>
                  </td>

                  {/* Action / Arrow */}
                  <td className="py-3 text-right pr-3">
                    <span className="inline-flex items-center gap-1 text-[#8B93A1] group-hover:text-[#F5F5F7] text-[11px] font-mono transition-colors">
                      <span>Inspect</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredProspects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-xs text-[#8B93A1]">No prospects match your active filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setScoreFilter('All');
              }}
              className="mt-2 text-xs text-[#FF6B35] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Prospect Detail Drawer */}
      <ProspectDetailDrawer
        prospect={selectedProspect}
        onClose={() => setSelectedProspect(null)}
      />
    </div>
  );
}
