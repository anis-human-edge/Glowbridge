import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Filter, Eye, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DiscoveryEngine() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      containerRef.current.querySelectorAll('.engine-step'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );
  }, []);

  const steps = [
    {
      icon: Filter,
      title: 'Traction-First Curation',
      desc: 'We filter out the noise. Only brands showing real social traction, clear hero products, and credible formulations make the cut.'
    },
    {
      icon: Eye,
      title: 'Contextual Exposure',
      desc: 'Products are not just listed—they are translated. Chosen creators explain where formulas fit into real routines.'
    },
    {
      icon: Activity,
      title: 'Repeat Trust Loops',
      desc: 'Discovery is a loop, not a funnel. We create repeated engagement through digital sessions and post-event artifacts.'
    }
  ];

  return (
    <section ref={containerRef} className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 pr-0 md:pr-12">
            <h2 className="text-3xl sm:text-5xl font-sans tracking-tight text-ink">
              The Engine of <br/>
              <span className="font-serif italic font-light text-ink/70">Credibility</span>.
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed text-balance">
              The modern skincare domain is won by social discovery, creator translation, and frictionless access. We engineer the most effective discovery-and-trust environment for emerging brands.
            </p>
            
            <div className="space-y-6 pt-4">
              {steps.map((step, idx) => (
                <div key={idx} className="engine-step flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-stone/50 flex flex-col items-center justify-center shrink-0 text-moss">
                    <step.icon strokeWidth={1.5} size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-ink mb-1">{step.title}</h4>
                    <p className="text-ink/60 leading-relaxed text-sm sm:text-base">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="engine-step relative aspect-square md:aspect-[4/5] bg-stone/30 rounded-[2.5rem] overflow-hidden flex items-center justify-center border border-ink/5">
             <div className="absolute inset-0 bg-grain opacity-20"></div>
             {/* Abstract visual representing the curation engine */}
             <div className="relative w-2/3 h-2/3 border border-ink/10 rounded-full flex items-center justify-center">
                <div className="w-2/3 h-2/3 border border-moss/30 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                   <div className="w-3 h-3 bg-moss rounded-full absolute -top-1.5"></div>
                </div>
                <div className="absolute w-1/3 h-1/3 border border-clay/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                   <div className="w-2 h-2 bg-clay rounded-full absolute -bottom-1"></div>
                </div>
                <div className="absolute font-serif italic text-2xl text-ink">Trust</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
