'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input, Textarea } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { initialKnowledgeResources, initialAgents } from '@/data/mockData';
import { KnowledgeResource, KnowledgeSection } from '@/types';
import {
  ArrowLeft,
  FileText,
  Globe,
  FileCode,
  Database,
  CheckCircle2,
  RefreshCw,
  Plus,
  Cpu,
  ExternalLink,
  Edit2,
  Trash2,
  Layers,
  Check,
} from 'lucide-react';
import { AttachAgentModal } from '@/components/knowledge/AttachAgentModal';

export default function KnowledgeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || 'res-1';

  const defaultRes =
    initialKnowledgeResources.find((r) => r.id === id) || initialKnowledgeResources[0];

  const [resource, setResource] = useState<KnowledgeResource>(defaultRes);
  const [isReindexing, setIsReindexing] = useState(false);
  const [reindexSuccess, setReindexSuccess] = useState(false);
  const [attachModalOpen, setAttachModalOpen] = useState(false);

  // Section editing / adding modal
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');

  const handleReindex = () => {
    setIsReindexing(true);
    setTimeout(() => {
      setIsReindexing(false);
      setReindexSuccess(true);
      setTimeout(() => setReindexSuccess(false), 2500);
    }, 1000);
  };

  const handleAttachAgent = (agentName: string) => {
    if (!resource.usedByAgents.includes(agentName)) {
      setResource((prev) => ({
        ...prev,
        usedByAgents: [...prev.usedByAgents, agentName],
      }));
    }
  };

  const handleRemoveAgent = (agentName: string) => {
    setResource((prev) => ({
      ...prev,
      usedByAgents: prev.usedByAgents.filter((a) => a !== agentName),
    }));
  };

  const handleAddSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim() || !newSectionContent.trim()) return;

    const newSec: KnowledgeSection = {
      title: newSectionTitle.trim(),
      content: newSectionContent.trim(),
    };

    setResource((prev) => ({
      ...prev,
      sections: [...(prev.sections || []), newSec],
      itemsCount: prev.itemsCount + 1,
      updatedDate: 'Just now',
    }));

    setNewSectionTitle('');
    setNewSectionContent('');
    setIsAddingSection(false);
  };

  const handleDeleteSection = (index: number) => {
    setResource((prev) => ({
      ...prev,
      sections: prev.sections?.filter((_, i) => i !== index),
      itemsCount: Math.max(1, prev.itemsCount - 1),
      updatedDate: 'Just now',
    }));
  };

  const getResourceIcon = (type: string, category?: string) => {
    if (type === 'Website' || category === 'Websites') return Globe;
    if (type === 'Instruction' || category === 'Instructions') return FileCode;
    if (type === 'Data' || category === 'Data') return Database;
    return FileText;
  };

  const IconComponent = getResourceIcon(resource.type, resource.category);

  // Map attached agent names to full agent objects if available
  const attachedAgentsDetails = resource.usedByAgents.map((agentName) => {
    const found = initialAgents.find((a) => a.name === agentName);
    return {
      name: agentName,
      id: found?.id || 'agent-1',
      category: found?.category || 'Autonomous Agent',
      status: found?.status || 'idle',
      taskCount: found?.taskCount || 120,
      successRate: found?.successRate || 97,
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Back Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/knowledge"
          className="inline-flex items-center text-xs font-medium text-[#8B93A1] hover:text-[#F5F5F7] transition-colors gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Knowledge Center</span>
        </Link>

        <div className="flex items-center gap-2">
          {reindexSuccess && (
            <span className="text-xs text-[#32D583] flex items-center gap-1 font-mono">
              <Check className="w-3.5 h-3.5" /> Re-indexed successfully
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReindex}
            disabled={isReindexing}
            className="text-xs text-[#8B93A1] hover:text-[#F5F5F7]"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isReindexing ? 'animate-spin text-[#FF6B35]' : ''}`} />
            <span>{isReindexing ? 'Re-vectorizing...' : 'Re-index vectors'}</span>
          </Button>

          <Button
            size="sm"
            onClick={() => setAttachModalOpen(true)}
            className="text-xs font-medium shadow-[0_0_12px_rgba(255,107,53,0.25)]"
          >
            <Cpu className="w-3.5 h-3.5 mr-1.5" />
            <span>Attach to agent</span>
          </Button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#111318] border border-[#242832]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#171A21] border border-[#242832] flex items-center justify-center text-[#FF6B35] shrink-0">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-semibold text-[#F5F5F7] tracking-tight">
                  {resource.name}
                </h1>
                <Badge variant={resource.status === 'Active' || resource.status === 'Synced' ? 'success' : 'default'}>
                  {resource.status}
                </Badge>
                {resource.category && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#171A21] text-[#8B93A1] border border-[#242832] font-mono">
                    {resource.category}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#8B93A1] mt-2 max-w-2xl leading-relaxed">
                {resource.description}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-4 border-t border-[#242832]/60">
            <span className="text-[10px] font-mono uppercase text-[#5C6370] mr-1">Tags:</span>
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded bg-[#171A21] text-[#8B93A1] border border-[#242832]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Structured Document Sections */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF6B35]" />
              <h2 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                Structured Knowledge Sections ({resource.sections?.length || 0})
              </h2>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingSection(true)}
              className="text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Add section</span>
            </Button>
          </div>

          <div className="space-y-3">
            {resource.sections && resource.sections.length > 0 ? (
              resource.sections.map((sec, idx) => (
                <Card
                  key={idx}
                  className="p-4 bg-[#111318] border-[#242832] hover:border-[#3D4454] transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono text-[#FF6B35] bg-[#FF6B35]/10 px-1.5 py-0.5 rounded">
                          0{idx + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
                          {sec.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#8B93A1] leading-relaxed font-sans mt-2 whitespace-pre-wrap">
                        {sec.content}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteSection(idx)}
                      aria-label={`Delete ${sec.title} section`}
                      className="text-[#5C6370] hover:text-[#F04438] transition-colors p-1 opacity-0 group-hover:opacity-100"
                      title="Remove section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center bg-[#111318] border-[#242832]">
                <p className="text-xs text-[#8B93A1]">No structured sections defined yet.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Right Col: Metadata & Connected Agents */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <Card className="p-4 bg-[#111318] border-[#242832] space-y-3.5">
            <h3 className="text-xs font-mono uppercase text-[#5C6370] tracking-wider">
              Document Metadata
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#242832]/60">
                <span className="text-[#8B93A1]">Format</span>
                <span className="font-mono text-[#F5F5F7]">{resource.type}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#242832]/60">
                <span className="text-[#8B93A1]">File Size</span>
                <span className="font-mono text-[#F5F5F7]">{resource.size}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#242832]/60">
                <span className="text-[#8B93A1]">Chunks Vectorized</span>
                <span className="font-mono text-[#F5F5F7]">{resource.itemsCount} chunks</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#242832]/60">
                <span className="text-[#8B93A1]">Created Date</span>
                <span className="font-mono text-[#8B93A1]">{resource.createdDate || 'Aug 2026'}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[#242832]/60">
                <span className="text-[#8B93A1]">Last Indexed</span>
                <span className="font-mono text-[#8B93A1]">{resource.updatedDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8B93A1]">Embedding Model</span>
                <span className="font-mono text-[11px] text-[#FF6B35]">text-embed-3 (1536d)</span>
              </div>
            </div>
          </Card>

          {/* Used By Agents Card */}
          <Card className="p-4 bg-[#111318] border-[#242832] space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-[#5C6370] tracking-wider">
                Used By Agents ({resource.usedByAgents.length})
              </h3>
              <button
                onClick={() => setAttachModalOpen(true)}
                className="text-xs text-[#FF6B35] hover:underline flex items-center gap-1 font-medium"
              >
                <Plus className="w-3 h-3" />
                <span>Attach</span>
              </button>
            </div>

            <div className="space-y-2">
              {attachedAgentsDetails.map((agent) => (
                <div
                  key={agent.name}
                  className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832] flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-[#111318] border border-[#242832] flex items-center justify-center text-[#FF6B35] shrink-0">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/dashboard/agents/${agent.id}`}
                        className="text-xs font-medium text-[#F5F5F7] hover:text-[#FF6B35] transition-colors truncate block flex items-center gap-1"
                      >
                        <span className="truncate">{agent.name}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </Link>
                      <div className="text-[10px] font-mono text-[#5C6370] truncate">
                        {agent.taskCount} tasks • {agent.successRate}%
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveAgent(agent.name)}
                    aria-label={`Detach ${agent.name}`}
                    className="text-[#5C6370] hover:text-[#F04438] transition-colors p-1 opacity-0 group-hover:opacity-100"
                    title="Detach from agent"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Attach Agent Modal */}
      <AttachAgentModal
        isOpen={attachModalOpen}
        onClose={() => setAttachModalOpen(false)}
        resourceName={resource.name}
        alreadyAttachedAgents={resource.usedByAgents}
        onAttach={handleAttachAgent}
      />

      {/* Add Section Modal */}
      <Modal
        isOpen={isAddingSection}
        onClose={() => setIsAddingSection(false)}
        title="Add Knowledge Section"
        description="Append a structured clause or business rule to this document."
      >
        <form onSubmit={handleAddSection} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
              Section Title
            </label>
            <Input
              placeholder="e.g., Minimum ARR Requirements"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
              Section Content
            </label>
            <Textarea
              placeholder="Detail specific qualification rules, numbers, and operational directives..."
              value={newSectionContent}
              onChange={(e) => setNewSectionContent(e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAddingSection(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Section
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
