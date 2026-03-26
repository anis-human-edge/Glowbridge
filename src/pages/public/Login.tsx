import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else if (data.user) {
      // Basic split routing based on user metadata role
      const role = data.user.user_metadata?.role;
      if (role === 'creator') {
        navigate('/dashboard/creator');
      } else if (role === 'admin') {
        navigate('/dashboard/admin');
      } else {
        navigate('/dashboard'); // default to brand
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone/20 py-32 px-6 flex justify-center items-center">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-10">
          <Link to="/" className="text-2xl font-serif italic text-ink hover:text-forest transition-colors inline-block mb-10">
            Glowbridge
          </Link>
          <h1 className="text-2xl font-sans font-medium text-ink mb-2">Welcome Back</h1>
          <p className="text-sm text-ink/60">Enter your credentials to access your dashboard.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-ink/5 shadow-premium">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-ink/50 mb-1.5">Email</label>
              <input name="email" required type="email" className="w-full border border-ink/10 bg-surfaceHover rounded-lg px-4 py-2.5 focus:outline-none focus:border-moss focus:bg-white transition-colors text-sm" placeholder="jane@example.com" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-mono uppercase tracking-wide text-ink/50">Password</label>
              </div>
              <input name="password" required type="password" className="w-full border border-ink/10 bg-surfaceHover rounded-lg px-4 py-2.5 focus:outline-none focus:border-moss focus:bg-white transition-colors text-sm" placeholder="••••••••" />
            </div>
            
            <div className="pt-4">
              <button disabled={loading} type="submit" className="w-full py-3 rounded-xl bg-ink text-white font-medium hover:bg-forest transition-colors flex justify-center items-center disabled:opacity-50 text-sm">
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-ink/60">
          Don't have an account? <Link to="/" className="text-ink font-medium hover:underline">Apply for access</Link>
        </div>

      </div>
    </div>
  );
}
