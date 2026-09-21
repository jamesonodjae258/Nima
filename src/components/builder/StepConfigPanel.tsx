'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { WorkflowNodeData, WorkflowNodeConfig } from '@/types';
import {
  X,
  Check,
  ShieldAlert,
  SlidersHorizontal,
  Database,
  Search,
  Target,
  Users,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepConfigPanelProps {
  node: WorkflowNodeData | null;
  onClose?: () => void;
  onUpdateConfig: (nodeId: string, newConfig: Partial<WorkflowNodeConfig>) => void;
}

export const StepConfigPanel: React.FC<StepConfigPanelProps> = ({
  node,
  onClose,
  onUpdateConfig,
}) => {
  const [localConfig, setLocalConfig] = useState<WorkflowNodeConfig>(node?.config || {});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (node) {
      setLocalConfig(node.config || {});
      setSavedSuccess(false);
    }
  }, [node]);

  if (!node) {
    return (
      <div className="w-[340px] lg:w-[380px] border-l border-[#242832] bg-[#0E1015] p-6 text-center text-xs text-[#8B93A1] flex flex-col items-center justify-center">
        <SlidersHorizontal className="w-8 h-8 text-[#5C6370] mb-2" />
        <p className="font-medium text-[#F5F5F7]">No node selected</p>
        <p className="mt-1">Click any step on the canvas to configure its parameters.</p>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(node.id, localConfig);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <aside className="w-full md:w-[340px] lg:w-[380px] border-l border-[#242832] bg-[#0B0D12] h-full flex flex-col justify-between shrink-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#242832] flex items-center justify-between bg-[#0E1016]">
        <div>
          <span className="text-[10px] font-mono font-semibold uppercase text-[#FF6B35] tracking-wider">
            Step {node.stepNumber} Configuration
          </span>
          <h3 className="text-sm font-semibold text-[#F5F5F7] tracking-tight">
            {node.name}
          </h3>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#8B93A1] hover:text-[#F5F5F7] hover:bg-[#171A21] transition-colors md:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
        {/* QUALIFY STEP FORM */}
        {node.type === 'qualify' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#5C6370] font-semibold">
                Qualification Criteria
              </span>
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Company Size
              </label>
              <Input
                value={localConfig.companySize || '50–500 employees'}
                onChange={(e) =>
                  setLocalConfig({ ...localConfig, companySize: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Industry
              </label>
              <Input
                value={localConfig.industry || 'B2B SaaS'}
                onChange={(e) =>
                  setLocalConfig({ ...localConfig, industry: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Funding History
              </label>
              <Input
                value={localConfig.funding || 'Raised within the last 12 months'}
                onChange={(e) =>
                  setLocalConfig({ ...localConfig, funding: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Target Geographies
              </label>
              <Input
                value={localConfig.location?.join(', ') || 'North America, Europe'}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    location: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-[#F5F5F7]">
                  Confidence Threshold
                </label>
                <span className="text-xs font-mono text-[#32D583]">
                  {localConfig.confidenceThreshold || 85}%
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                value={localConfig.confidenceThreshold || 85}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    confidenceThreshold: parseInt(e.target.value, 10),
                  })
                }
                className="w-full accent-[#FF6B35]"
              />
              <p className="text-[10px] text-[#5C6370] mt-1">
                Prospects below this confidence score will not trigger CRM export.
              </p>
            </div>

            <Button type="submit" size="sm" className="w-full mt-2">
              Save changes
            </Button>
          </form>
        )}

        {/* RESEARCH STEP FORM */}
        {node.type === 'research' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Research Objective
              </label>
              <Textarea
                rows={3}
                value={
                  localConfig.researchObjective ||
                  'Find recently funded SaaS companies with >$5M in Series A or B funding.'
                }
                onChange={(e) =>
                  setLocalConfig({ ...localConfig, researchObjective: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                Authorized Sources
              </label>
              <div className="space-y-1.5">
                {['Company websites', 'Public databases', 'News', 'Linked sources'].map(
                  (source) => {
                    const isChecked = localConfig.sources?.includes(source) ?? true;
                    return (
                      <label
                        key={source}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[#111318] border border-[#242832] text-xs text-[#D1D5DB] cursor-pointer hover:border-[#3D4454]"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const cur = localConfig.sources || [
                              'Company websites',
                              'Public databases',
                              'News',
                              'Linked sources',
                            ];
                            const updated = e.target.checked
                              ? [...cur, source]
                              : cur.filter((s) => s !== source);
                            setLocalConfig({ ...localConfig, sources: updated });
                          }}
                          className="accent-[#FF6B35]"
                        />
                        <span>{source}</span>
                      </label>
                    );
                  }
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Maximum Results
                </label>
                <Input
                  type="number"
                  value={localConfig.maxResults || 50}
                  onChange={(e) =>
                    setLocalConfig({
                      ...localConfig,
                      maxResults: parseInt(e.target.value, 10),
                    })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                  Depth
                </label>
                <select
                  value={localConfig.depth || 'Standard'}
                  onChange={(e) =>
                    setLocalConfig({
                      ...localConfig,
                      depth: e.target.value as 'Quick' | 'Standard' | 'Deep',
                    })
                  }
                  className="flex h-9 w-full rounded-lg border border-[#242832] bg-[#111318] px-3 py-1 text-xs text-[#F5F5F7] outline-none"
                >
                  <option value="Quick">Quick</option>
                  <option value="Standard">Standard</option>
                  <option value="Deep">Deep</option>
                </select>
              </div>
            </div>

            <Button type="submit" size="sm" className="w-full mt-2">
              Save changes
            </Button>
          </form>
        )}

        {/* ENRICH STEP FORM */}
        {node.type === 'enrich' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                Target Executive Attributes
              </label>
              <div className="space-y-1.5">
                {[
                  'Decision maker',
                  'Job title',
                  'Company size',
                  'Website',
                  'LinkedIn URL',
                  'Location',
                ].map((field) => {
                  const isChecked = localConfig.fieldsToFind?.includes(field) ?? true;
                  return (
                    <label
                      key={field}
                      className="flex items-center gap-2 p-2 rounded-lg bg-[#111318] border border-[#242832] text-xs text-[#D1D5DB] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const cur = localConfig.fieldsToFind || [
                            'Decision maker',
                            'Job title',
                            'Company size',
                            'Website',
                            'LinkedIn URL',
                            'Location',
                          ];
                          const updated = e.target.checked
                            ? [...cur, field]
                            : cur.filter((f) => f !== field);
                          setLocalConfig({ ...localConfig, fieldsToFind: updated });
                        }}
                        className="accent-[#FF6B35]"
                      />
                      <span>{field}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Maximum Contacts
              </label>
              <Input
                type="number"
                value={localConfig.maxContacts || 100}
                onChange={(e) =>
                  setLocalConfig({
                    ...localConfig,
                    maxContacts: parseInt(e.target.value, 10),
                  })
                }
              />
            </div>

            <Button type="submit" size="sm" className="w-full mt-2">
              Save changes
            </Button>
          </form>
        )}

        {/* APPROVAL STEP FORM */}
        {node.type === 'approval' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="p-3.5 rounded-xl bg-[#F5B544]/10 border border-[#F5B544]/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F5B544]">
                <ShieldAlert className="w-4 h-4" />
                <span>Human Approval Boundary</span>
              </div>
              <p className="text-[11px] text-[#D1D5DB] leading-relaxed">
                Nima will pause execution before taking external actions. This reinforces{' '}
                <strong className="text-white">AUTONOMY + HUMAN CONTROL</strong>.
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-2">
                Require approval before:
              </label>
              <div className="space-y-2">
                {[
                  { key: 'updatingCrm', label: 'Updating CRM (HubSpot/Salesforce)' },
                  { key: 'sendingMessages', label: 'Sending emails or Slack messages' },
                  { key: 'creatingRecords', label: 'Creating persistent external records' },
                  { key: 'internalAnalysis', label: 'Internal research & analysis steps' },
                ].map((item) => {
                  const req = localConfig.requireApprovalBefore || {
                    updatingCrm: true,
                    sendingMessages: true,
                    creatingRecords: true,
                    internalAnalysis: false,
                  };
                  const isChecked = (req as any)[item.key] ?? false;

                  return (
                    <label
                      key={item.key}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-[#111318] border border-[#242832] text-xs text-[#D1D5DB] cursor-pointer hover:border-[#3D4454]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          setLocalConfig({
                            ...localConfig,
                            requireApprovalBefore: {
                              ...req,
                              [item.key]: e.target.checked,
                            },
                          });
                        }}
                        className="accent-[#FF6B35]"
                      />
                      <span>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <Button type="submit" size="sm" className="w-full mt-2">
              Save changes
            </Button>
          </form>
        )}

        {/* ACTION STEP FORM */}
        {node.type === 'action' && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Destination Service
              </label>
              <Input
                value={localConfig.destination || 'HubSpot'}
                onChange={(e) =>
                  setLocalConfig({ ...localConfig, destination: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Operation Action
              </label>
              <Input
                value={localConfig.action || 'Create contact'}
                onChange={(e) =>
                  setLocalConfig({ ...localConfig, action: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                Target Fields Mapped
              </label>
              <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-[#0E1015] border border-[#242832]">
                {[
                  'First name',
                  'Last name',
                  'Company',
                  'Role',
                  'Lead score',
                  'Source',
                ].map((field) => (
                  <span
                    key={field}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#171A21] border border-[#242832] text-[#8B93A1]"
                  >
                    ✓ {field}
                  </span>
                ))}
              </div>
            </div>

            <Button type="submit" size="sm" className="w-full mt-2">
              Save changes
            </Button>
          </form>
        )}

        {/* DEFAULT / TRIGGER STEP FORM */}
        {(node.type === 'trigger' || node.type === 'analyze' || node.type === 'wait' || node.type === 'send' || node.type === 'generate') && (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Step Description
              </label>
              <Textarea
                rows={3}
                value={node.description}
                onChange={() => {}}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#F5F5F7] block mb-1">
                Execution Mode
              </label>
              <div className="p-3 rounded-lg bg-[#0E1015] border border-[#242832] text-xs text-[#8B93A1]">
                Autonomous invocation with step retry guardrails.
              </div>
            </div>

            <Button type="submit" size="sm" className="w-full mt-2">
              Save changes
            </Button>
          </form>
        )}
      </div>

      {/* Footer Feedback */}
      {savedSuccess && (
        <div className="p-2.5 bg-[#32D583]/10 border-t border-[#32D583]/20 text-center text-xs text-[#32D583] flex items-center justify-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          <span>Step configuration updated</span>
        </div>
      )}
    </aside>
  );
};
