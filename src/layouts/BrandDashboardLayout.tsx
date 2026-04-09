import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageSearch, 
  Store, 
  Handshake, 
  Settings, 
  LogOut, 
  BarChart4,
  CalendarCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function BrandDashboardLayout() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const navLinks = [
    { name: 'Analytics Board', path: '/brand/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Products & Audits', path: '/brand/product/new', icon: <PackageSearch size={18} /> },
    { name: 'Market Intelligence', path: '/brand/intelligence', icon: <BarChart4 size={18} /> },
    { name: 'Event Roster', path: '/brand/event/status', icon: <CalendarCheck size={18} /> },
    { name: 'Creator Deals', path: '/brand/deals', icon: <Handshake size={18} /> },
    { name: 'Brand Storefront', path: '/brand/settings/profile', icon: <Store size={18} /> },
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
            <span className="text-[10px] font-condensed tracking-widest uppercase text-ink/40 px-4 mb-2">Workspace</span>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-brand/10 text-brand font-medium'
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
             <NavLink to="/brand/settings/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ink/60 hover:bg-surfaceHover hover:text-ink transition-colors">
                <Settings size={18} />
                Settings
             </NavLink>
             <button 
               onClick={handleLogout}
               className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ink/60 hover:bg-surfaceHover hover:text-brand transition-colors text-left"
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
