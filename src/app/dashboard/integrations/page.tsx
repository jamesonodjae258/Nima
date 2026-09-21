'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Modal } from '@/components/ui/Modal';
import { initialIntegrations } from '@/data/mockData';
import { Integration } from '@/types';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Settings2,
  RefreshCw,
  Power,
  ShieldCheck,
} from 'lucide-react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const categories = [
    { id: 'all', label: 'All Tools', count: integrations.length },
    { id: 'CRM', label: 'CRM', count: integrations.filter((i) => i.category === 'CRM').length },
    { id: 'Communication', label: 'Communication', count: integrations.filter((i) => i.category === 'Communication').length },
    { id: 'Productivity', label: 'Productivity', count: integrations.filter((i) => i.category === 'Productivity').length },
    { id: 'Payments', label: 'Payments', count: integrations.filter((i) => i.category === 'Payments').length },
  ];

  const handleToggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'connected' ? 'disconnected' : 'connected',
              lastSync: item.status === 'connected' ? 'Never' : 'Just now',
            }
          : item
      )
    );
    if (selectedIntegration && selectedIntegration.id === id) {
      setSelectedIntegration((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === 'connected' ? 'disconnected' : 'connected',
            }
          : null
      );
    }
  };

  const filteredIntegrations = integrations.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F7]">
            Integrations
          </h1>
          <p className="text-sm text-[#8B93A1] mt-1">
            Connect Nima to the tools your team already uses.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8B93A1] bg-[#111318] border border-[#242832] px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-[#32D583]" />
          <span>SOC2 Type II Encrypted Connectors</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="pt-2">
        <Tabs
          items={categories}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {filteredIntegrations.map((item) => {
          const isConnected = item.status === 'connected';

          return (
            <Card
              key={item.id}
              className="p-5 flex flex-col justify-between hover:border-[#3D4454] transition-colors group"
            >
              <div>
                {/* Header: Icon, Name, Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#171A21] border border-[#242832] flex items-center justify-center font-bold text-sm text-[#F5F5F7] group-hover:border-[#FF6B35]/40 transition-colors">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#F5F5F7] tracking-tight group-hover:text-white transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase text-[#5C6370]">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <Badge variant={isConnected ? 'success' : 'default'} size="sm">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-xs text-[#8B93A1] mt-3 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Connection Meta */}
                <div className="mt-4 pt-3 border-t border-[#242832]/60 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-[#5C6370]">
                    <span>Active Agents:</span>
                    <span className="text-[#F5F5F7] font-medium font-mono">
                      {item.activeAgents} agents linked
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#5C6370]">
                    <span>Last Sync:</span>
                    <span className="font-mono text-[#8B93A1]">{item.lastSync}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3.5 border-t border-[#242832]/60 flex items-center justify-between gap-2">
                <Button
                  variant={isConnected ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleToggleConnection(item.id)}
                  className="flex-1 text-xs"
                >
                  <Power className="w-3 h-3 mr-1.5" />
                  <span>{isConnected ? 'Disconnect' : 'Connect'}</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedIntegration(item)}
                  className="text-xs text-[#8B93A1] hover:text-[#F5F5F7]"
                >
                  <span>Manage</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Integration Management Modal */}
      <Modal
        isOpen={!!selectedIntegration}
        onClose={() => setSelectedIntegration(null)}
        title={`${selectedIntegration?.name} Configuration`}
        description={`Manage credentials, webhook endpoints, and agent permissions for ${selectedIntegration?.name}.`}
      >
        {selectedIntegration && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#0E1015] border border-[#242832] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B93A1]">Authentication Method:</span>
                <span className="font-mono text-[#F5F5F7]">{selectedIntegration.authMethod}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B93A1]">Sync Frequency:</span>
                <span className="font-mono text-[#FF6B35]">{selectedIntegration.syncFrequency}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#8B93A1]">Current Status:</span>
                <Badge variant={selectedIntegration.status === 'connected' ? 'success' : 'default'} size="sm">
                  {selectedIntegration.status}
                </Badge>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-semibold text-[#F5F5F7]">Security & Scopes</span>
              <p className="text-[#8B93A1] leading-relaxed">
                Nima uses least-privilege token delegation. Agents cannot perform destructive operations without explicit admin policy elevation.
              </p>
            </div>

            <div className="pt-3 border-t border-[#242832] flex items-center justify-between">
              <Button
                variant={selectedIntegration.status === 'connected' ? 'danger' : 'primary'}
                size="sm"
                onClick={() => handleToggleConnection(selectedIntegration.id)}
              >
                {selectedIntegration.status === 'connected' ? 'Revoke Access' : 'Authenticate Connector'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedIntegration(null)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
