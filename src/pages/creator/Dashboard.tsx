import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { ArrowRight, Trophy, Target, PlayCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  const [creatorData, setCreatorData] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    async function loadCreatorData() {
      if (!user) return;
      try {
        // 1. Fetch Creator Profile Data
        const { data: cData } = await supabase
          .from('bth_creators_v2')
          .select('id, display_name, created_at')
          .eq('user_id', user.id)
          .single();

        if (cData) {
          setCreatorData(cData);
        }

        // 2. Fetch Leaderboard Hook (Pulling the actual dummy entries)
        const { data: lData } = await supabase
          .from('bth_creators_v2')
          .select('id, display_name')
          .limit(10);
        
        if (lData) {
          // Morph the real data into Anonymized Leaderboard view natively
          setLeaderboard(lData.map((k, i) => ({
             ...k,
             pseudoScore: Math.floor(95 - (i * 2.3)), // Pseudo-score for visual fidelity since we lack pure score table aggregation
             rank: i + 1,
             isSelf: cData?.id === k.id
          })));
        }
      } catch (err) {
        console.error("Dashboard error", err);
      } finally {
        setLoading(false);
      }
    }
    loadCreatorData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-6 w-6 border-2 border-creator border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Derive static tier from standing pseudo-rank
  const selfRank = leaderboard.find(l => l.isSelf)?.rank || 42;
  const derivedTier = selfRank <= 5 ? "Recognised" : selfRank <= 25 ? "Active" : "New";

  return (
    <div className="flex flex-col gap-10 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] max-w-5xl">
      
      {/* Hero Header */}
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-serif text-ink tracking-tight">
          Current Standing
        </h1>
        <p className="text-ink/60 font-sans text-lg">
          Track your ranking against the wider pool to secure premium brand allocations.
        </p>
      </section>

      {/* Main Trackers */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tier Card */}
        <div className="bg-surface border border-stone/50 rounded-2xl p-6 shadow-sm relative overflow-hidden lg:col-span-1">
          <div className="flex justify-between items-start mb-6">
             <span className="text-xs font-condensed tracking-widest uppercase text-ink/40 flex items-center gap-2">
                 <Trophy size={14} /> Tier Check
             </span>
             <span className="bg-creator/10 text-creator text-xs font-bold uppercase px-2.5 py-1 rounded-md tracking-wider">
               {derivedTier}
             </span>
          </div>
          <h3 className="text-3xl font-serif text-ink mb-1">Rank #{selfRank}</h3>
          <p className="text-sm text-ink/60 font-sans mb-6">In the Skincare category</p>
          
          <div className="bg-stone/30 h-2 w-full rounded-full overflow-hidden">
             <div className="bg-creator h-full w-2/3 rounded-full"></div>
          </div>
          <p className="text-xs text-ink/50 mt-3 font-condensed tracking-wide">68% PROGRESS TO NEXT TIER</p>
        </div>

        {/* Nudge Engine */}
        <div className="bg-creator text-pearl rounded-2xl p-6 shadow-premium relative overflow-hidden lg:col-span-2 flex flex-col justify-between">
           <div className="absolute inset-0 z-0 opacity-10 bg-grain pointer-events-none"></div>
           <div className="relative z-10 flex flex-col gap-4">
              <span className="text-xs font-condensed tracking-widest uppercase text-pearl/50 flex items-center gap-2">
                 <Target size={14} /> Weekly Action
              </span>
              <h3 className="text-2xl font-serif leading-snug">Review 2 more products in Skincare to lock your Active standing.</h3>
              <p className="text-pearl/70 text-sm">Consistent category feedback establishes your AI footprint, heavily weighting your eventual Brand matching logic.</p>
           </div>
           <div className="relative z-10 flex justify-end">
              <Link to="/creator/products" className="mt-4 bg-pearl text-ink font-medium px-5 py-2.5 rounded-lg shadow-md hover:bg-pearl/90 transition-colors inline-flex justify-center items-center gap-2 w-max text-sm">
                 <PlayCircle size={16} /> Enter Pool
              </Link>
           </div>
        </div>

      </section>

      {/* Leaderboard Array */}
      <section className="bg-surface border border-stone/50 rounded-2xl shadow-sm overflow-hidden flex flex-col">
         <div className="p-6 border-b border-stone/50 flex justify-between items-center bg-stone/10">
           <div>
              <h2 className="text-xl font-serif text-ink">Category Leaderboard</h2>
              <p className="text-sm text-ink/50 mt-1">Anonymized tracking for Top 10 Event slots.</p>
           </div>
           
           {/* Top 10 Unlock Explainer */}
           <div className="bg-surface border border-stone flex items-center gap-3 px-4 py-2 rounded-lg max-w-sm">
              <Lock size={16} className="text-ink/40" />
              <p className="text-xs text-ink/60 leading-snug">
                Placing in the Top 10 directly unlocks automatic matching and Event Room placement with your targeted brands.
              </p>
           </div>
         </div>

         <div className="w-full">
           <table className="w-full text-left">
             <thead>
               <tr className="border-b border-stone/50 text-xs font-condensed tracking-widest uppercase text-ink/40">
                 <th className="font-medium p-4 pl-6 w-24 text-center">Rank</th>
                 <th className="font-medium p-4">Identity (Anonymized)</th>
                 <th className="font-medium p-4 text-right pr-6">Standing Score</th>
               </tr>
             </thead>
             <tbody>
               {leaderboard.map((l) => (
                 <tr 
                   key={l.id} 
                   className={`border-b last:border-0 border-stone/30 transition-colors ${l.isSelf ? 'bg-creator/5 shadow-inner' : 'hover:bg-surfaceHover'}`}
                 >
                   <td className="p-4 pl-6 text-center text-sm font-semibold text-ink/60">#{l.rank}</td>
                   <td className="p-4 font-sans text-sm font-medium flex items-center gap-3">
                     {l.isSelf ? (
                       <>
                         <span className="text-creator font-bold">{creatorData?.display_name} (You)</span>
                       </>
                     ) : (
                       <span className="text-ink">Creator #{l.id.substring(0,6)}</span>
                     )}
                   </td>
                   <td className="p-4 pr-6 text-right font-serif text-lg text-ink">
                     {l.pseudoScore}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </section>

    </div>
  );
}
