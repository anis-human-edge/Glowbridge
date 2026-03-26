import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Apply() {
  const { type } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isBrand = type === 'brand';
  const title = isBrand ? "Apply as a Brand" : "Apply as a Creator";
  const desc = isBrand 
    ? "Join the curated waitlist to access precision market entry via Glowbridge events." 
    : "Request access to the room and connect with emerging global skincare formulas.";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const brandName = formData.get('brandName') as string;
    const socialChannel = formData.get('socialChannel') as string;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: type,
          brand_name: isBrand ? brandName : undefined,
          social_channel: !isBrand ? socialChannel : undefined,
        }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-pearl py-32 px-6 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white p-10 sm:p-12 rounded-[2rem] border border-ink/5 shadow-premium relative">
        {!submitted ? (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-serif italic text-ink mb-3">{title}</h1>
              <p className="text-sm text-ink/60">{desc}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-2">Name</label>
                <input name="name" required type="text" className="w-full border border-ink/10 bg-stone/20 rounded-lg px-4 py-3 focus:outline-none focus:border-moss focus:bg-white transition-colors" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-2">Email</label>
                <input name="email" required type="email" className="w-full border border-ink/10 bg-stone/20 rounded-lg px-4 py-3 focus:outline-none focus:border-moss focus:bg-white transition-colors" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-2">Password</label>
                <input name="password" required type="password" minLength={6} className="w-full border border-ink/10 bg-stone/20 rounded-lg px-4 py-3 focus:outline-none focus:border-moss focus:bg-white transition-colors" placeholder="••••••••" />
              </div>
              
              {isBrand ? (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-2">Brand Name</label>
                  <input name="brandName" required type="text" className="w-full border border-ink/10 bg-stone/20 rounded-lg px-4 py-3 focus:outline-none focus:border-moss focus:bg-white transition-colors" placeholder="Anua Skincare" />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-2">Primary Social Channel</label>
                  <input name="socialChannel" required type="url" className="w-full border border-ink/10 bg-stone/20 rounded-lg px-4 py-3 focus:outline-none focus:border-moss focus:bg-white transition-colors" placeholder="https://instagram.com/yourhandle" />
                </div>
              )}
              
              <div className="pt-4">
                <button disabled={loading} type="submit" className="w-full py-4 rounded-xl bg-ink text-white font-medium hover:bg-forest transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
            <div className="mt-6 flex justify-center text-sm text-ink/60">
              Already have an account? <Link to="/login" className="ml-1 text-ink font-medium hover:underline">Log in</Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-moss/10 text-moss rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2 className="text-2xl font-serif italic text-ink mb-3">Application Received</h2>
            <p className="text-ink/60 mb-8">Please check your email to confirm your sign-up. Once confirmed, you can log in to view your dashboard.</p>
            <Link to="/login" className="inline-flex py-3 px-6 bg-stone/50 hover:bg-stone rounded-lg text-ink font-medium transition-colors">
              Proceed to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
