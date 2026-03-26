import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TrustSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelector('.trust-content'),
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-ink text-pearl relative px-6">
      <div className="max-w-5xl mx-auto trust-content bg-forest/20 border border-moss/20 rounded-[3rem] p-10 sm:p-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight mb-8">
            Built on <span className="font-serif italic font-light text-moss">uncompromising trust</span>.
          </h2>
          <p className="text-lg text-pearl/70 max-w-2xl mx-auto leading-relaxed mb-12">
            The foundation of Glowbridge is discipline. We do not tolerate fake curation, unsupported claims, or hidden sponsorships. UK regulatory compliance is non-negotiable, and every creator must abide by strict disclosure rules.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm font-mono text-pearl/50 uppercase tracking-wider">
            <div>✓ Strict Formulation Merit</div>
            <div>✓ Clear Hero Products</div>
            <div>✓ FTC/ASA Compliant</div>
            <div>✓ Transparent Selections</div>
          </div>
        </div>
      </div>
    </section>
  );
}
