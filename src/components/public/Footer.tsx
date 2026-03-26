import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-pearl pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
        <div className="md:col-span-2 space-y-6">
          <Link to="/" className="text-3xl font-serif italic text-pearl">Glowbridge</Link>
          <p className="text-pearl/60 max-w-sm text-balance leading-relaxed">
            The discovery platform connecting traction-backed skincare brands with rising creators in London.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-mono text-pearl/40 uppercase tracking-widest">Platform</h4>
          <nav className="flex flex-col gap-3">
            <Link to="/brands" className="text-pearl/80 hover:text-white transition-colors">For Brands</Link>
            <Link to="/creators" className="text-pearl/80 hover:text-white transition-colors">For Creators</Link>
            <Link to="/events" className="text-pearl/80 hover:text-white transition-colors">London Events</Link>
            <Link to="/discoveries" className="text-pearl/80 hover:text-white transition-colors">Featured Discoveries</Link>
          </nav>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-mono text-pearl/40 uppercase tracking-widest">Legal</h4>
          <nav className="flex flex-col gap-3">
            <Link to="/terms" className="text-pearl/80 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-pearl/80 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/guidelines" className="text-pearl/80 hover:text-white transition-colors">Creator Guidelines</Link>
          </nav>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-pearl/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-pearl/40">© {new Date().getFullYear()} Glowbridge. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-pearl/40 hover:text-white transition-colors">Instagram</a>
          <a href="#" className="text-sm text-pearl/40 hover:text-white transition-colors">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
