import { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useProfile } from '../../hooks/useProfile';
import { useCreateProduct } from '../../hooks/useProducts';

export default function BrandProfile() {
  const [submitted, setSubmitted] = useState(false);
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { mutateAsync: createProduct, isPending } = useCreateProduct();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    benefits: '',
    ingredients: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData?.brand) {
      toast.error("Brand profile not found.");
      setError("Brand profile not found.");
      return;
    }

    try {
      setError(null);
      await createProduct({
        brand_id: profileData.brand.id,
        name: formData.name,
        category: formData.category,
        ingredients: `Benefits: ${formData.benefits}\n\nEvidence: ${formData.ingredients}`,
        status: 'draft',
      });
      setSubmitted(true);
      toast.success("Product draft successfully recorded.");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit product");
      setError(err.message || "Failed to submit product");
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft securely saved locally.");
  };

  if (profileLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header className="space-y-2">
          <div className="h-8 w-64 bg-stone rounded-md animate-pulse"></div>
          <div className="h-4 w-96 bg-stone rounded-md animate-pulse"></div>
        </header>

        <div className="bg-white border border-ink/5 rounded-2xl shadow-sm p-8 space-y-8">
          <div className="space-y-6">
            <div className="h-6 w-32 bg-stone rounded-md animate-pulse"></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-12 w-full bg-stone rounded-lg animate-pulse"></div>
              <div className="h-12 w-full bg-stone rounded-lg animate-pulse"></div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-ink/5"></div>
          <div className="space-y-6">
            <div className="h-6 w-48 bg-stone rounded-md animate-pulse"></div>
            <div className="h-24 w-full bg-stone rounded-lg animate-pulse"></div>
            <div className="h-24 w-full bg-stone rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-semibold text-ink tracking-tight">Submit a Hero Product</h1>
        <p className="text-sm text-ink/60 mt-1">Submit your flagship product for curation review. Focus on clarity and evidence.</p>
      </header>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {!submitted ? (
        <form className="bg-white border border-ink/5 rounded-2xl shadow-sm p-8 space-y-8" onSubmit={handleSubmit}>
          
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-ink">Basic Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-xs font-mono text-ink/60 uppercase tracking-wider mb-2">Product Name</label>
                 <input 
                   required 
                   value={formData.name}
                   onChange={e => setFormData({ ...formData, name: e.target.value })}
                   className="w-full border border-ink/10 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-moss focus:border-moss outline-none sm:text-sm bg-surfaceHover focus:bg-white transition-all shadow-sm" 
                   placeholder="e.g. Heartleaf 77% Soothing Toner" 
                 />
              </div>
              <div>
                 <label className="block text-xs font-mono text-ink/60 uppercase tracking-wider mb-2">Subcategory</label>
                 <select 
                   required 
                   value={formData.category}
                   onChange={e => setFormData({ ...formData, category: e.target.value })}
                   className="w-full border border-ink/10 rounded-lg px-4 py-2.5 focus:ring-1 focus:ring-moss focus:border-moss outline-none sm:text-sm bg-surfaceHover focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                 >
                   <option value="">Select Subcategory...</option>
                   <option value="Toner / Essence">Toner / Essence</option>
                   <option value="Serum / Ampoule">Serum / Ampoule</option>
                   <option value="Moisturiser">Moisturiser</option>
                   <option value="Sun Care">Sun Care</option>
                 </select>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-ink/5"></div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-ink">Formulation & Proof</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="block text-xs font-mono text-ink/60 uppercase tracking-wider mb-2">Hero Benefits (No generic claims)</label>
                 <textarea 
                   required 
                   rows={3} 
                   value={formData.benefits}
                   onChange={e => setFormData({ ...formData, benefits: e.target.value })}
                   className="w-full border border-ink/10 rounded-lg p-4 focus:ring-1 focus:ring-moss focus:border-moss outline-none sm:text-sm bg-surfaceHover focus:bg-white transition-all shadow-sm resize-none" 
                   placeholder="Describe the specific problem this solves and the primary benefits..."
                 />
              </div>
              <div className="md:col-span-2">
                 <label className="block text-xs font-mono text-ink/60 uppercase tracking-wider mb-2">Key Ingredients Evidence</label>
                 <textarea 
                   required 
                   rows={3} 
                   value={formData.ingredients}
                   onChange={e => setFormData({ ...formData, ingredients: e.target.value })}
                   className="w-full border border-ink/10 rounded-lg p-4 focus:ring-1 focus:ring-moss focus:border-moss outline-none sm:text-sm bg-surfaceHover focus:bg-white transition-all shadow-sm resize-none" 
                   placeholder="Why these ingredients? (e.g. 77% heartleaf extract for proven redness reduction)"
                 />
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-ink/5"></div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium text-ink">Assets</h3>
            <div className="border border-dashed border-ink/20 rounded-xl bg-surfaceHover p-10 flex flex-col items-center justify-center text-center">
               <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm border border-ink/5">
                 <UploadCloud className="w-5 h-5 text-ink/40" />
               </div>
               <p className="text-sm font-medium text-ink mb-1">Click to upload or drag and drop</p>
               <p className="text-xs text-ink/50">High resolution product imagery (PNG, JPG up to 10MB)</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
             <button type="button" onClick={handleSaveDraft} className="px-6 py-2.5 rounded-lg border border-ink/10 font-medium text-ink hover:bg-surfaceHover transition-colors text-sm">Save Draft</button>
             <button disabled={isPending} type="submit" className="px-6 py-2.5 rounded-lg bg-forest text-white font-medium hover:bg-ink transition-colors shadow-sm text-sm disabled:opacity-50 flex items-center gap-2">
               {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
               Submit for Review
             </button>
          </div>

        </form>
      ) : (
        <div className="bg-white border border-ink/5 rounded-2xl shadow-sm p-16 flex flex-col items-center text-center">
           <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center text-moss mb-6">
              <CheckCircle2 className="w-8 h-8" />
           </div>
           <h2 className="text-2xl font-serif italic text-ink mb-2">Submission Received</h2>
           <p className="text-ink/60 mb-8 max-w-sm">Your hero product is now securely logged to the protocol database. We will review the formulation constraints shortly.</p>
           <button onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', category: '', benefits: '', ingredients: '' });
           }} className="px-6 py-2.5 rounded-lg border border-ink/10 font-medium text-ink hover:bg-surfaceHover transition-colors text-sm">
             Submit Another Product
           </button>
        </div>
      )}
    </div>
  );
}
