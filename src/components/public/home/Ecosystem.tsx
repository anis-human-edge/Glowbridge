import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Ecosystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.eco-fade'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-pearl relative border-t border-ink/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="eco-fade text-3xl sm:text-4xl md:text-5xl font-sans tracking-tight text-ink mb-16">
          Sourced from <span className="font-serif italic text-clay">high-growth</span> ecosystems.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="eco-fade flex flex-col items-center">
             <div className="w-full aspect-[4/3] rounded-2xl bg-stone/50 mb-6 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=800&auto=format&fit=crop" alt="South Korea" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" />
               <div className="absolute inset-0 bg-ink/10"></div>
             </div>
             <h3 className="text-xl font-medium text-ink mb-2">South Korea</h3>
             <p className="text-sm font-mono text-ink/40 uppercase tracking-widest">K-Beauty 2.0</p>
             <p className="mt-4 text-ink/60 text-sm max-w-xs text-balance">Advanced technology, proven efficacy, and global prestige built into the formulations.</p>
          </div>

          <div className="eco-fade flex flex-col items-center md:-translate-y-8">
             <div className="w-full aspect-[4/3] rounded-2xl bg-stone/50 mb-6 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1508804185872-d7bad188e36d?q=80&w=800&auto=format&fit=crop" alt="China" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" />
               <div className="absolute inset-0 bg-ink/10"></div>
             </div>
             <h3 className="text-xl font-medium text-ink mb-2">China</h3>
             <p className="text-sm font-mono text-ink/40 uppercase tracking-widest">Innovation Velocity</p>
             <p className="mt-4 text-ink/60 text-sm max-w-xs text-balance">Rapid ingredient iteration and massive scale driving the next wave of skincare dynamics.</p>
          </div>

          <div className="eco-fade flex flex-col items-center">
             <div className="w-full aspect-[4/3] rounded-2xl bg-stone/50 mb-6 overflow-hidden relative">
               <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop" alt="Japan" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80" />
               <div className="absolute inset-0 bg-ink/10"></div>
             </div>
             <h3 className="text-xl font-medium text-ink mb-2">Japan</h3>
             <p className="text-sm font-mono text-ink/40 uppercase tracking-widest">J-Beauty Heritage</p>
             <p className="mt-4 text-ink/60 text-sm max-w-xs text-balance">Minimalist refinement, long-term skin health, and premium formulation stability.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
