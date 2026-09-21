'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { Shield, Bell, Cpu, User, Building2, Key, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('workspace');
  const [saved, setSaved] = useState(false);

  // Form states
  const [workspaceName, setWorkspaceName] = useState('Personal workspace');
  const [adminName, setAdminName] = useState('James');
  const [adminEmail, setAdminEmail] = useState('james@enterprise.io');
  const [defaultModel, setDefaultModel] = useState('Nima Core v2.4 (Enterprise)');
  const [safetyLimit, setSafetyLimit] = useState('100');
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const tabs = [
    { id: 'workspace', label: 'Workspace', icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-3.5 h-3.5" /> },
    { id: 'ai', label: 'Runtime & Models', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
          Settings
        </h1>
        <p className="text-sm text-[#8B93A1] mt-1">
          Manage workspace settings, team members, security policies, and AI autonomy guardrails.
        </p>
      </div>

      {/* Tabs */}
      <div className="pt-2">
        <Tabs
          items={tabs}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* Tab Panels */}
      <form onSubmit={handleSave}>
        {activeTab === 'workspace' && (
          <Card className="p-6 space-y-6 border-[#242832]">
            <div className="border-b border-[#242832] pb-4">
              <h3 className="text-base font-semibold text-[#F5F5F7]">Workspace Details</h3>
              <p className="text-xs text-[#8B93A1] mt-0.5">Basic identity and operational region for this Nima environment.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Workspace Name
                </label>
                <Input
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Workspace Domain / Slug
                </label>
                <Input
                  value="nima.app/workspace/james-personal"
                  disabled
                  className="text-[#8B93A1] bg-[#0E1015]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Current Plan
                </label>
                <div className="p-3 rounded-lg bg-[#0E1015] border border-[#242832] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium text-[#F5F5F7]">Enterprise Venture Tier</div>
                    <div className="text-[11px] text-[#5C6370]">Unlimited autonomous workflows • Dedicated VPC sandboxing</div>
                  </div>
                  <Badge variant="orange" size="sm">Active</Badge>
                </div>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card className="p-6 space-y-6 border-[#242832]">
            <div className="border-b border-[#242832] pb-4">
              <h3 className="text-base font-semibold text-[#F5F5F7]">User Profile</h3>
              <p className="text-xs text-[#8B93A1] mt-0.5">Your personal credentials and workspace role.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#FFB49B] flex items-center justify-center text-white font-bold text-lg shadow-md">
                  J
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F5F5F7]">{adminName}</div>
                  <div className="text-xs text-[#8B93A1]">Workspace Owner & Administrator</div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Full Name
                </label>
                <Input
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'notifications' && (
          <Card className="p-6 space-y-6 border-[#242832]">
            <div className="border-b border-[#242832] pb-4">
              <h3 className="text-base font-semibold text-[#F5F5F7]">Notifications & Escalations</h3>
              <p className="text-xs text-[#8B93A1] mt-0.5">Choose how and when Nima alerts you regarding agent actions.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0E1015] border border-[#242832]">
                <div>
                  <div className="text-xs font-medium text-[#F5F5F7]">Slack Escalation Alerts</div>
                  <div className="text-[11px] text-[#8B93A1]">Notify #customer-success on critical ticket anomalies</div>
                </div>
                <input
                  type="checkbox"
                  checked={slackAlerts}
                  onChange={(e) => setSlackAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#FF6B35] accent-[#FF6B35]"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0E1015] border border-[#242832]">
                <div>
                  <div className="text-xs font-medium text-[#F5F5F7]">Daily Executive Digest Email</div>
                  <div className="text-[11px] text-[#8B93A1]">Summary of completed tasks, hours saved, and leads synced</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#FF6B35] accent-[#FF6B35]"
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'ai' && (
          <Card className="p-6 space-y-6 border-[#242832]">
            <div className="border-b border-[#242832] pb-4">
              <h3 className="text-base font-semibold text-[#F5F5F7]">AI Guardrails & Model Preferences</h3>
              <p className="text-xs text-[#8B93A1] mt-0.5">Configure autonomous limits and model execution policies.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Default Reasoning Model
                </label>
                <select
                  value={defaultModel}
                  onChange={(e) => setDefaultModel(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-[#242832] bg-[#111318] px-3 py-1 text-sm text-[#F5F5F7] outline-none focus:border-[#FF6B35]"
                >
                  <option value="Nima Core v2.4 (Enterprise)">Nima Core v2.4 (Enterprise - Low Latency)</option>
                  <option value="Claude 3.7 Sonnet (Reasoning Engine)">Claude 3.7 Sonnet (Extended Reasoning)</option>
                  <option value="OpenAI GPT-4o (Multimodal)">OpenAI GPT-4o (Multimodal)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Max Autonomous Tasks per Agent / Day
                </label>
                <Input
                  type="number"
                  value={safetyLimit}
                  onChange={(e) => setSafetyLimit(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0E1015] border border-[#242832]">
                <div>
                  <div className="text-xs font-medium text-[#F5F5F7]">Require Human Confirmation for Bulk Changes</div>
                  <div className="text-[11px] text-[#8B93A1]">Require approval before updating &gt;50 CRM records or emailing leads</div>
                </div>
                <input
                  type="checkbox"
                  checked={requireConfirmation}
                  onChange={(e) => setRequireConfirmation(e.target.checked)}
                  className="w-4 h-4 rounded text-[#FF6B35] accent-[#FF6B35]"
                />
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card className="p-6 space-y-6 border-[#242832]">
            <div className="border-b border-[#242832] pb-4">
              <h3 className="text-base font-semibold text-[#F5F5F7]">Security & API Tokens</h3>
              <p className="text-xs text-[#8B93A1] mt-0.5">Manage token boundaries, multi-factor authentication, and encryption keys.</p>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="p-3.5 rounded-lg bg-[#0E1015] border border-[#242832] flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-[#F5F5F7]">Multi-Factor Authentication (MFA)</div>
                  <div className="text-[11px] text-[#32D583]">Enforced for all workspace members</div>
                </div>
                <Badge variant="success" size="sm">Enforced</Badge>
              </div>

              <div>
                <label className="text-xs font-medium text-[#F5F5F7] block mb-1.5">
                  Workspace API Secret Key
                </label>
                <div className="flex gap-2">
                  <Input
                    value="nima_live_sec_89f3a928e10471b0..."
                    disabled
                    className="font-mono text-xs text-[#8B93A1] bg-[#0E1015]"
                  />
                  <Button variant="secondary" size="sm" type="button">
                    Roll Key
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Save Bar */}
        <div className="pt-6 flex items-center gap-3">
          <Button type="submit">
            Save changes
          </Button>
          {saved && (
            <span className="text-xs font-medium text-[#32D583] flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Settings updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
