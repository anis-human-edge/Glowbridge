import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ShieldCheck, Crosshair, BarChart3, Users, FileBadge2, ArrowRight, Activity, Lock, FlaskConical, Fingerprint } from 'lucide-react';

export default function ForBrands() {
  useEffect(() => {
    gsap.fromTo(
      '.brand-up',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="w-full pt-20 bg-pearl text-ink select-none relative">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-ink/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-moss/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <div className="space-y-8">
            <div className="brand-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-moss text-xs font-mono tracking-wider uppercase">
              <Crosshair className="w-3.5 h-3.5" />
              Brand Acquisition Protocol
            </div>
            <h1 className="brand-up text-5xl sm:text-7xl font-sans tracking-tight text-ink text-balance leading-[1.1]">
              London market entry. <br/> <span className="font-serif italic text-forest">Engineered.</span>
            </h1>
            <p className="brand-up text-lg text-ink/60 max-w-xl leading-relaxed">
              Stop paying £15,000 for empty PR events. We put your clinical formulations directly into the hands of the UK's most rigorous estheticians and cross-checking creators. Pure signal, zero noise.
            </p>
            <div className="brand-up pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/apply/brand" className="inline-flex px-8 py-4 rounded-full bg-ink text-white font-medium hover:bg-forest transition-all shadow-sm group items-center gap-2">
                Submit Formulation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-xs font-mono text-ink/40 uppercase tracking-widest pl-2">
                Q3 Intake: <span className="text-moss">Open</span>
              </div>
            </div>
          </div>

          {/* Floating UI Teaser: Dashboard Analytics */}
          <div className="brand-up relative hidden lg:block">
             <div className="absolute inset-0 bg-gradient-to-tr from-moss/10 to-transparent rounded-[2rem] transform rotate-3 blur-xl"></div>
             <div className="bg-white border border-ink/10 rounded-[2rem] p-6 shadow-2xl relative z-10 overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-ink/5 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-ink/20"></div>
                    <div className="w-3 h-3 rounded-full bg-ink/20"></div>
                    <div className="w-3 h-3 rounded-full bg-ink/20"></div>
                  </div>
                  <div className="text-xs font-mono text-ink/40">Brand_Dashboard.tsx</div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="p-4 rounded-xl bg-surfaceHover border border-ink/5">
                        <div className="text-[10px] font-mono text-ink/40 uppercase mb-1">Clinical Coverage</div>
                        <div className="text-2xl font-medium text-ink">42</div>
                     </div>
                     <div className="p-4 rounded-xl bg-moss/5 border border-moss/10">
                        <div className="text-[10px] font-mono text-moss uppercase mb-1">Efficacy Sentiment</div>
                        <div className="text-2xl font-medium text-moss">94%</div>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="text-xs font-mono text-ink/40 uppercase">Recent Artifact Log</div>
                     <div className="p-4 rounded-xl border border-ink/5 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-stone flex-shrink-0"></div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-ink">Barrier Repair Efficacy</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-gold/10 text-gold uppercase tracking-wider">Host</span>
                          </div>
                          <div className="text-xs text-ink/60 line-clamp-2">"Significant reduction in TEWL after 14 days of isolated testing. The ceramide ratio here is highly optimized..."</div>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof: The Creator Intelligence Network */}
      <section className="py-24 bg-surfaceHover relative overflow-hidden border-b border-ink/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-16 items-center">
               <div className="lg:col-span-1 space-y-6">
                 <div className="brand-up w-12 h-12 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink shadow-sm">
                   <Users className="w-5 h-5" />
                 </div>
                 <h2 className="brand-up text-3xl font-serif italic text-ink">The Intelligence Network.</h2>
                 <p className="brand-up text-ink/70 leading-relaxed">
                   When you ship via Glowbridge, you are not handing products to generic lifestyle influencers. Your formulations are audited by our verified network of credentialed aesthetic professionals, chemists, and rigorous skincare analysts.
                 </p>
               </div>
               
               <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Clinical Rigour', desc: 'Creators mandated to test for a minimum of 14 continuous days.', icon: <FlaskConical className="w-5 h-5" /> },
                    { title: 'Ingredient Focused', desc: 'No superficial hype. Feedback isolates active ingredient efficacy.', icon: <Fingerprint className="w-5 h-5" /> },
                    { title: 'High-Trust Audiences', desc: 'Micro-creators driving exponentially higher conversion rates.', icon: <Activity className="w-5 h-5" /> },
                    { title: 'Vetted Credentials', desc: 'Only top-decile signal profiles are approved into the Protocol.', icon: <FileBadge2 className="w-5 h-5" /> },
                  ].map((trait, i) => (
                    <div key={i} className="brand-up p-6 rounded-2xl bg-white border border-ink/5 flex flex-col justify-between min-h-[160px] shadow-sm relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-6 text-ink/5">{trait.icon}</div>
                       <div className="text-forest mb-4 relative z-10">{trait.icon}</div>
                       <div className="relative z-10">
                         <h4 className="font-medium text-ink mb-1">{trait.title}</h4>
                         <p className="text-xs text-ink/60 leading-relaxed">{trait.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* The Protocol Mechanics (Give & Get) */}
      <section className="py-24 bg-white text-ink">
         <div className="max-w-6xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="brand-up text-4xl font-sans tracking-tight">The Protocol Mechanics</h2>
              <p className="brand-up text-ink/60 leading-relaxed">
                We operate on a strict, transparent exchange of value. Forget opaque PR retainers. This is exactly what you provide, and exactly what we engineer for you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               {/* What You Get */}
               <div className="brand-up bg-stone/20 border border-ink/5 rounded-3xl p-10 space-y-8">
                 <h3 className="text-2xl font-serif italic text-forest flex items-center gap-3">
                   <BarChart3 className="w-5 h-5" /> What You Get (The ROI)
                 </h3>
                 <ul className="space-y-6">
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><Activity className="w-3.5 h-3.5" /></div>
                     <div>
                       <h4 className="font-medium text-ink">Clinical Artifacts & Feedback</h4>
                       <p className="text-sm text-ink/60 mt-1">Receive structured, rigorous qualitative feedback directly from our Vanguard network on your dashboard.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><Users className="w-3.5 h-3.5" /></div>
                     <div>
                       <h4 className="font-medium text-ink">High-Signal UK Distribution</h4>
                       <p className="text-sm text-ink/60 mt-1">Your formulations seeded organically into the routines of 40+ trusted micro-influencers per campaign.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><ShieldCheck className="w-3.5 h-3.5" /></div>
                     <div>
                       <h4 className="font-medium text-ink">Fractional Capital Velocity</h4>
                       <p className="text-sm text-ink/60 mt-1">Execute a complete digital launch cycle for £99/mo rather than a £15,000 physical event overhead.</p>
                     </div>
                   </li>
                 </ul>
               </div>

               {/* What We Expect */}
               <div className="brand-up bg-white border border-ink/10 shadow-sm rounded-3xl p-10 space-y-8">
                 <h3 className="text-2xl font-serif italic text-clay flex items-center gap-3">
                   <FileBadge2 className="w-5 h-5" /> What Is Expected
                 </h3>
                 <ul className="space-y-6">
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-clay/10 text-clay border border-clay/20 flex items-center justify-center shrink-0 mt-0.5"><Lock className="w-3.5 h-3.5" /></div>
                     <div>
                       <h4 className="font-medium text-ink">Formulation Transparency</h4>
                       <p className="text-sm text-ink/60 mt-1">We reject generic dropshipping. You must submit full ingredient lists and prove active-ingredient efficacy.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-clay/10 text-clay border border-clay/20 flex items-center justify-center shrink-0 mt-0.5"><Lock className="w-3.5 h-3.5" /></div>
                     <div>
                       <h4 className="font-medium text-ink">Full-Sized Allocations</h4>
                       <p className="text-sm text-ink/60 mt-1">You must supply a minimum of 40 full-sized retail units for testing. No foil packets. No miniatures.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-clay/10 text-clay border border-clay/20 flex items-center justify-center shrink-0 mt-0.5"><Lock className="w-3.5 h-3.5" /></div>
                     <div>
                       <h4 className="font-medium text-ink">Fulfillment Coverage</h4>
                       <p className="text-sm text-ink/60 mt-1">While we handle the community orchestration, brands are responsible for the raw D2C shipping outlays.</p>
                     </div>
                   </li>
                 </ul>
               </div>
            </div>

            <div className="brand-up pt-12 text-center">
              <Link to="/apply/brand" className="inline-flex px-8 py-4 rounded-full bg-ink text-white font-medium hover:bg-forest transition-colors shadow-sm gap-2 items-center">
                I Understand The Terms. Submit Brand. <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
