import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ValueProp() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.vp-card');
    gsap.fromTo(
      elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-stone/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans tracking-tight text-ink mb-6">
            The ecosystem for <span className="font-serif italic text-forest">growth</span>.
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            Traditional influencer marketing is broken. Glowbridge replaces cold outreach with curated, high-trust discovery events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Brand Card */}
          <div className="vp-card bg-white p-10 sm:p-14 rounded-[2rem] shadow-sm border border-ink/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-ink group-hover:scale-110 transition-transform duration-700">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM12 4a8 8 0 100 16 8 8 0 000-16z"/></svg>
            </div>
            <div className="relative z-10">
              <div className="text-sm font-mono font-medium text-clay mb-6 tracking-widest uppercase">For Brands</div>
              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-ink mb-4">
                Structured Market Entry
              </h3>
              <p className="text-ink/70 mb-8 leading-relaxed">
                Stop guessing which creators matter. We curate the room, run the process, and deliver the relationships. 
              </p>
              <ul className="space-y-4">
                {[
                  'Curated access to relevant creators',
                  'Repeated exposure via digital events',
                  'Local market visibility & credibility',
                  'Structured feedback & reactions'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-moss mt-2 shrink-0"></span>
                    <span className="text-ink/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Creator Card */}
          <div className="vp-card bg-ink p-10 sm:p-14 rounded-[2rem] shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-pearl group-hover:scale-110 transition-transform duration-700">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="relative z-10">
              <div className="text-sm font-mono font-medium text-gold mb-6 tracking-widest uppercase">For Creators</div>
              <h3 className="text-2xl sm:text-3xl font-sans font-medium text-pearl mb-4">
                Access Before the Mainstream
              </h3>
              <p className="text-pearl/70 mb-8 leading-relaxed">
                Move beyond random sponsorships. Build real credibility, test the best new formulas, and grow into a category host.
              </p>
              <ul className="space-y-4">
                {[
                  'Early access to traction-backed products',
                  'Status from being "in the room"',
                  'Pathways to hosting and monetization',
                  'Community of serious skincare voices'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></span>
                     <span className="text-pearl/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
