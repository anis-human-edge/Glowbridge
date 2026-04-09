import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Box, Image as ImageIcon, Info, ArrowLeft, PoundSterling } from 'lucide-react';

export default function ProductNew() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Skincare');
  const [description, setDescription] = useState('');
  const [priceGbp, setPriceGbp] = useState<string>('');
  const [commissionRate, setCommissionRate] = useState<string>('20');
  const [imageUrl, setImageUrl] = useState('');

  // Derived calculations
  const [rewardEstimate, setRewardEstimate] = useState('0.00');

  useEffect(() => {
     // Fetch the mapped brand_id
     async function resolveBrand() {
       if(!user) return;
       const { data } = await supabase.from('bth_brands_v2').select('id').eq('user_id', user.id).single();
       if (data) setBrandId(data.id);
     }
     resolveBrand();
  }, [user]);

  useEffect(() => {
    // Dynamic Commission Hook
    const price = parseFloat(priceGbp);
    const rate = parseFloat(commissionRate);
    if (!isNaN(price) && !isNaN(rate)) {
      setRewardEstimate(((price * rate) / 100).toFixed(2));
    } else {
      setRewardEstimate('0.00');
    }
  }, [priceGbp, commissionRate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandId) {
      toast.error("Brand profile missing. Cannot submit product.");
      return;
    }
    setLoading(true);

    try {
      // 1. Create the Product Record
      const { data: productData, error: productError } = await supabase
        .from('bth_products_v2')
        .insert({
          brand_id: brandId,
          name,
          category,
          description,
          price_gbp: parseFloat(priceGbp),
          commission_rate: parseFloat(commissionRate),
          status: 'pending' // As per V2 spec mapping to AI queue
        })
        .select()
        .single();

      if (productError) throw productError;

      // 2. Attach the Product Image if provided
      if (imageUrl && productData) {
        const { error: imageError } = await supabase
          .from('bth_product_images')
          .insert({
            product_id: productData.id,
            image_url: imageUrl,
            is_hero: true,
            display_order: 1
          });
          
        if (imageError) throw imageError;
      }

      toast.success("Product queued for Market Intelligence Audit!");
      navigate('/brand/dashboard');
      
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] pb-20">
      
      {/* Header */}
      <button onClick={() => navigate('/brand/dashboard')} className="text-ink/50 hover:text-ink transition-colors flex items-center gap-2 mb-6 font-medium text-sm">
        <ArrowLeft size={16} /> Back to Hub
      </button>

      <div className="mb-10">
        <span className="text-brand font-condensed tracking-widest uppercase text-xs mb-2 block">Step 1 of 3</span>
        <h1 className="text-4xl font-serif text-ink mb-3 leading-tight">Submit Product for Intelligence Audit</h1>
        <p className="text-ink/60 font-sans text-lg">Define your flagship offering to trigger an AI Market Gap score and initiate creator discovery.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Core Info */}
        <div className="bg-surface rounded-2xl p-8 border border-stone/60 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-stone/50 pb-4 mb-2">
            <Box size={20} className="text-brand" />
            <h2 className="font-serif text-xl">Core Product Identity</h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium tracking-wide">Product Title</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-pearl/50 border border-stone focus:border-brand rounded-lg outline-none transition-colors"
              placeholder="e.g. Ceramide Recovery Serum"
            />
          </div>

          <div className="flex flex-col gap-2">
             <label className="text-sm font-medium tracking-wide">Category Assignment</label>
             <select
               value={category}
               onChange={(e) => setCategory(e.target.value)}
               className="w-full px-4 py-3 bg-pearl/50 border border-stone focus:border-brand rounded-lg outline-none transition-colors appearance-none"
             >
               <option>Skincare</option>
               <option>Makeup</option>
               <option>Haircare</option>
               <option>Fragrance</option>
               <option>Wellness</option>
             </select>
          </div>

          <div className="flex flex-col gap-2">
             <label className="text-sm font-medium tracking-wide">Product Overview</label>
             <p className="text-xs text-ink/50 mb-1">Used during AI Analysis to map Market Gaps.</p>
             <textarea
               required
               rows={4}
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               className="w-full px-4 py-3 bg-pearl/50 border border-stone focus:border-brand rounded-lg outline-none transition-colors resize-none"
               placeholder="Describe the product's primary function and target demographic..."
             />
          </div>
        </div>

        {/* Assets */}
        <div className="bg-surface rounded-2xl p-8 border border-stone/60 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-stone/50 pb-4 mb-2">
            <ImageIcon size={20} className="text-brand" />
            <h2 className="font-serif text-xl">Hero Creative</h2>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium tracking-wide">Primary Image URL</label>
             <p className="text-xs text-ink/50 mb-1">Provide a persistent URL to a high-res image (transparent or studio background preferred).</p>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 bg-pearl/50 border border-stone focus:border-brand rounded-lg outline-none transition-colors"
              placeholder="https://your-domain.com/assets/product.png"
            />
          </div>
          
          {imageUrl && (
            <div className="w-full h-48 bg-pearl/50 border border-stone/60 rounded-xl overflow-hidden flex items-center justify-center">
              <img src={imageUrl} alt="Preview" className="max-h-full object-contain mix-blend-multiply" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}
        </div>

        {/* Creator Offer / Financials */}
        <div className="bg-surface rounded-2xl p-8 border border-stone/60 shadow-sm flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 pt-8 pr-8 text-brand/5 pointer-events-none">
             <PoundSterling size={140} />
          </div>

          <div className="flex items-center gap-3 border-b border-stone/50 pb-4 mb-4 relative z-10">
            <h2 className="font-serif text-xl">Event Match Architecture</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide">Retail Price (£)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40">£</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={priceGbp}
                  onChange={(e) => setPriceGbp(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-pearl/50 border border-stone focus:border-brand rounded-lg outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium tracking-wide">Commission Base (%)</label>
              <div className="relative">
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/40">%</span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="100"
                  required
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(e.target.value)}
                  className="w-full pl-4 pr-8 py-3 bg-pearl/50 border border-stone focus:border-brand rounded-lg outline-none transition-colors"
                  placeholder="20"
                />
              </div>
            </div>
          </div>

          {/* Dynamic Bounty Helper */}
          <div className="mt-2 bg-brand/5 border border-brand/10 p-5 rounded-xl flex items-start gap-4 relative z-10">
             <Info className="text-brand shrink-0 mt-0.5" size={20} />
             <div>
                <h4 className="text-sm font-medium text-brand mb-1">Creator Perspective Output</h4>
                <p className="text-ink/70 font-sans text-sm">
                  This formula is translated to creators dynamically in the browsing pool. For this product, creators will see: 
                  <span className="font-bold text-ink"> "Earn ~£{rewardEstimate} per sale at {commissionRate}% commission."</span>
                </p>
             </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
           <button
            type="submit"
            disabled={loading}
            className="bg-brand text-white font-medium px-10 py-4 rounded-xl shadow-md hover:bg-brand/90 hover:shadow-premium transition-all disabled:opacity-50"
           >
             {loading ? "Queueing for Intelligence..." : "Lock Submission & Run AI Audit"}
           </button>
        </div>

      </form>
    </div>
  );
}
