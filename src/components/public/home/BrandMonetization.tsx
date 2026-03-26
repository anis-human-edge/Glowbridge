import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BrandMonetization() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.brand-fade'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 brand-fade">
          <div className="text-sm font-mono font-medium text-clay mb-6 tracking-widest uppercase">Supplier Value</div>
          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-ink mb-6">
            Market entry, <span className="font-serif italic text-forest">without the friction</span>.
          </h2>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            Running a standalone launch event in London costs £15k+. We deliver targeted creator access and trusted feedback loops at a fraction of the cost, repeatedly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Access & Exposure',
              desc: 'Featured showcase placements, sponsored category slots, and precise creator matching.',
            },
            {
              title: 'Activation & Sampling',
              desc: 'We coordinate the room. You send the product. We capture the reactions.',
            },
            {
              title: 'Insight & Data',
              desc: 'Get structured feedback reports, creator sentiment analysis, and market-entry intelligence.',
            }
          ].map((item, i) => (
            <div key={i} className="brand-fade p-8 rounded-[2rem] bg-stone/20 border border-ink/5 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-clay/10 flex items-center justify-center text-clay mb-6">
                 <Check strokeWidth={2.5} size={20} />
              </div>
              <h4 className="text-xl font-medium text-ink mb-4">{item.title}</h4>
              <p className="text-ink/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
