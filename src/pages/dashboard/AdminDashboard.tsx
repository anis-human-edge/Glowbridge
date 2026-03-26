import { Users, FileStack } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-semibold text-ink tracking-tight">HQ Operations Overview</h1>
        <p className="text-sm text-ink/60 mt-1">Platform health, pending reviews, and curation queue.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Pending Brands</div>
          <div className="text-3xl font-semibold text-ink">12</div>
          <Link to="/dashboard/admin/queue" className="text-sm font-medium text-moss hover:text-forest transition-colors mt-2 inline-flex items-center gap-1">
            Review Queue →
          </Link>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Pending Creators</div>
          <div className="text-3xl font-semibold text-ink">45</div>
          <Link to="/dashboard/admin/queue" className="text-sm font-medium text-clay hover:text-ink transition-colors mt-2 inline-flex items-center gap-1">
            Check social signal metrics →
          </Link>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Upcoming Showcases</div>
          <div className="text-3xl font-semibold text-ink">3</div>
          <div className="text-sm text-ink/60 mt-2">Next: Hydration Drop (2 days)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h2 className="text-lg font-semibold text-ink">Recent Approvals</h2>
            <div className="bg-white border text-left border-ink/5 rounded-2xl shadow-sm overflow-hidden flex flex-col">
               <div className="p-4 border-b border-ink/5 flex items-center justify-between hover:bg-surfaceHover">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone flex items-center justify-center shrink-0">
                     <FileStack className="w-5 h-5 text-ink/40" />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-ink">Round Lab Skincare</h4>
                     <p className="text-xs text-ink/60">Brand | South Korea</p>
                   </div>
                 </div>
                 <span className="text-xs font-mono text-moss uppercase tracking-wider">Approved</span>
               </div>
               <div className="p-4 border-b border-ink/5 flex items-center justify-between hover:bg-surfaceHover">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-stone flex items-center justify-center shrink-0">
                     <Users className="w-5 h-5 text-ink/40" />
                   </div>
                   <div>
                     <h4 className="text-sm font-medium text-ink">Emma T. (@emmaskin)</h4>
                     <p className="text-xs text-ink/60">Creator | UK</p>
                   </div>
                 </div>
                 <span className="text-xs font-mono text-moss uppercase tracking-wider">Approved</span>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-lg font-semibold text-ink">Platform Signals</h2>
            <div className="bg-white border text-left border-ink/5 rounded-2xl shadow-sm overflow-hidden p-6 space-y-6">
               <div>
                  <div className="flex justify-between text-sm mb-2">
                     <span className="text-ink/70">Creator Match Rate</span>
                     <span className="font-medium text-ink">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone rounded-full overflow-hidden">
                     <div className="h-full bg-forest w-[92%] rounded-full"></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-sm mb-2">
                     <span className="text-ink/70">Average Artifact Quality Score</span>
                     <span className="font-medium text-ink">4.2 / 5</span>
                  </div>
                  <div className="w-full h-1.5 bg-stone rounded-full overflow-hidden">
                     <div className="h-full bg-gold w-[84%] rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
