import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

export default function RegisterCreator() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Register Supabase Auth User
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create the bth_users record marking them as a 'creator'
        const { error: userError } = await supabase
          .from('bth_users')
          .insert({
            id: authData.user.id,
            email: email,
            role: 'creator'
          });
        
        if (userError) throw userError;

        // 3. Create the specific creator profile in bth_creators_v2
        const { error: creatorError } = await supabase
          .from('bth_creators_v2')
          .insert({
            user_id: authData.user.id,
            display_name: displayName,
          });

        if (creatorError) throw creatorError;

        toast.success("Application successful! Welcome to Bridgr.");
        navigate('/creator/dashboard');
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to register creator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto items-center">
      <div className="mb-10 text-center">
         <span className="text-creator font-medium tracking-wider uppercase text-xs mb-3 block">Creator Portal</span>
        <h1 className="text-3xl font-serif text-ink mb-2">Apply to Bridgr</h1>
        <p className="text-ink/60 font-sans">Discover brands and build your authority.</p>
      </div>

      <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide">Display Name</label>
          <input
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-stone focus:border-creator rounded-lg outline-none transition-colors shadow-sm"
            placeholder="What should brands call you?"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium tracking-wide">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-stone focus:border-creator rounded-lg outline-none transition-colors shadow-sm"
            placeholder="you@domain.com"
          />
        </div>

        <div className="flex flex-col gap-2">
           <label className="text-sm font-medium tracking-wide">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-stone focus:border-creator rounded-lg outline-none transition-colors shadow-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-creator text-white py-3.5 rounded-xl font-medium tracking-wide hover:bg-creator/90 transition-all disabled:opacity-50 mt-4 shadow-md hover:shadow-premium"
        >
          {loading ? "Creating Profile..." : "Submit Application"}
        </button>
      </form>

      <div className="mt-10 text-sm text-ink/60">
        Already registered? <Link to="/auth/login" className="text-ink font-medium hover:underline underline-offset-4">Sign in here</Link>
      </div>
    </div>
  );
}
