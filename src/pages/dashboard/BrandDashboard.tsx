import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowUpRight, Star, Lock, Loader2, Sparkles } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

export default function BrandDashboard() {
  const { data: profileData, isLoading } = useProfile();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = () => {
    setIsUpgrading(true);
    // Simulate fake Stripe redirect
    setTimeout(() => {
      alert("Redirecting to Stripe Checkout...");
      setIsUpgrading(false);
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-ink/40" /></div>;
  }

  const isProtocolTier = profileData?.brand?.tier === 'protocol';
  const brandName = profileData?.brand?.company_name || 'Brand';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink tracking-tight">Welcome back, {brandName}</h1>
          <p className="text-sm text-ink/60 mt-1">Here is your pipeline and upcoming activity.</p>
        </div>
        <Link to="/dashboard/profile" className="px-5 py-2.5 rounded-lg bg-forest text-white text-sm font-medium shadow-sm hover:shadow-md transition-shadow inline-flex items-center gap-2">
          Submit New Product
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Active Products</div>
          <div className="text-3xl font-semibold text-ink">2</div>
          <div className="text-sm text-moss mt-2 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-moss/20 border border-moss"></span>
            Both approved
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Upcoming Events</div>
          <div className="text-3xl font-semibold text-ink">1</div>
          <div className="text-sm text-ink/60 mt-2">London Showcase (In 4 days)</div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-ink/5 shadow-sm">
          <div className="text-xs font-mono text-ink/50 uppercase tracking-wider mb-2">Creator Coverage</div>
          <div className="text-3xl font-semibold text-ink">14</div>
          <div className="text-sm text-moss mt-2 font-medium">+3 reviews this week</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Active Products</h2>
              <Link to="/dashboard/profile" className="text-sm font-medium text-moss hover:text-forest flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white border text-left border-ink/5 rounded-2xl shadow-sm overflow-hidden">
               <div className="p-5 border-b border-ink/5 flex items-center justify-between group cursor-pointer hover:bg-surfaceHover transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-stone/50 border border-ink/5 object-cover">
                       <div className="w-full h-full rounded-xl bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-ink">Heartleaf 77% Soothing Toner</h4>
                      <p className="text-xs text-ink/60 mt-0.5">Toner / Essence</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-moss/10 text-moss text-xs font-medium">
                      Status: Featured
                    </div>
                  </div>
               </div>
               <div className="p-5 flex items-center justify-between group cursor-pointer hover:bg-surfaceHover transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-stone/50 border border-ink/5">
                       <div className="w-full h-full rounded-xl bg-[url('https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center"></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-ink">Peach 70 Niacin Serum</h4>
                      <p className="text-xs text-ink/60 mt-0.5">Serum / Ampoule</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone/50 text-ink/60 text-xs font-medium border border-ink/10">
                      Status: Under Review
                    </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="space-y-6">
            <h2 className="text-lg font-semibold text-ink">Recent Feedback</h2>
            
            <div className="relative bg-white border border-ink/5 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[300px]">
               
               <div className={!isProtocolTier ? "filter blur-sm select-none pointer-events-none opacity-50 absolute inset-0 z-0" : "relative z-0"}>
                 {[1, 2, 3].map((_, i) => (
                   <div key={i} className="p-4 border-b border-ink/5 last:border-0 hover:bg-surfaceHover transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-1 text-gold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </div>
                        <span className="text-[10px] text-ink/40 font-mono tracking-wide">2 OCT</span>
                      </div>
                      <p className="text-sm text-ink/80 leading-relaxed line-clamp-2">"Texture is incredible, absorbs immediately under makeup. Seen a reduction in redness after 4 days of use."</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-ink/10"></div>
                        <span className="text-xs font-medium text-ink/60">Creator @skinglow</span>
                      </div>
                   </div>
                 ))}
               </div>

               {!isProtocolTier && (
                 <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center bg-white/40 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-full bg-clay/10 text-clay flex items-center justify-center mb-4 inner-shadow border border-clay/20">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold text-ink mb-2">Unlock Deep Feedback</h3>
                    <p className="text-xs text-ink/70 mb-6 max-w-[200px]">Upgrade to the Protocol Tier to read full qualitative reviews from top creators.</p>
                    <button 
                      onClick={handleUpgrade}
                      disabled={isUpgrading}
                      className="w-full py-2.5 rounded-lg bg-ink text-white font-medium hover:bg-forest transition-all shadow-sm text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isUpgrading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-gold" />}
                      Upgrade to Protocol
                    </button>
                    <p className="text-[10px] text-ink/40 mt-3 font-mono uppercase tracking-wider">$99/mo · Cancel Anytime</p>
                 </div>
               )}

            </div>
         </div>
      </div>
    </div>
  );
}
