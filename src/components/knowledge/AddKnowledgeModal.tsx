'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { KnowledgeResource, KnowledgeCategoryType } from '@/types';
import {
  UploadCloud,
  Globe,
  FileCode,
  Database,
  CheckCircle2,
  FileText,
} from 'lucide-react';

interface AddKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddResource: (resource: KnowledgeResource) => void;
}

type ModeType = 'document' | 'website' | 'instruction' | 'datasource';

export function AddKnowledgeModal({ isOpen, onClose, onAddResource }: AddKnowledgeModalProps) {
  const [mode, setMode] = useState<ModeType>('document');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [, setCategory] = useState<KnowledgeCategoryType>('Documents');

  // Mode specific fields
  const [url, setUrl] = useState('');
  const [crawlDepth, setCrawlDepth] = useState('2');
  const [instructionContent, setInstructionContent] = useState('');
  const [dataSource, setDataSource] = useState('HubSpot CRM');
  const [fileName, setFileName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const resetForm = () => {
    setName('');
    setDescription('');
    setUrl('');
    setInstructionContent('');
    setFileName('');
    setSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      let type = 'Document';
      let cat: KnowledgeCategoryType = 'Documents';
      let size = '32 KB';
      const sections = [];

      if (mode === 'document') {
        type = fileName.endsWith('.md') ? 'Markdown' : 'Document';
        cat = 'Documents';
        size = '1.2 MB';
        sections.push({
          title: 'Document Overview',
          content: description || 'Vectorized document chunks ready for semantic agent retrieval.',
        });
      } else if (mode === 'website') {
        type = 'Website';
        cat = 'Websites';
        size = '480 KB';
        sections.push({
          title: 'Crawled Source',
          content: `Indexed domain ${url || 'https://example.com'} up to depth ${crawlDepth}.`,
        });
      } else if (mode === 'instruction') {
        type = 'Instruction';
        cat = 'Instructions';
        size = '18 KB';
        sections.push({
          title: 'Agent Directives',
          content: instructionContent || description || 'Follow these precise operational guardrails.',
        });
      } else if (mode === 'datasource') {
        type = 'Data';
        cat = 'Data';
        size = '2.4 MB';
        sections.push({
          title: 'Connected Stream',
          content: `Real-time read replica connected to ${dataSource}.`,
        });
      }

      const newResource: KnowledgeResource = {
        id: `res-${Date.now()}`,
        name: name.trim(),
        type,
        category: cat,
        createdDate: 'Just now',
        updatedDate: 'Just now',
        usedByAgents: ['Lead Researcher'],
        status: 'Synced',
        size,
        description: description.trim() || `Contextual knowledge indexed for autonomous agents.`,
        itemsCount: Math.floor(Math.random() * 20) + 5,
        tags: [type, cat, 'Knowledge'],
        sections,
      };

      onAddResource(newResource);
      setIsSubmitting(false);
      setSuccess(true);

      setTimeout(() => {
        resetForm();
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (!isSubmitting) {
          resetForm();
          onClose();
        }
      }}
      title="Add Knowledge Source"
      description="Give your agents ground-truth context, domain guidelines, and real-time knowledge."
    >
      {success ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#32D583]/10 border border-[#32D583]/30 flex items-center justify-center text-[#32D583] mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-medium text-[#F5F5F7]">Knowledge Synced & Vectorized</h4>
          <p className="text-xs text-[#8B93A1]">
            &ldquo;{name}&rdquo; is now available for connected agents to query.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Source Type Selector (4 options) */}
          <div>
            <label className="text-xs font-mono uppercase text-[#5C6370] block mb-2">
              Knowledge Source Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMode('document');
                  setCategory('Documents');
                }}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  mode === 'document'
                    ? 'bg-[#171A21] border-[#FF6B35] text-[#F5F5F7] shadow-[0_0_12px_rgba(255,107,53,0.2)]'
                    : 'bg-[#111318] border-[#242832] text-[#8B93A1] hover:border-[#3D4454]'
                }`}
              >
                <FileText className={`w-4 h-4 mb-1.5 ${mode === 'document' ? 'text-[#FF6B35]' : 'text-[#8B93A1]'}`} />
                <div className="text-xs font-medium">Upload doc</div>
                <div className="text-[10px] text-[#5C6370] truncate">PDF, Markdown</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('website');
                  setCategory('Websites');
                }}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  mode === 'website'
                    ? 'bg-[#171A21] border-[#FF6B35] text-[#F5F5F7] shadow-[0_0_12px_rgba(255,107,53,0.2)]'
                    : 'bg-[#111318] border-[#242832] text-[#8B93A1] hover:border-[#3D4454]'
                }`}
              >
                <Globe className={`w-4 h-4 mb-1.5 ${mode === 'website' ? 'text-[#FF6B35]' : 'text-[#8B93A1]'}`} />
                <div className="text-xs font-medium">Add website</div>
                <div className="text-[10px] text-[#5C6370] truncate">Crawl docs or URL</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('instruction');
                  setCategory('Instructions');
                }}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  mode === 'instruction'
                    ? 'bg-[#171A21] border-[#FF6B35] text-[#F5F5F7] shadow-[0_0_12px_rgba(255,107,53,0.2)]'
                    : 'bg-[#111318] border-[#242832] text-[#8B93A1] hover:border-[#3D4454]'
                }`}
              >
                <FileCode className={`w-4 h-4 mb-1.5 ${mode === 'instruction' ? 'text-[#FF6B35]' : 'text-[#8B93A1]'}`} />
                <div className="text-xs font-medium">Instruction</div>
                <div className="text-[10px] text-[#5C6370] truncate">Guidelines & rules</div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode('datasource');
                  setCategory('Data');
                }}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  mode === 'datasource'
                    ? 'bg-[#171A21] border-[#FF6B35] text-[#F5F5F7] shadow-[0_0_12px_rgba(255,107,53,0.2)]'
                    : 'bg-[#111318] border-[#242832] text-[#8B93A1] hover:border-[#3D4454]'
                }`}
              >
                <Database className={`w-4 h-4 mb-1.5 ${mode === 'datasource' ? 'text-[#FF6B35]' : 'text-[#8B93A1]'}`} />
                <div className="text-xs font-medium">Data source</div>
                <div className="text-[10px] text-[#5C6370] truncate">CRM, DB, Sheets</div>
              </button>
            </div>
          </div>

          {/* Common name input */}
          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
              Resource Title
            </label>
            <Input
              placeholder={
                mode === 'document'
                  ? 'e.g., Enterprise Sales Playbook 2026'
                  : mode === 'website'
                  ? 'e.g., Developer Documentation Portal'
                  : mode === 'instruction'
                  ? 'e.g., Executive Tone of Voice Rules'
                  : 'e.g., HubSpot CRM Qualified Deals'
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Mode-specific input fields */}
          {mode === 'document' && (
            <div className="space-y-3">
              <div
                onClick={() => setFileName('q3_enterprise_sales_strategy.md')}
                className="p-4 rounded-xl border border-dashed border-[#242832] bg-[#0E1015] hover:border-[#3D4454] transition-colors text-center cursor-pointer"
              >
                <UploadCloud className="w-5 h-5 text-[#8B93A1] mx-auto mb-1.5" />
                <div className="text-xs text-[#F5F5F7] font-medium">
                  {fileName ? (
                    <span className="text-[#32D583] flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {fileName} (ready to sync)
                    </span>
                  ) : (
                    'Click to upload or drag & drop'
                  )}
                </div>
                <div className="text-[10px] text-[#5C6370] mt-0.5">
                  Markdown (.md), PDF, TXT or DOCX up to 25MB
                </div>
              </div>
            </div>
          )}

          {mode === 'website' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Website or Documentation URL
                </label>
                <Input
                  placeholder="https://docs.nima.ai/reference"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  type="url"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#8B93A1]">
                <span>Crawl Depth (sub-pages)</span>
                <select
                  aria-label="Crawl Depth"
                  value={crawlDepth}
                  onChange={(e) => setCrawlDepth(e.target.value)}
                  className="bg-[#171A21] border border-[#242832] rounded px-2 py-1 text-xs text-[#F5F5F7] focus:outline-none"
                >
                  <option value="1">1 level (single page)</option>
                  <option value="2">2 levels (recommended)</option>
                  <option value="3">3 levels (deep crawl)</option>
                </select>
              </div>
            </div>
          )}

          {mode === 'instruction' && (
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Instruction Text & Directives
              </label>
              <Textarea
                placeholder="Enter exact behavioral guidelines, policies, or restrictions agents must adhere to..."
                value={instructionContent}
                onChange={(e) => setInstructionContent(e.target.value)}
                rows={4}
              />
            </div>
          )}

          {mode === 'datasource' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Connected Source
                </label>
                <select
                  aria-label="Connected Source"
                  value={dataSource}
                  onChange={(e) => setDataSource(e.target.value)}
                  className="w-full bg-[#171A21] border border-[#242832] rounded-lg px-3 py-2 text-xs text-[#F5F5F7] focus:outline-none focus:border-[#FF6B35]"
                >
                  <option value="HubSpot CRM">HubSpot CRM (Connected • 3 agents active)</option>
                  <option value="Notion Knowledge Base">Notion Workspace (Connected • 2 agents active)</option>
                  <option value="Google Sheets">Google Sheets Financial Tracker</option>
                  <option value="PostgreSQL Replica">PostgreSQL Read Replica</option>
                </select>
              </div>
              <div className="p-2.5 rounded-lg bg-[#171A21] border border-[#242832] text-[11px] text-[#8B93A1] flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                <span>Syncs on every task execution. Read-only permissions enforced.</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
              Context Description (for semantic retrieval)
            </label>
            <Textarea
              placeholder="Summarize what information this resource contains and when agents should consult it..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#242832]">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !name.trim()}>
              {isSubmitting ? 'Vectorizing...' : 'Save & Vectorize'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
