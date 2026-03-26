import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EventSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.event-card'),
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
    <section ref={containerRef} className="py-24 sm:py-32 bg-ink text-pearl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-moss/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="text-sm font-mono font-medium text-moss mb-6 tracking-widest uppercase">The Event Layer</div>
          <h2 className="text-3xl sm:text-5xl font-sans tracking-tight mb-6">
            Digital scale. <span className="font-serif italic font-light text-pearl/80">Physical trust.</span>
          </h2>
          <p className="text-lg text-pearl/60 max-w-2xl mx-auto">
            The platform is not just a directory. We run recurring rituals where products are introduced, tested, and discussed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="event-card bg-white/5 border border-white/10 p-10 sm:p-12 rounded-[2rem] backdrop-blur-sm hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-serif italic mb-2">Weekly Digital Showcase</h3>
            <p className="font-mono text-sm text-pearl/40 mb-8 uppercase tracking-wider">Global Access</p>
            
            <p className="text-pearl/70 leading-relaxed mb-8">
              A recurring 60-minute online room. We introduce 2-3 selected brands, host a product deep-dive with founders, and run a live creator panel for honest reactions and Q&A.
            </p>
            
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                 <span className="text-pearl/50">Host Welcome & Discovery</span>
                 <span className="font-mono text-pearl/80">15m</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                 <span className="text-pearl/50">Brand Product Deep-dive</span>
                 <span className="font-mono text-pearl/80">15m</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                 <span className="text-pearl/50">Creator Reactions & Panel</span>
                 <span className="font-mono text-moss">20m</span>
               </div>
               <div className="flex justify-between items-center text-sm pb-2">
                 <span className="text-pearl/50">Community Q&A</span>
                 <span className="font-mono text-pearl/80">10m</span>
               </div>
            </div>
          </div>

          <div className="event-card bg-forest p-10 sm:p-12 rounded-[2rem] shadow-xl border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973bd0f32d7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-transparent"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-2xl font-serif italic mb-2 text-white">Monthly Physical Meetup</h3>
              <p className="font-mono text-sm text-pearl/60 mb-8 uppercase tracking-wider">London Only</p>
              
              <div className="mt-auto pt-16">
                <p className="text-white/90 leading-relaxed text-lg font-medium mb-6">
                  Online creates scale, physical creates trust. 
                </p>
                <p className="text-white/70 leading-relaxed max-w-sm">
                  We convert digital momentum into real-world credibility. Invited creators and brands meet face-to-face in curated, insider cultural gatherings to test products and build deep relationships.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
