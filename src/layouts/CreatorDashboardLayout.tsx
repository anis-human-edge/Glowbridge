import { Outlet, NavLink } from 'react-router-dom';
import { 
  BarChart, 
  ShoppingBag, 
  MessageSquareHeart, 
  Building2, 
  PiggyBank, 
  Settings, 
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CreatorDashboardLayout() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const navLinks = [
    { name: 'Standing', path: '/creator/dashboard', icon: <BarChart size={18} /> },
    { name: 'Product Pool', path: '/creator/products', icon: <ShoppingBag size={18} /> },
    { name: 'My Reviews', path: '/creator/my-reviews', icon: <MessageSquareHeart size={18} /> },
    { name: 'Brands Browser', path: '/creator/brands', icon: <Building2 size={18} /> },
    { name: 'Deals & Income', path: '/creator/deals', icon: <PiggyBank size={18} /> }
  ];

  return (
    <div className="flex bg-pearl min-h-screen text-ink antialiased font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-stone/60 bg-surface flex flex-col justify-between fixed h-full z-10">
        <div>
          {/* Logo Handle */}
          <div className="h-20 flex items-center px-8 border-b border-stone/60">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-ink uppercase">Bridgr.</h1>
          </div>

          {/* Links */}
          <nav className="p-4 flex flex-col gap-1 mt-4">
            <span className="text-[10px] font-condensed tracking-widest uppercase text-ink/40 px-4 mb-2">Creator Hub</span>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-creator/10 text-creator font-medium'
                      : 'text-ink/60 hover:bg-surfaceHover hover:text-ink'
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Core Actions */}
        <div className="p-4 border-t border-stone/60 mb-2">
          <nav className="flex flex-col gap-1">
             <NavLink to="/creator/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ink/60 hover:bg-surfaceHover hover:text-ink transition-colors">
                <Settings size={18} />
                Settings
             </NavLink>
             <button 
               onClick={handleLogout}
               className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ink/60 hover:bg-surfaceHover hover:text-creator transition-colors text-left"
             >
                <LogOut size={18} />
                Log Out
             </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 ml-64 p-10 max-w-6xl">
        <Outlet />
      </main>

    </div>
  );
}
