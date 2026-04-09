import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Box, CheckCircle2, Circle, Clock, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const CYCLE_STAGES = [
  { id: 'submission', label: 'Submit Product', path: '/brand/product/new' },
  { id: 'audit', label: 'AI Audit', path: '/brand/intelligence' },
  { id: 'feedback', label: 'Creator Feedback', path: '/brand/feedback' },
  { id: 'decision', label: 'Decisions', path: '/brand/event/apply' },
  { id: 'event', label: 'Match Event', path: '/brand/event/night' },
  { id: 'results', label: 'Results', path: '/brand/results' }
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  const [brandData, setBrandData] = useState<any>(null);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  
  // Hardcoding mock cycle active stage for visualization based on the spec
  // Normally this would query public.bth_cycles where status is active
  const activeStageId = activeProduct ? 'audit' : 'submission';

  useEffect(() => {
    async function fetchDashboard() {
      if (!user) return;
      try {
        const { data: bData } = await supabase
          .from('bth_brands_v2')
          .select('id, company_name')
          .eq('user_id', user.id)
          .single();

        if (bData) {
          setBrandData(bData);
          const { data: pData } = await supabase
            .from('bth_products_v2')
            .select('*')
            .eq('brand_id', bData.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          
          if (pData) setActiveProduct(pData);
        }
      } catch (err) {
        console.error("Dashboard error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-6 w-6 border-2 border-brand rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] max-w-5xl">
      
      {/* Hero Greeting Component */}
      <section>
        <h1 className="text-4xl font-serif text-ink tracking-tight mb-2">
          Bridgr Hub <span className="text-brand">/</span> {brandData?.company_name}
        </h1>
        <p className="text-ink/60 font-sans text-lg">
          Manage your cycle standing and respond to live market intelligence.
        </p>
      </section>

      {/* Cycle Progress Tracker */}
      <section className="bg-surface border border-stone/50 rounded-2xl p-8 shadow-sm">
         <h2 className="text-sm font-condensed tracking-widest uppercase text-ink/40 mb-6">Current Cycle Status</h2>
         
         <div className="flex items-center justify-between relative px-4">
            {/* Background Line */}
            <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-stone -z-10 -translate-y-1/2"></div>
            
            {CYCLE_STAGES.map((stage, i) => {
              const isActive = stage.id === activeStageId;
              const isPast = CYCLE_STAGES.findIndex(s => s.id === activeStageId) > i;

              return (
                <button 
                  key={stage.id}
                  onClick={() => navigate(stage.path)}
                  className="flex flex-col items-center gap-3 relative group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-brand text-white shadow-premium ring-4 ring-brand/10' : isPast ? 'bg-ink text-white' : 'bg-surface border-2 border-stone text-stone'}`}>
                    {isPast ? <Check size={14} strokeWidth={3} /> : isActive ? <Circle size={10} fill="currentColor" /> : null}
                  </div>
                  <span className={`text-xs font-medium tracking-wide transition-colors ${isActive ? 'text-brand' : isPast ? 'text-ink' : 'text-ink/40'} group-hover:text-brand`}>
                    {stage.label}
                  </span>
                </button>
              )
            })}
         </div>
      </section>

      {/* Product & Action Cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Core Product Block */}
        <div className="bg-surface border border-stone/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
           <div>
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-sm font-condensed tracking-widest uppercase text-ink/40 flex items-center gap-2">
                 <Box size={16} /> Flagship Pool Submission
               </h2>
               {activeProduct && (
                 <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-md ${activeProduct.status === 'draft' ? 'bg-stone/50 text-ink/60' : 'bg-brand/10 text-brand'}`}>
                   {activeProduct.status}
                 </span>
               )}
             </div>

             {!activeProduct ? (
               <div className="py-8 flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-brand/5 flex items-center justify-center text-brand mb-4">
                   <AlertCircle size={28} />
                 </div>
                 <h3 className="text-xl font-serif text-ink mb-2">No Product Detected</h3>
                 <p className="text-sm text-ink/60 mb-6">You must submit a product to trigger your AI Audit and begin ranking for creator matches.</p>
                 <Link to="/brand/product/new" className="bg-brand text-white font-medium px-6 py-2.5 rounded-lg shadow-md hover:bg-brand/90 transition-colors inline-flex items-center gap-2">
                   Begin Submission <ArrowRight size={16} />
                 </Link>
               </div>
             ) : (
               <div>
                  <h3 className="text-2xl font-serif text-ink mb-1">{activeProduct.name}</h3>
                  <p className="text-ink/60 text-sm mb-6">{activeProduct.category} · Submitted {new Date(activeProduct.created_at).toLocaleDateString()}</p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-stone pt-6">
                     <Link to="/brand/intelligence" className="bg-ai/5 hover:bg-ai/10 text-ai p-4 rounded-xl transition-colors border border-ai/10 flex flex-col gap-2">
                       <span className="font-condensed uppercase text-xs tracking-wider">AI Audit Result</span>
                       <div className="flex items-center gap-2 font-serif text-lg">
                          Scores Live <ArrowRight size={16} className="text-ai/50" />
                       </div>
                     </Link>
                     <Link to="/brand/feedback" className="bg-creator/5 hover:bg-creator/10 text-creator p-4 rounded-xl transition-colors border border-creator/10 flex flex-col gap-2">
                       <span className="font-condensed uppercase text-xs tracking-wider">Creator Signals</span>
                       <div className="flex items-center gap-2 font-serif text-lg">
                          View Activity <ArrowRight size={16} className="text-creator/50" />
                       </div>
                     </Link>
                  </div>
               </div>
             )}
           </div>
        </div>

        {/* Global Notifications / Fast Actions */}
        <div className="bg-ink text-pearl rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between">
           <div className="absolute inset-0 z-0 opacity-10 bg-grain pointer-events-none"></div>
           <div className="relative z-10">
              <h2 className="text-sm font-condensed tracking-widest uppercase text-pearl/50 mb-6 flex items-center gap-2">
                 <Clock size={16} /> Required Actions
              </h2>

              {activeProduct ? (
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-serif leading-snug">The Top 10 Event Roster finalizes in 4 Days.</h3>
                  <p className="text-pearl/70 text-sm">You are currently ranked in the top 20% of the Skincare category. Increase your AI Audit gap score by adjusting your submitted selling points, or fast-track an Event Guarantee.</p>
                  
                  <Link to="/brand/event/status" className="mt-4 bg-pearl text-ink font-medium px-6 py-3 rounded-lg shadow-md hover:bg-pearl/90 transition-colors inline-flex justify-center items-center gap-2 w-max">
                     Review Event Standing <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl font-serif">Awaiting Submission</h3>
                  <p className="text-pearl/70 text-sm">Products submitted today will receive priority intelligence processing.</p>
                </div>
              )}
           </div>
        </div>

      </section>
    </div>
  );
}
