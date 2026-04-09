import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-pearl pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12 mb-16 border-b border-pearl/10 pb-16">
        
        <div className="md:w-1/3 text-center md:text-left">
          <Link to="/" className="text-4xl font-serif font-bold text-pearl uppercase tracking-tight mb-4 inline-block">Bridgr.</Link>
          <p className="text-pearl/60 text-lg leading-relaxed">
            The platform linking serious brands to credible London creators via a curated monthly flagship event.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 gap-12 w-full md:w-1/2">
          <div className="space-y-4">
            <h4 className="text-xs font-condensed text-pearl/40 uppercase tracking-widest">Platform</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/brands" className="text-pearl/80 hover:text-white transition-colors">For Brands</Link>
              <Link to="/creators" className="text-pearl/80 hover:text-white transition-colors">For Creators</Link>
              <Link to="/auth/login" className="text-pearl/80 hover:text-white transition-colors">Sign In</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs font-condensed text-pearl/40 uppercase tracking-widest">Legal</h4>
            <nav className="flex flex-col gap-3">
              <Link to="#" className="text-pearl/80 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-pearl/80 hover:text-white transition-colors">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-pearl/40">
        <p>© 2026 Bridgr. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
