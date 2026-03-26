import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  
  if (authed) return <>{children}</>;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded PIN for the internal prototype gate
    if (pw === 'glow2026' || pw === 'glowhq') {
      setAuthed(true);
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-6 text-white font-sans selection:bg-moss selection:text-white">
      <div className="max-w-md w-full">
        <div className="w-16 h-16 bg-stone/10 rounded-2xl flex items-center justify-center mb-8 border border-stone/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>
          <Lock className="w-7 h-7 text-pearl relative z-10" />
        </div>
        
        <h1 className="text-4xl font-serif italic mb-3 tracking-tight">Glowbridge HQ</h1>
        <p className="text-stone/60 mb-10 leading-relaxed font-light text-sm sm:text-base">
          This portal contains the foundational architecture, domain logic, and product requirements for the Glowbridge ecosystem. Access is restricted.
        </p>
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <input 
              type="password" 
              autoFocus
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              className={`w-full bg-transparent border-b-2 py-3 focus:outline-none placeholder-stone/20 text-stone font-mono tracking-widest transition-colors ${error ? 'border-red-500/50' : 'border-stone/20 focus:border-stone'}`}
              placeholder="Enter PIN"
            />
            {error && <p className="text-red-400 text-xs mt-3 font-mono">Invalid PIN. Try 'glowhq'.</p>}
          </div>
          <button type="submit" className="w-full bg-stone text-ink py-4 rounded-xl font-medium hover:bg-white focus:outline-none transition-colors shadow-[0_0_30px_rgba(237,233,225,0.1)] hover:shadow-[0_0_40px_rgba(237,233,225,0.2)]">
            Decrypt & Access
          </button>
        </form>
      </div>
    </div>
  );
}
