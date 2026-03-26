import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'The Index', href: '/the-index' },
    { label: 'Discoveries', href: '/discoveries' },
    { label: 'For Creators', href: '/creators' },
    { label: 'For Brands', href: '/brands' },
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
      isScrolled ? "h-16 bg-pearl/90 backdrop-blur-md border-b border-ink/5" : "h-24 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif italic text-ink tracking-tight">
          Glowbridge
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.label} 
              to={link.href}
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-ink/10"></div>
          <Link to="/dashboard" className="text-sm font-medium text-ink hover:text-moss transition-colors">
            Sign In
          </Link>
          <Link to="/apply" className="px-5 py-2 rounded-full bg-ink text-pearl text-sm font-medium hover:bg-forest transition-colors shadow-premium hover:shadow-premium-hover">
            Apply
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-pearl border-b border-ink/5 p-6 flex flex-col gap-4 shadow-xl md:hidden">
          {links.map((link) => (
            <Link 
              key={link.label} 
              to={link.href}
              className="text-lg font-medium text-ink py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-[1px] w-full bg-ink/10 my-2"></div>
          <Link to="/dashboard" className="text-lg font-medium text-ink py-2" onClick={() => setMobileOpen(false)}>Sign In</Link>
          <Link to="/apply" className="mt-2 text-center w-full px-5 py-3 rounded-full bg-ink text-pearl text-lg font-medium" onClick={() => setMobileOpen(false)}>Apply</Link>
        </div>
      )}
    </header>
  );
}
