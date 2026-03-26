import { Link } from 'react-router-dom';
import { ArrowRight, Star, Video } from 'lucide-react';

export default function CreatorDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">Welcome back, Sarah</h1>
          <p className="text-sm text-ink/60 mt-1">You have 1 pending event invite and 2 reviews due.</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-ink/5 pl-4 pr-1 py-1 rounded-full shadow-sm text-sm">
           <span className="font-medium text-ink">Level 2: Reviewer</span>
           <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-mono text-xs">84%</div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Pending Invites</div>
          <div className="text-3xl font-semibold text-ink">1</div>
          <Link to="/dashboard/creator/events" className="text-sm font-medium text-clay hover:text-ink transition-colors mt-2 inline-flex items-center gap-1">
            RSVP needed <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Pending Reviews</div>
          <div className="text-3xl font-semibold text-ink">2</div>
          <Link to="/dashboard/creator/reviews" className="text-sm font-medium text-moss hover:text-ink transition-colors mt-2 inline-flex items-center gap-1">
            Submit feedback <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="p-6 bg-ink text-pearl rounded-2xl shadow-premium relative overflow-hidden group hover:shadow-premium-hover transition-shadow cursor-pointer">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent blur-2xl group-hover:blur-xl transition-all"></div>
          <div className="relative z-10">
            <div className="text-xs font-mono text-pearl/50 uppercase tracking-wider mb-2">Next Milestone</div>
            <div className="text-xl font-medium text-white mb-2 leading-tight">Host a Deep-Dive Panel</div>
            <div className="text-sm text-pearl/70 mb-4">You are 3 quality reviews away from Guest Host eligibility.</div>
            <div className="w-full h-1.5 bg-pearl/20 rounded-full overflow-hidden">
               <div className="h-full bg-gold w-[75%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h2 className="text-lg font-semibold text-ink">Action Required</h2>
            <div className="bg-white border text-left border-ink/5 rounded-2xl shadow-sm overflow-hidden p-6 space-y-4">
               
               <div className="flex items-start gap-4 p-4 rounded-xl bg-surfaceHover border border-ink/5">
                 <div className="w-10 h-10 rounded-full bg-moss/10 text-moss flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                 </div>
                 <div className="flex-1">
                    <div className="text-xs font-mono text-clay uppercase tracking-wider font-medium mb-1">New Invite</div>
                    <h4 className="font-medium text-ink text-sm">London Digital Showcase: Hydration</h4>
                    <p className="text-xs text-ink/60 mt-1 line-clamp-1">March 28, 2026 • 18:00 GMT</p>
                    <div className="mt-3 flex gap-2">
                      <button className="px-4 py-1.5 bg-ink text-white rounded text-xs font-medium hover:bg-forest transition-colors">Accept</button>
                      <button className="px-4 py-1.5 border border-ink/10 rounded text-ink text-xs font-medium hover:bg-white transition-colors">Decline</button>
                    </div>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 rounded-xl bg-surfaceHover border border-ink/5">
                 <div className="w-10 h-10 rounded-full bg-stone shadow-sm flex items-center justify-center shrink-0">
                    <Star className="w-5 h-5 text-ink/40" />
                 </div>
                 <div className="flex-1">
                    <div className="text-xs font-mono text-moss uppercase tracking-wider font-medium mb-1">Review Due</div>
                    <h4 className="font-medium text-ink text-sm">Heartleaf 77% Soothing Toner</h4>
                    <p className="text-xs text-ink/60 mt-1">Sample received 12 days ago.</p>
                    <div className="mt-3">
                      <Link to="/dashboard/creator/reviews" className="px-4 py-1.5 bg-white border border-ink/10 shadow-sm rounded text-ink text-xs font-medium hover:bg-surfaceHover transition-colors inline-block">Draft Review</Link>
                    </div>
                 </div>
               </div>

            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-lg font-semibold text-ink">Recently Discovered</h2>
            <div className="bg-white border border-ink/5 rounded-2xl shadow-sm overflow-hidden flex flex-col p-6">
               <div className="text-center py-12 text-ink/40">
                  <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                    <Star strokeWidth={1.5} className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm font-medium text-ink/60 mb-1">No recent discoveries.</p>
                  <p className="text-xs">Attend the next showcase to unlock new hero products.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
