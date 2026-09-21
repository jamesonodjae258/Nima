'use client';

import React, { useState } from 'react';
import { AgentMemoryItem } from '@/types';
import { mockAgentMemory } from '@/data/mockData';
import {
  Brain,
  Clock,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Tag,
  FileText,
  AlertCircle,
} from 'lucide-react';

interface AgentMemorySectionProps {
  agentId?: string;
}

export function AgentMemorySection({
  agentId = 'agent-1',
}: AgentMemorySectionProps) {
  const [memoryItems, setMemoryItems] = useState<AgentMemoryItem[]>(
    mockAgentMemory[agentId] || mockAgentMemory['agent-1']
  );
  const [selectedItem, setSelectedItem] = useState<AgentMemoryItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<AgentMemoryItem['category']>('ICP');
  const [formContent, setFormContent] = useState('');

  const handleOpenEdit = (item: AgentMemoryItem) => {
    setSelectedItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormContent(item.content);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;

    setMemoryItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              title: formTitle,
              category: formCategory,
              content: formContent,
              updatedAt: 'Updated just now',
            }
          : item
      )
    );
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleRemove = (id: string) => {
    setMemoryItems((prev) => prev.filter((item) => item.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const newItem: AgentMemoryItem = {
      id: `mem-${Date.now()}`,
      agentId,
      title: formTitle,
      category: formCategory,
      content: formContent,
      updatedAt: 'Updated just now',
    };

    setMemoryItems([newItem, ...memoryItems]);
    setIsAdding(false);
    setFormTitle('');
    setFormContent('');
  };

  return (
    <div className="bg-[#111318] border border-[#242832] rounded-xl p-5 md:p-6 shadow-xl relative space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#242832]/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-4 h-4 text-[#FF6B35]" />
            <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
              Memory
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FF6B35]/15 text-[#FFB49B] border border-[#FF6B35]/30">
              {memoryItems.length} active
            </span>
          </div>
          <p className="text-xs text-[#8B93A1]">
            This agent&apos;s persistent context, qualification boundaries, and operational vocabulary.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormTitle('');
            setFormContent('');
            setFormCategory('ICP');
            setIsAdding(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171A21] hover:bg-[#242832] border border-[#242832] text-xs text-[#F5F5F7] font-medium transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Add memory item</span>
        </button>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {memoryItems.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-[#171A21]/60 border border-[#242832] hover:border-[#3D4454] transition-colors flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#F5F5F7] group-hover:text-white transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#08090C] text-[#8B93A1] border border-[#242832]">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-1 rounded text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#242832] transition-colors cursor-pointer"
                    title="Edit memory"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="p-1 rounded text-[#8B93A1] hover:text-[#F04438] hover:bg-[#242832] transition-colors cursor-pointer"
                    title="Remove memory"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#8B93A1] leading-relaxed line-clamp-2">
                {item.content}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#5C6370] mt-3 pt-2 border-t border-[#242832]/60">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.updatedAt}
              </span>
              <button
                type="button"
                onClick={() => handleOpenEdit(item)}
                className="text-[#FF6B35] hover:underline cursor-pointer"
              >
                View & Edit →
              </button>
            </div>
          </div>
        ))}

        {memoryItems.length === 0 && (
          <div className="col-span-2 p-8 rounded-xl bg-[#08090C] border border-[#242832] text-center">
            <Brain className="w-6 h-6 text-[#8B93A1]/50 mx-auto mb-2" />
            <div className="text-xs text-[#8B93A1]">No memory items stored. Add context to prevent repetitive prompting.</div>
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[#111318] border border-[#242832] rounded-xl shadow-2xl p-6 relative space-y-4">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setIsAdding(false);
              }}
              className="absolute top-4 right-4 text-[#8B93A1] hover:text-[#F5F5F7] p-1.5 rounded-lg hover:bg-[#171A21] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="text-[11px] font-mono text-[#FF6B35] uppercase font-semibold">
                {isEditing ? 'Edit Memory Item' : 'New Persistent Memory'}
              </div>
              <h3 className="text-base font-bold text-[#F5F5F7] mt-0.5">
                {isEditing ? `Update ${selectedItem?.title}` : 'Store Agent Context'}
              </h3>
            </div>

            <form onSubmit={isEditing ? handleSaveEdit : handleSaveNew} className="space-y-3.5">
              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Qualification criteria"
                  required
                  className="w-full px-3 py-2 bg-[#08090C] border border-[#242832] rounded-lg text-xs text-[#F5F5F7] outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#08090C] border border-[#242832] rounded-lg text-xs text-[#F5F5F7] outline-none focus:border-[#FF6B35] cursor-pointer"
                >
                  <option value="ICP">ICP</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Markets">Markets</option>
                  <option value="Terminology">Terminology</option>
                  <option value="Preferences">Preferences</option>
                  <option value="Workflows">Workflows</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Context & Directives
                </label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Exact criteria, rules, or operational heuristics the agent should remember..."
                  rows={4}
                  required
                  className="w-full px-3 py-2 bg-[#08090C] border border-[#242832] rounded-lg text-xs text-[#F5F5F7] outline-none focus:border-[#FF6B35] leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#242832]">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setIsAdding(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#8B93A1] hover:text-[#F5F5F7] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#E95724] text-[#08090C] text-xs font-semibold transition-colors cursor-pointer"
                >
                  {isEditing ? 'Save changes' : 'Save to memory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
