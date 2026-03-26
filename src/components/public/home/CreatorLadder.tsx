import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CreatorLadder() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.ladder-step'),
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  const ladder = [
    { level: 'Attendee', desc: 'Join the room. Discover products before the mainstream.' },
    { level: 'Reviewer', desc: 'Submit structured, authentic feedback. Build your profile quality.' },
    { level: 'Featured Voice', desc: 'Consistently high-signal reviews get highlighted to the ecosystem.' },
    { level: 'Guest Host', desc: 'Lead a product teardown session during a digital showcase.' },
    { level: 'Platform Partner', desc: 'Regular hosting roles, paid assignments, and equity pathways.' }
  ];

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-stone/20 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        <div className="space-y-8">
          <div className="text-sm font-mono font-medium text-moss tracking-widest uppercase">The Progression System</div>
          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-ink">
            Don't just post. <br/>
            <span className="font-serif italic font-light text-ink/70">Build authority.</span>
          </h2>
          <p className="text-lg text-ink/70 leading-relaxed text-balance">
            Generic influencer marketplaces treat you like a billboard. We treat you like a category expert. Glowbridge is built on a structured progression ladder rewarding participation, insight, and hosting ability.
          </p>
        </div>

        <div className="relative pl-8 md:pl-16 border-l-2 border-ink/10 space-y-12">
           {ladder.map((item, index) => (
             <div key={index} className="ladder-step relative">
                <div className="absolute -left-[35px] md:-left-[67px] top-1 w-4 h-4 rounded-full bg-pearl border-2 border-moss shadow-[0_0_0_4px_rgba(237,233,225,1)]"></div>
                <h4 className="text-xl font-medium text-ink mb-2 flex items-center gap-3">
                  <span className="font-mono text-sm text-moss bg-moss/10 px-2 py-0.5 rounded">Level {index + 1}</span>
                  {item.level}
                </h4>
                <p className="text-ink/60">{item.desc}</p>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
}
