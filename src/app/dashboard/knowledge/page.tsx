'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { initialKnowledgeResources } from '@/data/mockData';
import { KnowledgeResource, KnowledgeCategoryType } from '@/types';
import {
  Plus,
  Search,
  FileText,
  Globe,
  FileCode,
  Database,
  ArrowUpRight,
  Cpu,
  UserPlus,
} from 'lucide-react';
import { AddKnowledgeModal } from '@/components/knowledge/AddKnowledgeModal';
import { AttachAgentModal } from '@/components/knowledge/AttachAgentModal';

type CategoryFilter = 'All' | KnowledgeCategoryType;

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Documents',
  'Websites',
  'Guidelines',
  'Data',
  'Instructions',
  'Examples',
];

export default function KnowledgePage() {
  const [resources, setResources] = useState<KnowledgeResource[]>(initialKnowledgeResources);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Attach modal state
  const [attachModalOpen, setAttachModalOpen] = useState(false);
  const [targetResource, setTargetResource] = useState<KnowledgeResource | null>(null);

  const handleAddResource = (newRes: KnowledgeResource) => {
    setResources((prev) => [newRes, ...prev]);
  };

  const handleAttachAgent = (agentName: string) => {
    if (!targetResource) return;
    setResources((prev) =>
      prev.map((r) =>
        r.id === targetResource.id
          ? {
              ...r,
              usedByAgents: r.usedByAgents.includes(agentName)
                ? r.usedByAgents
                : [...r.usedByAgents, agentName],
            }
          : r
      )
    );
  };

  const filteredResources = resources.filter((res) => {
    const matchesCategory =
      activeCategory === 'All' ||
      res.category === activeCategory ||
      (activeCategory === 'Examples' && res.type === 'Example');

    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (res.tags && res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      res.usedByAgents.some((agent) => agent.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getResourceIcon = (type: string, category?: string) => {
    if (type === 'Website' || category === 'Websites') return Globe;
    if (type === 'Instruction' || category === 'Instructions') return FileCode;
    if (type === 'Data' || category === 'Data') return Database;
    return FileText;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/20">
              Knowledge Center
            </span>
            <span className="text-xs text-[#5C6370]">• Ground-Truth Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Knowledge
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Give your agents the domain context, company guidelines, and rules they need to make intelligent decisions.
          </p>
        </div>

        <Button
          onClick={() => setAddModalOpen(true)}
          className="font-medium shadow-[0_0_15px_rgba(255,107,53,0.3)] shrink-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add knowledge</span>
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#242832]/60">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const count =
            cat === 'All'
              ? resources.length
              : resources.filter(
                  (r) => r.category === cat || (cat === 'Examples' && r.type === 'Example')
                ).length;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 mb-1 ${
                isActive
                  ? 'bg-[#171A21] text-[#F5F5F7] border border-[#3D4454] shadow-sm'
                  : 'text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#111318]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'bg-[#171A21] text-[#5C6370]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="w-full md:w-80">
          <Input
            icon={<Search className="w-3.5 h-3.5" />}
            placeholder="Search knowledge documents, tags, agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8B93A1]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#32D583]" />
            <span>{resources.length} resources vectorized</span>
          </span>
          <span className="text-[#3D4454]">•</span>
          <span className="font-mono text-[11px] text-[#5C6370]">Semantic embedding dimension: 1536</span>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-[#242832] bg-[#111318]">
          <FileText className="w-8 h-8 text-[#5C6370] mx-auto mb-2" />
          <h3 className="text-sm font-medium text-[#F5F5F7]">No knowledge sources found</h3>
          <p className="text-xs text-[#8B93A1] mt-1 max-w-sm mx-auto">
            Try adjusting your search query or select another category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => {
            const IconComponent = getResourceIcon(res.type, res.category);

            return (
              <Card
                key={res.id}
                className="p-5 flex flex-col justify-between hover:border-[#3D4454] transition-all group bg-[#111318] relative"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-[#171A21] border border-[#242832] flex items-center justify-center text-[#FF6B35] shrink-0 group-hover:border-[#FF6B35]/40 transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/dashboard/knowledge/${res.id}`}
                          className="text-sm font-semibold text-[#F5F5F7] tracking-tight hover:text-[#FF6B35] transition-colors truncate block flex items-center gap-1"
                        >
                          <span className="truncate">{res.name}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B35] shrink-0" />
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] font-mono text-[#5C6370]">
                            {res.type}
                          </span>
                          <span className="text-[#3D4454]">•</span>
                          <span className="text-[10px] font-mono text-[#5C6370]">
                            {res.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Badge
                      variant={
                        res.status === 'Active' || res.status === 'Synced'
                          ? 'success'
                          : 'default'
                      }
                      size="sm"
                    >
                      {res.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-[#8B93A1] mt-3.5 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  {/* Connected Agents */}
                  <div className="mt-4 pt-3 border-t border-[#242832]/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#5C6370]">
                        Connected Agents ({res.usedByAgents.length})
                      </span>
                      <button
                        onClick={() => {
                          setTargetResource(res);
                          setAttachModalOpen(true);
                        }}
                        className="text-[10px] text-[#FF6B35] hover:underline flex items-center gap-1"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>Attach</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {res.usedByAgents.map((agent) => (
                        <span
                          key={agent}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#171A21] text-[#D1D5DB] border border-[#242832] font-mono flex items-center gap-1"
                        >
                          <Cpu className="w-2.5 h-2.5 text-[#FF6B35]" />
                          <span>{agent}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#242832]/60 flex items-center justify-between text-[11px] text-[#5C6370]">
                  <span>Updated {res.updatedDate}</span>
                  <Link
                    href={`/dashboard/knowledge/${res.id}`}
                    className="font-mono text-[11px] text-[#8B93A1] hover:text-[#FF6B35] transition-colors flex items-center gap-1"
                  >
                    <span>{res.itemsCount} chunks</span>
                    <span>→</span>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Knowledge Modal */}
      <AddKnowledgeModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddResource={handleAddResource}
      />

      {/* Attach Agent Modal */}
      {targetResource && (
        <AttachAgentModal
          isOpen={attachModalOpen}
          onClose={() => {
            setAttachModalOpen(false);
            setTargetResource(null);
          }}
          resourceName={targetResource.name}
          alreadyAttachedAgents={targetResource.usedByAgents}
          onAttach={handleAttachAgent}
        />
      )}
    </div>
  );
}
