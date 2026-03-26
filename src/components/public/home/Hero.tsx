import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    
    tl.fromTo(
      containerRef.current.querySelectorAll('.animate-hero-up'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-pearl/0 via-pearl to-stone/30 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-moss/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-10">
        <div className="animate-hero-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/10 bg-white/50 backdrop-blur-md text-xs sm:text-sm font-mono text-moss tracking-wide uppercase">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-clay animate-pulse"></span>
          Discovery from high-growth Asian ecosystems
        </div>
        
        <h1 className="animate-hero-up text-5xl sm:text-7xl md:text-[5.5rem] font-sans tracking-tight text-ink text-balance leading-[1.05]">
          <span className="font-serif italic font-light block mb-2 sm:mb-4 text-ink/80">Build the next famous,</span>
          before the market notices.
        </h1>
        
        <p className="animate-hero-up text-lg sm:text-xl text-ink/70 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
          A global discovery platform connecting traction-backed skincare brands with rising creators through curated digital showcases and premium London events.
        </p>
        
        <div className="animate-hero-up pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link to="/apply/brand" className="w-full sm:w-auto px-8 py-4 rounded-full bg-forest text-white font-medium hover:bg-ink transition-all shadow-premium hover:shadow-premium-hover flex justify-center items-center gap-2">
            Apply as a Brand
          </Link>
          <Link to="/apply/creator" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-ink border border-ink/10 font-medium hover:bg-ink/5 transition-all flex justify-center items-center gap-2">
            Apply as a Creator
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-hero-up opacity-60">
        <div className="w-[1px] h-16 bg-ink/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-ink origin-top animate-[scrolldown_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </section>
  );
}
