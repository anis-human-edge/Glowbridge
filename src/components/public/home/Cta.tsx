import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Cta() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.cta-fade'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-pearl relative border-t border-ink/5 flex flex-col items-center justify-center text-center px-6">
       <h2 className="cta-fade text-5xl sm:text-7xl font-sans tracking-tight text-ink mb-6 text-balance">
         Ready to join the <span className="font-serif italic text-forest">room?</span>
       </h2>
       <p className="cta-fade text-xl text-ink/70 max-w-xl mb-12">
         Applications are open for traction-backed brands and rising skincare creators. 
       </p>
       <div className="cta-fade flex flex-col sm:flex-row items-center gap-6">
          <Link to="/apply/brand" className="w-full sm:w-auto px-10 py-5 rounded-full bg-ink text-white font-medium hover:bg-forest transition-colors shadow-premium hover:shadow-premium-hover text-lg">
            Apply as a Brand
          </Link>
          <Link to="/apply/creator" className="w-full sm:w-auto px-10 py-5 rounded-full border border-ink/10 text-ink font-medium hover:bg-black/5 transition-colors text-lg">
            Apply as a Creator
          </Link>
       </div>
    </section>
  );
}
