import { useState } from 'react';
import { Shield, ShieldAlert, Check, X, Loader2 } from 'lucide-react';
import { usePendingBrands, usePendingCreators, useUpdateBrandStatus, useUpdateCreatorStatus } from '../../hooks/useAdmin';

export default function AdminQueue() {
  const [activeTab, setActiveTab] = useState<'brands'|'creators'>('brands');

  const { data: brands, isLoading: brandsLoading } = usePendingBrands();
  const { data: creators, isLoading: creatorsLoading } = usePendingCreators();
  
  const { mutateAsync: updateBrand, isPending: updatingBrand } = useUpdateBrandStatus();
  const { mutateAsync: updateCreator, isPending: updatingCreator } = useUpdateCreatorStatus();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">Curation Queue</h1>
          <p className="text-sm text-ink/60 mt-1">Review inbound applications against Glowbridge strict curation criteria.</p>
        </div>
        <div className="flex p-1 bg-stone/50 border border-ink/5 rounded-lg text-sm">
           <button 
             onClick={() => setActiveTab('brands')}
             className={`px-4 py-1.5 rounded-md font-medium transition-all ${activeTab === 'brands' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'}`}
           >
             Brands ({brands?.length || 0})
           </button>
           <button 
             onClick={() => setActiveTab('creators')}
             className={`px-4 py-1.5 rounded-md font-medium transition-all ${activeTab === 'creators' ? 'bg-white text-ink shadow-sm' : 'text-ink/60 hover:text-ink'}`}
           >
             Creators ({creators?.length || 0})
           </button>
        </div>
      </header>

      {activeTab === 'brands' ? (
        <div className="space-y-4">
           {brandsLoading && <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-ink/40" /></div>}
           {brands?.length === 0 && <div className="p-10 text-center text-ink/50 bg-surfaceHover rounded-xl border border-ink/5">No pending brand applications.</div>}
           
           {brands?.map(b => (
             <div key={b.id} className="bg-white border border-ink/5 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group">
                 <div className="flex-1 space-y-4">
                   <div className="flex items-center gap-3">
                     <h3 className="text-xl font-medium text-ink">{b.company_name}</h3>
                     <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-stone text-ink/60">{b.hq_location || 'Unknown Origin'}</span>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-6 bg-surfaceHover rounded-xl p-4 border border-ink/5">
                      <div>
                        <div className="text-xs font-mono text-ink/50 uppercase mb-1 tracking-wider">Submitted Website</div>
                        <div className="font-medium text-ink text-sm truncate">{b.website || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-ink/50 uppercase mb-1 tracking-wider">Social/Market Traction</div>
                        <div className="font-medium text-ink text-sm flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-moss" />
                          Pending Verification
                        </div>
                      </div>
                   </div>

                   <p className="text-sm text-ink/70 max-w-2xl leading-relaxed font-medium">
                     Admin note: New application. Please review external documentation before approving this brand into the protocol.
                   </p>
                </div>

                <div className="md:w-64 shrink-0 flex flex-col gap-3">
                   <div className="bg-moss/5 border border-moss/10 rounded-xl p-4 mb-2">
                     <div className="text-xs font-mono text-moss uppercase tracking-wider mb-2 text-center">Glowbridge Score</div>
                     <div className="text-4xl font-serif italic text-moss text-center">--<span className="text-lg opacity-50">/100</span></div>
                   </div>
                   <button 
                     disabled={updatingBrand}
                     onClick={() => updateBrand({ id: b.id, status: 'approved' })} 
                     className="w-full py-2.5 rounded-lg bg-ink text-white font-medium hover:bg-forest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     {updatingBrand ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Approve & Invite
                   </button>
                   <button 
                     disabled={updatingBrand}
                     onClick={() => updateBrand({ id: b.id, status: 'rejected' })} 
                     className="w-full py-2.5 rounded-lg border border-ink/10 text-ink/70 font-medium hover:bg-stone hover:text-ink transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     <X className="w-4 h-4" /> Reject Applicant
                   </button>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="space-y-4">
           {creatorsLoading && <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-ink/40" /></div>}
           {creators?.length === 0 && <div className="p-10 text-center text-ink/50 bg-surfaceHover rounded-xl border border-ink/5">No pending creator applications.</div>}
           
           {creators?.map(c => (
             <div key={c.id} className="bg-white border border-ink/5 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group">
                 <div className="flex-1 space-y-4">
                   <div className="flex items-center justify-between">
                     <h3 className="text-xl font-medium text-ink">{c.instagram_handle || c.tiktok_handle || 'Unknown Handle'}</h3>
                     {c.instagram_handle && (
                       <a href={`https://instagram.com/${c.instagram_handle.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-clay hover:underline">View Social Profile ↗</a>
                     )}
                   </div>
                   
                   <div className="grid md:grid-cols-3 gap-6 bg-surfaceHover rounded-xl p-4 border border-ink/5">
                      <div>
                        <div className="text-xs font-mono text-ink/50 uppercase mb-1 tracking-wider">Follower Count</div>
                        <div className="font-medium text-ink">{c.follower_count ? c.follower_count.toLocaleString() : 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-ink/50 uppercase mb-1 tracking-wider">Style Focus</div>
                        <div className="font-medium text-ink flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-moss" />
                          General
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-ink/50 uppercase mb-1 tracking-wider">Requested Tier</div>
                        <div className="font-medium capitalize text-ink">{c.tier}</div>
                      </div>
                   </div>

                   <p className="text-sm text-ink/70 max-w-2xl leading-relaxed font-medium">
                     Admin note: Please verify {c.instagram_handle || 'this account'}'s social audience sizing and content quality before elevating them to {c.tier} status.
                   </p>
                </div>

                <div className="md:w-64 shrink-0 flex flex-col gap-3 justify-center h-full">
                   <button 
                     disabled={updatingCreator}
                     onClick={() => updateCreator({ id: c.id, status: 'approved' })} 
                     className="w-full py-2.5 rounded-lg bg-ink text-white font-medium hover:bg-forest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     {updatingCreator ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Accept & Elevate
                   </button>
                   <button 
                     disabled={updatingCreator}
                     onClick={() => updateCreator({ id: c.id, status: 'rejected' })} 
                     className="w-full py-2.5 rounded-lg border border-ink/10 text-ink/70 font-medium hover:bg-stone hover:text-ink transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                   >
                     <X className="w-4 h-4" /> Decline
                   </button>
                   <button className="w-full py-2.5 rounded-lg bg-stone/30 text-ink/70 font-medium hover:bg-stone transition-colors flex items-center justify-center gap-2 mt-2">
                     <ShieldAlert className="w-4 h-4" /> Flag for Review
                   </button>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}
