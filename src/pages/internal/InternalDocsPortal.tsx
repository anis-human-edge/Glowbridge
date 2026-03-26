import { useState, useMemo } from 'react';
import { Layers, Zap, BookMarked, ShieldCheck, ChevronRight } from 'lucide-react';
import DocReader from '../../components/internal/DocReader';

import prdDoc from '../../../docs/GlowBridge PRD.md?raw';
import contextDoc from '../../../docs/GlowBridge Context.md?raw';
import domainDoc from '../../../docs/GlowBridge Domain.md?raw';

type Tab = 'Context' | 'Domain' | 'PRD';

export default function InternalDocsPortal() {
  const [activeTab, setActiveTab] = useState<Tab>('Context');

  const content = useMemo(() => {
    if (activeTab === 'PRD') return prdDoc;
    if (activeTab === 'Context') return contextDoc;
    return domainDoc;
  }, [activeTab]);

  // Generate TOC dynamically from the active document
  const toc = useMemo(() => {
    const headers = content.split('\n').filter(line => line.startsWith('## ') || line.startsWith('# '));
    return headers.map(h => {
      const level = h.startsWith('##') ? 2 : 1;
      // Strip asterisks and hashes for clean text
      const text = h.replace(/#/g, '').replace(/\*/g, '').replace(/\\/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { level, text, id };
    });
  }, [content]);

  // Data map for our tabs
  const tabs = [
    { id: 'Context', label: 'Context Engine', icon: Layers },
    { id: 'Domain', label: 'Domain Map', icon: Zap },
    { id: 'PRD', label: 'Master PRD', icon: BookMarked },
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-ink selection:bg-moss/20 overflow-hidden">
      
      {/* LEFT PANE: Document Selection & Table of Contents */}
      <aside className="w-80 bg-[#0C1016] flex flex-col h-screen shrink-0 text-white shadow-2xl relative z-20 overflow-y-auto custom-scrollbar border-r border-white/5">
        
        {/* Branding */}
        <div className="p-8 pb-4">
          <div className="flex text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6 items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moss opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-moss"></span>
            </div>
            Protocol Clearance
          </div>
          <h1 className="flex text-xl font-medium tracking-tight items-center gap-3 text-white/90">
            <ShieldCheck className="w-5 h-5 text-moss" />
            Glowbridge HQ
          </h1>
        </div>

        {/* Document Switcher */}
        <div className="p-4 space-y-2 mt-4">
          <div className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-4 px-4">Master Architectures</div>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-moss/10 text-moss shadow-inner border border-moss/20' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Dynamic Sticky Table of Contents */}
        <div className="p-4 mt-4 border-t border-white/10 flex-1">
          <div className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-4 px-4">On This Page</div>
          <nav className="space-y-0.5 pb-20">
            {toc.map((item, i) => (
              <a 
                key={i} 
                href={`#${item.id}`}
                className={`group flex items-start gap-2 text-sm py-2 px-4 rounded-xl transition-colors ${
                  item.level === 1 
                    ? 'text-white/90 font-medium mt-6 mb-2 text-xs uppercase tracking-widest' 
                    : 'text-white/40 hover:text-white hover:bg-white/5 ml-1'
                }`}
              >
                {item.level === 2 && <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-moss transition-colors shrink-0 mt-0.5" />}
                <span className="leading-snug">{item.text}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* RIGHT PANE: Pure Premium Reading Experience */}
      <main className="flex-1 h-screen overflow-y-auto relative scroll-smooth bg-[#FDFCFB]">
        <div className="max-w-4xl mx-auto py-20 px-12 lg:px-24">
          <DocReader content={content} />
        </div>
      </main>

    </div>
  );
}
