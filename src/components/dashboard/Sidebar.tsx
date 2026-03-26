import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, Inbox, PlusCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { supabase } from '../../lib/supabase';

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  // Fetch real profile context from Supabase via React Query
  const { data, isLoading, error } = useProfile();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <aside className="w-64 bg-stone/30 border-r border-ink/5 hidden md:flex flex-col h-full sticky top-0 items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-ink/40" />
      </aside>
    );
  }

  if (error || !data?.profile) return null;

  const role = data.profile.role;

  const getLinks = () => {
    switch (role) {
      case 'brand':
        return [
          { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
          { name: 'Products', to: '/dashboard/profile', icon: PlusCircle },
          { name: 'Events', to: '/dashboard/events', icon: Calendar },
        ];
      case 'creator':
        return [
          { name: 'Overview', to: '/dashboard/creator', icon: LayoutDashboard },
          { name: 'RSVP Events', to: '/dashboard/creator/events', icon: Calendar },
          { name: 'Reviews Due', to: '/dashboard/creator/reviews', icon: CheckCircle },
        ];
      case 'admin':
        return [
          { name: 'HQ Overview', to: '/dashboard/admin', icon: LayoutDashboard },
          { name: 'Application Queue', to: '/dashboard/admin/queue', icon: Inbox },
          { name: 'Directory', to: '/dashboard/admin/directory', icon: Users },
        ];
      default:
        return [];
    }
  };

  const navLinks = getLinks();

  return (
    <aside className="w-64 bg-stone/30 border-r border-ink/5 hidden md:flex flex-col h-full sticky top-0">
      <div className="p-6">
        <Link to="/" className="text-2xl font-serif italic text-ink tracking-tight hover:text-forest transition-colors">
          Glowbridge
        </Link>
      </div>
      
      <div className="px-6 mb-2">
         <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-1">Signed in as</div>
         <div className="font-medium text-ink truncate">{data.profile.full_name || 'Protocol User'}</div>
         <div className="text-[10px] uppercase font-mono bg-moss/10 text-moss px-2 py-0.5 rounded-full inline-block mt-2">
            {role}
         </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navLinks.map((link) => {
          const isActive = path === link.to;
          return (
            <Link
              key={link.name}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-ink text-white shadow-premium' 
                  : 'text-ink/70 hover:bg-stone/50 hover:text-ink'
              }`}
            >
              <link.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-ink/50'}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto space-y-1">
        <Link
          to="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink/70 hover:bg-stone/50 hover:text-ink transition-colors"
        >
          <Settings className="w-4 h-4 text-ink/50" />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink/70 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <svg className="w-4 h-4 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Log Out
        </button>
      </div>
    </aside>
  );
}
