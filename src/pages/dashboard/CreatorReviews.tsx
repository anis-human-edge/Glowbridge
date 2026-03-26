import { useState } from 'react';
import { Star, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useProfile } from '../../hooks/useProfile';
import { useCreateReview } from '../../hooks/useReviews';

export default function CreatorReviews() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { mutateAsync: createReview, isPending } = useCreateReview();

  const handleSubmit = async () => {
    if (!profileData?.creator) {
      toast.error("Creator profile not found.");
      setErrorMsg("Creator profile not found.");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a star rating efficacy.");
      setErrorMsg("Please select a star rating efficacy.");
      return;
    }

    try {
      setErrorMsg(null);
      await createReview({
        creator_id: profileData.creator.id,
        // Using a hardcoded product_id for demo until product feeds are wired
        // This simulates a review being left on the first product they received
        rating,
        content,
      });
      setSubmitted(true);
      toast.success("Artifact effectively logged to the protocol.");
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit artifact');
      setErrorMsg(err.message || 'Failed to submit artifact');
    }
  };

  if (profileLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <header className="space-y-2">
          <div className="h-8 w-64 bg-stone rounded-md animate-pulse"></div>
          <div className="h-4 w-96 bg-stone rounded-md animate-pulse"></div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="bg-white border border-ink/5 rounded-2xl shadow-sm p-8 space-y-8">
               <div className="flex gap-4 items-center mb-6">
                 <div className="w-16 h-16 rounded-xl bg-stone animate-pulse"></div>
                 <div className="space-y-2">
                   <div className="h-5 w-40 bg-stone rounded-md animate-pulse"></div>
                   <div className="h-4 w-32 bg-stone rounded-md animate-pulse"></div>
                 </div>
               </div>
               <div className="space-y-6">
                 <div className="h-4 w-24 bg-stone rounded-md animate-pulse"></div>
                 <div className="flex gap-2">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 rounded-full bg-stone animate-pulse"></div>)}
                 </div>
                 <div className="h-32 w-full bg-stone rounded-lg animate-pulse mt-6"></div>
               </div>
            </div>
          </div>
          <div className="h-64 w-full bg-stone rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-semibold text-ink tracking-tight">Product Reviews & Feedback</h1>
        <p className="text-sm text-ink/60 mt-1">Submit authentic feedback artifacts to climb the creator progression ladder.</p>
      </header>

      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{errorMsg}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        <div className="lg:col-span-2">
          {!submitted ? (
            <div className="bg-white border border-ink/5 rounded-2xl shadow-sm p-8 space-y-8">
              <div className="flex gap-4 items-center mb-6">
                 <div className="w-16 h-16 rounded-xl bg-stone/50 bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop')] bg-cover border border-ink/5"></div>
                 <div>
                   <h2 className="font-medium text-ink">Protocol Draft Product</h2>
                   <p className="text-sm text-ink/60">Awaiting Creator Selection</p>
                 </div>
              </div>

              <div className="space-y-6">
                <div>
                   <label className="block text-xs font-mono text-ink/60 uppercase tracking-wider mb-3">Overall Efficacy</label>
                   <div className="flex gap-2">
                     {[1,2,3,4,5].map(star => (
                       <button key={star} onClick={() => setRating(star)} type="button">
                         <Star className={`w-8 h-8 transition-colors ${rating >= star ? 'text-gold fill-current' : 'text-stone hover:text-gold/50'}`} />
                       </button>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-mono text-ink/60 uppercase tracking-wider mb-2">Detailed Narrative Feedback</label>
                   <textarea 
                     rows={5} 
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     className="w-full border border-ink/10 rounded-lg p-4 focus:ring-1 focus:ring-moss focus:border-moss outline-none sm:text-sm bg-surfaceHover focus:bg-white transition-all shadow-sm resize-none" 
                     placeholder="Provide honest, rigorous feedback on texture, routine integration, and results..."
                   />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                 <button onClick={handleSubmit} disabled={isPending} className="px-6 py-2.5 flex items-center gap-2 rounded-lg bg-ink text-white font-medium hover:bg-forest transition-colors shadow-sm text-sm disabled:opacity-50">
                   {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                   Submit Artifact
                 </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-ink/5 rounded-2xl shadow-sm p-16 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-moss/10 flex items-center justify-center text-moss mb-6">
                  <Star className="w-8 h-8 fill-current" />
              </div>
              <h2 className="text-2xl font-serif italic text-ink mb-2">Artifact Submitted</h2>
              <p className="text-ink/60 mb-6 max-w-sm">Thank you for your rigorous feedback. High-quality reviews increase your platform status and eligibility for Guest Host spots.</p>
              <button onClick={() => { setSubmitted(false); setRating(0); setContent(''); }} className="px-6 py-2.5 rounded-lg border border-ink/10 font-medium text-ink hover:bg-surfaceHover transition-colors text-sm">
                Back to Reviews
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
           <div className="bg-surfaceHover border border-ink/5 p-6 rounded-2xl">
              <h3 className="font-medium text-ink mb-2">Review Guidelines</h3>
              <ul className="space-y-3 text-sm text-ink/70">
                <li className="flex gap-2"><span>•</span> Provide context on your skin state when testing.</li>
                <li className="flex gap-2"><span>•</span> Avoid empty hype ("love it!"). Explain the mechanics.</li>
                <li className="flex gap-2"><span>•</span> Strict disclosure: Only report effects you personally observed. No medical claims.</li>
              </ul>
           </div>
        </div>

      </div>
    </div>
  );
}
