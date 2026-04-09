import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Star, ThumbsUp, MessageCircle, X, Check, Building2, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function CreatorProducts() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [creatorId, setCreatorId] = useState<string | null>(null);

  // Filters State
  const [categoryFilter, setCategoryFilter] = useState('All Categories');

  // Slide-Over State
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  
  // Feedback Form State
  const [reaction, setReaction] = useState<'liked' | 'neutral' | null>(null);
  const [starScore, setStarScore] = useState<number>(0);
  const [commentText, setCommentText] = useState('');
  const [showIdentity, setShowIdentity] = useState(false);

  useEffect(() => {
    async function fetchPool() {
      if(!user) return;
      try {
        const { data: cData } = await supabase.from('bth_creators_v2').select('id').eq('user_id', user.id).single();
        if (cData) setCreatorId(cData.id);

        const { data: pData } = await supabase
          .from('bth_products_v2')
          .select(`
            *,
            bth_brands_v2 (company_name, hq_city),
            bth_product_images (image_url)
          `)
          .eq('status', 'approved');

        if (pData) {
          setProducts(pData);
        }
      } catch (err) {
        console.error("Pool error", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPool();
  }, [user]);

  const openSlideover = (prod: any) => {
    setActiveProduct(prod);
    // Reset states
    setReaction(null);
    setStarScore(0);
    setCommentText('');
    setShowIdentity(false);
  };

  const submitFeedback = async () => {
    if(!creatorId || !activeProduct) return;
    setFeedbackLoading(true);

    try {
      // 1. Log native AI ranking signal
      await supabase.from('bth_product_reactions').insert({
        product_id: activeProduct.id,
        creator_id: creatorId,
        liked: reaction === 'liked',
        star_score: starScore,
        interest_signal: true // Implicit interest when interacting in prototype
      });

      // 2. Log comment string mapped to visibility rules
      if (commentText.trim().length > 0) {
        await supabase.from('bth_product_comments').insert({
          product_id: activeProduct.id,
          creator_id: creatorId,
          comment_text: commentText,
          sentiment: reaction === 'liked' ? 'positive' : 'constructive',
          show_name_to_brand: showIdentity
        });
      }

      toast.success("Feedback locked. Analytics updated!");
      setActiveProduct(null);
    } catch(err) {
      toast.error("Failed to post reaction.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  if (loading) {
     return <div className="animate-spin h-6 w-6 border-2 border-creator border-t-transparent rounded-full mx-auto my-32"></div>;
  }

  // Pre-filter
  const filteredProducts = categoryFilter === 'All Categories' ? products : products.filter(p => p.category === categoryFilter);

  return (
    <div className="relative">
      
      {/* Browsing View */}
      <div className={`opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] ${activeProduct ? 'pointer-events-none filter blur-sm scale-[0.99] transition-all duration-500' : 'transition-all duration-300'}`}>
        <div className="flex justify-between items-end mb-8 border-b border-stone/50 pb-6">
          <div>
            <h1 className="text-4xl font-serif text-ink tracking-tight mb-2">Product Pool</h1>
            <p className="text-ink/60 font-sans text-lg">Browse available campaigns, run evaluation, and lock in matching signals.</p>
          </div>
          
          <div className="flex gap-4">
             <select 
               className="bg-surface border border-stone/60 text-sm px-4 py-2.5 rounded-lg text-ink outline-none focus:border-creator"
               value={categoryFilter}
               onChange={(e) => setCategoryFilter(e.target.value)}
             >
                <option>All Categories</option>
                <option>Skincare</option>
                <option>Makeup</option>
                <option>Haircare</option>
                <option>Fragrance</option>
             </select>
             <button className="bg-surface border border-stone/60 px-4 py-2.5 text-sm rounded-lg hover:border-creator transition-colors">
               Not yet reviewed
             </button>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const bounty = ((p.price_gbp * p.commission_rate) / 100).toFixed(2);
            const imgUrl = p.bth_product_images?.[0]?.image_url || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600';
            const brandName = p.bth_brands_v2?.company_name || 'Verified Brand';

            return (
              <div 
                key={p.id} 
                onClick={() => openSlideover(p)}
                className="group cursor-pointer bg-surface border border-stone/40 rounded-2xl overflow-hidden hover:shadow-premium hover:border-stone transition-all duration-300 flex flex-col h-full"
              >
                {/* Hero Area */}
                <div className="h-64 relative bg-stone/20 overflow-hidden flex items-center justify-center p-8">
                  <span className="absolute top-4 right-4 bg-pearl/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-condensed tracking-wider shadow-sm z-10">
                    {p.category}
                  </span>
                  <img src={imgUrl} alt={p.name} className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                </div>
                
                {/* Product Info */}
                <div className="p-6 flex flex-col flex-1 border-t border-stone/40">
                  <span className="text-creator font-semibold text-xs tracking-wider uppercase mb-1">{brandName}</span>
                  <h3 className="font-serif text-xl leading-tight mb-2 text-ink line-clamp-1">{p.name}</h3>
                  <p className="text-sm font-sans text-ink/60 line-clamp-2 mb-6 flex-1">
                    {p.description}
                  </p>
                  
                  {/* Financial Tag */}
                  <div className="bg-creator/5 border border-creator/10 rounded-xl p-4 flex flex-col gap-1">
                    <span className="text-xs uppercase font-condensed tracking-widest text-creator/80">Commission Bounty</span>
                    <span className="text-lg font-serif">Earn ~£{bounty} <span className="font-sans text-sm text-ink/50 ml-1">at {p.commission_rate}%</span></span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>


      {/* ==== SLIDE OVER MODEL OVERLAY ==== */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex justify-end">
           {/* Backdrop */}
           <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity" onClick={() => setActiveProduct(null)}></div>
           
           {/* Form Panel */}
           <div className="relative w-full max-w-xl bg-pearl h-full shadow-2xl border-l border-stone flex flex-col transform transition-transform duration-500 overflow-y-auto animate-[slideInRight_0.4s_ease-out_forwards]">
             
             {/* Sticky Header */}
             <div className="sticky top-0 bg-surface/80 backdrop-blur-md border-b border-stone/50 p-6 flex justify-between items-start z-20">
               <div>
                  <h2 className="font-serif text-2xl text-ink leading-tight">{activeProduct.name}</h2>
                  <p className="font-serif text-ink/60 text-sm mt-1">by {activeProduct.bth_brands_v2?.company_name}</p>
               </div>
               <button onClick={() => setActiveProduct(null)} className="p-2 hover:bg-stone/50 rounded-full transition-colors">
                  <X size={20} />
               </button>
             </div>

             <div className="p-8 flex flex-col gap-10">
                
                <section>
                   <h3 className="text-xs font-condensed tracking-widest uppercase text-ink/40 mb-3 flex items-center gap-2"><Building2 size={14} /> Brand Context</h3>
                   <div className="bg-surface border border-stone/50 p-5 rounded-xl text-sm flex justify-between items-center">
                     <div>
                       <span className="font-medium">{activeProduct.bth_brands_v2?.company_name}</span>
                       <span className="text-ink/60 block">{activeProduct.bth_brands_v2?.hq_city || 'Verified HQ'}</span>
                     </div>
                   </div>
                </section>
                
                <section>
                   <h3 className="text-xs font-condensed tracking-widest uppercase text-ink/40 mb-3 flex items-center gap-2"><MessageCircle size={14} /> AI Product Brief</h3>
                   <div className="bg-surface border border-stone/50 p-6 rounded-xl flex flex-col gap-3">
                     <p className="font-sans text-ink leading-relaxed">{activeProduct.description}</p>
                     <ul className="text-sm font-sans text-ink/70 mt-4 space-y-2 list-disc list-inside">
                        <li>High Creator Demand detected for this formulation matrix.</li>
                        <li>Competitive pricing within the Top 30% of standard category retail.</li>
                        <li>Strong potential for tutorial-based visual content.</li>
                     </ul>
                   </div>
                </section>

                <hr className="border-stone" />

                {/* Feedback Evaluation Engine */}
                <section className="flex flex-col gap-6">
                   <div>
                     <h3 className="text-xl font-serif text-ink mb-1">Evaluate & Express Interest</h3>
                     <p className="text-sm text-ink/60">Your private signals instruct the matching algorithm.</p>
                   </div>

                   <div className="flex gap-4">
                     <button 
                       onClick={() => setReaction('liked')}
                       className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${reaction === 'liked' ? 'bg-creator/10 border-creator text-creator' : 'bg-surface border-stone hover:border-creator/50'}`}
                     >
                       <ThumbsUp size={24} className="mb-2" />
                       <span className="text-sm font-medium">Strong Fit</span>
                     </button>
                     <button 
                       onClick={() => setReaction('neutral')}
                       className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${reaction === 'neutral' ? 'bg-ink/10 border-ink text-ink' : 'bg-surface border-stone hover:border-ink/50'}`}
                     >
                       <span className="text-sm font-medium">No Interest</span>
                     </button>
                   </div>

                   <div>
                      <label className="text-sm font-medium mb-3 block">Overall Rating Hook</label>
                      <div className="flex gap-2">
                        {[1,2,3,4,5].map(star => (
                           <button 
                             key={star} 
                             onClick={() => setStarScore(star)}
                             className={`p-3 rounded-xl border transition-all ${starScore >= star ? 'bg-[#facc15]/20 border-[#facc15] text-[#ca8a04]' : 'bg-surface border-stone text-ink/20 hover:border-[#facc15]/50'}`}
                           >
                             <Star size={24} />
                           </button>
                        ))}
                      </div>
                   </div>

                   <div>
                      <div className="flex justify-between items-end mb-3">
                         <label className="text-sm font-medium">Market Intelligence Comment</label>
                         <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowIdentity(!showIdentity)}>
                            <div className={`w-8 h-4 rounded-full flex items-center p-1 transition-colors ${showIdentity ? 'bg-creator' : 'bg-stone'}`}>
                              <div className={`bg-white w-2 h-2 rounded-full shadow-sm transform transition-transform ${showIdentity ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                            <span className="text-xs font-medium text-ink/60">{showIdentity ? 'Identifying' : 'Anonymous'}</span>
                         </div>
                      </div>
                      <textarea
                        rows={4}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full bg-surface border border-stone focus:border-creator rounded-xl p-4 outline-none transition-colors resize-none text-sm"
                        placeholder="What do you think of this product? What would make it better?"
                      />
                   </div>

                   <button 
                     onClick={submitFeedback}
                     disabled={feedbackLoading || !reaction || starScore === 0}
                     className="w-full bg-creator text-white py-4 rounded-xl font-medium shadow-md hover:bg-creator/90 transition-all disabled:opacity-50 mt-4 flex justify-center items-center gap-2"
                   >
                     {feedbackLoading ? <div className="h-5 w-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div> : <><Check size={18} /> Lock Reaction & Apply</>}
                   </button>
                </section>

             </div>
           </div>
        </div>
      )}

    </div>
  );
}
