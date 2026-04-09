import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Fetch explicit user role to branch redirect 
        const { data: userData, error: userError } = await supabase
          .from('bth_users')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (userError) throw userError;

        if (userData.role === 'brand') {
          navigate('/brand/dashboard');
        } else if (userData.role === 'creator') {
          navigate('/creator/dashboard');
        } else if (userData.role === 'manager') {
          navigate('/admin/dashboard');
        } else {
          toast.error("Role unassigned. Contact support.");
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto items-center">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-serif text-ink mb-2">Welcome Back</h1>
        <p className="text-ink/60 font-sans">Sign in to your Bridgr account</p>
      </div>

      <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-stone focus:border-ink rounded-lg outline-none transition-colors shadow-sm"
            placeholder="you@company.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
             <label className="text-sm font-medium tracking-wide">Password</label>
             <Link to="/auth/reset-password" className="text-xs text-ink/50 hover:text-ink underline underline-offset-2">Forgot?</Link>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-stone focus:border-ink rounded-lg outline-none transition-colors shadow-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ink text-white py-3.5 rounded-xl font-medium tracking-wide hover:bg-ink/90 transition-all disabled:opacity-50 mt-4 shadow-md hover:shadow-premium"
        >
          {loading ? "Authenticating..." : "Sign In"}
        </button>
      </form>

      <div className="mt-10 text-sm text-ink/60 flex flex-col items-center gap-2">
        <p>Don't have an account?</p>
        <div className="flex gap-4">
           <Link to="/auth/register/brand" className="text-brand font-medium hover:underline underline-offset-4">Apply as Brand</Link>
           <span className="text-stone">|</span>
           <Link to="/auth/register/creator" className="text-creator font-medium hover:underline underline-offset-4">Apply as Creator</Link>
        </div>
      </div>
    </div>
  );
}
