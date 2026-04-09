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
    { label: 'For Brands', href: '/brands' },
    { label: 'For Creators', href: '/creators' }
  ];

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
      isScrolled ? "h-20 bg-pearl/90 backdrop-blur-md border-b border-stone/30" : "h-24 bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-ink tracking-tight uppercase">
          Bridgr.
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.label} 
              to={link.href}
              className="text-sm font-medium text-ink/70 hover:text-ink transition-colors uppercase"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-stone"></div>
          <Link to="/auth/login" className="px-5 py-2.5 rounded-full bg-ink text-pearl text-sm font-medium hover:bg-ink/80 transition-colors shadow-sm">
            SIGN IN
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
        <div className="absolute top-full left-0 right-0 bg-pearl border-b border-stone/30 p-6 flex flex-col gap-4 shadow-xl md:hidden">
          {links.map((link) => (
            <Link 
              key={link.label} 
              to={link.href}
              className="text-lg font-medium text-ink py-2 uppercase"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-[1px] w-full bg-stone my-2"></div>
          <Link to="/auth/login" className="text-lg font-medium text-ink py-2 uppercase" onClick={() => setMobileOpen(false)}>Sign In</Link>
          <Link to="/auth/register/brand" className="mt-2 text-center w-full px-5 py-3 rounded-xl bg-ink text-pearl text-lg font-medium" onClick={() => setMobileOpen(false)}>Start Brand Journey</Link>
        </div>
      )}
    </header>
  );
}
