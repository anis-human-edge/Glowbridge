import { useState } from 'react';
import { Users, Loader2, ShieldCheck, Mail } from 'lucide-react';
import { useApprovedBrands, useApprovedCreators } from '../../hooks/useAdmin';

export default function AdminDirectory() {
  const [activeTab, setActiveTab] = useState<'brands'|'creators'>('brands');

  const { data: brands, isLoading: brandsLoading } = useApprovedBrands();
  const { data: creators, isLoading: creatorsLoading } = useApprovedCreators();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">Protocol Directory</h1>
          <p className="text-sm text-ink/60 mt-1">Manage all active and approved members of the Glowbridge Protocol.</p>
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
           {brands?.length === 0 && <div className="p-10 text-center text-ink/50 bg-surfaceHover rounded-xl border border-ink/5">No active brand members yet.</div>}
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {brands?.map(b => (
               <div key={b.id} className="bg-white border border-ink/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-moss"></div>
                 <div className="flex justify-between items-start mb-4">
                   <div>
                     <h3 className="text-lg font-medium text-ink">{b.company_name}</h3>
                     <p className="text-xs text-ink/50 font-mono mt-1">{b.hq_location || 'Global'}</p>
                   </div>
                   <ShieldCheck className="w-5 h-5 text-moss" />
                 </div>
                 
                 <div className="space-y-2 mb-6">
                   <div className="text-sm flex justify-between">
                     <span className="text-ink/60">Tier</span>
                     <span className="font-medium text-ink capitalize">{'Protocol'}</span>
                   </div>
                   <div className="text-sm flex justify-between">
                     <span className="text-ink/60">Joined</span>
                     <span className="font-medium text-ink">{new Date(b.created_at).toLocaleDateString()}</span>
                   </div>
                 </div>

                 <button className="w-full py-2 bg-surfaceHover hover:bg-stone text-ink text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                   <Mail className="w-4 h-4 text-ink/50" />
                   Contact Brand
                 </button>
               </div>
             ))}
           </div>
        </div>
      ) : (
        <div className="space-y-4">
           {creatorsLoading && <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 animate-spin text-ink/40" /></div>}
           {creators?.length === 0 && <div className="p-10 text-center text-ink/50 bg-surfaceHover rounded-xl border border-ink/5">No active creators yet.</div>}
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {creators?.map(c => (
               <div key={c.id} className="bg-white border border-ink/5 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-clay"></div>
                 <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-stone flex items-center justify-center">
                       <Users className="w-4 h-4 text-ink/40" />
                     </div>
                     <div>
                       <h3 className="text-sm font-medium text-ink">@{c.instagram_handle || c.tiktok_handle}</h3>
                       <p className="text-xs text-ink/50 capitalize mt-0.5">{c.tier} Tier</p>
                     </div>
                   </div>
                   <ShieldCheck className="w-5 h-5 text-clay" />
                 </div>
                 
                 <div className="space-y-2 mb-6">
                   <div className="text-sm flex justify-between">
                     <span className="text-ink/60">Followers</span>
                     <span className="font-medium text-ink">{c.follower_count ? c.follower_count.toLocaleString() : 'N/A'}</span>
                   </div>
                   <div className="text-sm flex justify-between">
                     <span className="text-ink/60">Joined</span>
                     <span className="font-medium text-ink">{new Date(c.created_at).toLocaleDateString()}</span>
                   </div>
                 </div>

                 <button className="w-full py-2 bg-surfaceHover hover:bg-stone text-ink text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                   <Mail className="w-4 h-4 text-ink/50" />
                   Contact Creator
                 </button>
               </div>
             ))}
           </div>
        </div>
      )}
    </div>
  );
}
