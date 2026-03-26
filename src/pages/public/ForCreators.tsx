import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ShieldCheck, Star, Beaker, Dna, Lock, FileBadge2, Sparkles, ChevronRight, Activity } from 'lucide-react';

export default function ForCreators() {
  useEffect(() => {
    gsap.fromTo(
      '.creator-up',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="w-full pt-20 bg-ink text-pearl select-none">
      {/* Hero Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-moss/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
          <div className="space-y-8">
            <div className="creator-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pearl/5 border border-pearl/10 text-gold text-xs font-mono tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              Creator Protocol
            </div>
            <h1 className="creator-up text-5xl sm:text-7xl font-sans tracking-tight text-pearl text-balance leading-[1.1]">
              Stop guessing. <br/> <span className="font-serif italic text-gold">Start testing.</span>
            </h1>
            <p className="creator-up text-lg text-pearl/60 max-w-xl leading-relaxed">
              We aren't looking for standard influencers. We are building a clinical vanguard of rigorous testers, estheticians, and formulation enthusiasts. Get first access to pre-market biotech and K-Beauty.
            </p>
            <div className="creator-up pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/apply/creator" className="inline-flex px-8 py-4 rounded-full bg-white text-ink font-medium hover:bg-stone transition-all shadow-premium group items-center gap-2">
                Verify Credentials <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-xs font-mono text-pearl/30 uppercase tracking-widest pl-2">
                Q3 Acceptance: <span className="text-gold">14%</span>
              </div>
            </div>
          </div>

          {/* Floating UI Teaser */}
          <div className="creator-up relative hidden lg:block">
             <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 to-transparent rounded-[2rem] transform rotate-3 blur-xl"></div>
             <div className="bg-ink border border-pearl/10 rounded-[2rem] p-6 shadow-2xl relative z-10 overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-pearl/5 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                    <div className="w-3 h-3 rounded-full bg-gold/50"></div>
                    <div className="w-3 h-3 rounded-full bg-moss/50"></div>
                  </div>
                  <div className="text-xs font-mono text-pearl/40">Review_Artifact.tsx</div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=200&auto=format&fit=crop')] bg-cover border border-pearl/10"></div>
                     <div>
                       <div className="text-sm font-medium text-pearl">Anua Heartleaf 77% Toner</div>
                       <div className="text-xs text-pearl/50 font-mono mt-1">Status: Pre-Market Testing</div>
                     </div>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="h-2 w-full bg-pearl/5 rounded-full"></div>
                     <div className="h-2 w-4/5 bg-pearl/5 rounded-full"></div>
                     <div className="h-2 w-full bg-pearl/5 rounded-full"></div>
                  </div>

                  <div className="p-4 rounded-xl bg-pearl/5 border border-pearl/10 flex items-center justify-between">
                     <div className="flex gap-1 text-gold">
                       <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                     </div>
                     <button className="px-3 py-1.5 rounded-lg bg-moss text-white text-xs font-medium">Log Artifact</button>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* The Protocol Vault */}
      <section className="py-24 bg-ink relative border-t border-pearl/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="creator-up text-3xl md:text-5xl font-serif italic text-pearl">Inside the Vault</h2>
              <p className="creator-up text-pearl/50 max-w-xl mx-auto">No generic dropshipping. We demand rigorous clinical claims, high-active barriers, and deep Asian-market traction before it enters our ecosystem.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { title: "Clinical Peptides", cat: "Barrier Repair", tag: "Pre-Market", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop" },
                 { title: "77% Heartleaf Extract", cat: "Calming Toner", tag: "High Active", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" },
                 { title: "Ginseng Retinal", cat: "Eye Contour", tag: "K-Beauty Core", img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600&auto=format&fit=crop" }
               ].map((item, i) => (
                 <div key={i} className="creator-up group relative aspect-square rounded-3xl overflow-hidden border border-pearl/10 bg-black">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" style={{ backgroundImage: `url(${item.img})` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-6 left-6">
                       <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-pearl/10 text-xs font-mono tracking-wider uppercase text-gold">
                         <Lock className="w-3 h-3" /> {item.tag}
                       </div>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 right-6">
                       <div className="text-xs font-mono text-pearl/50 uppercase tracking-wider mb-2">{item.cat}</div>
                       <h3 className="text-2xl font-medium text-pearl">{item.title}</h3>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* The Vanguard Roster */}
      <section className="py-24 bg-pearl text-ink relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-16 items-center">
               <div className="lg:col-span-1 space-y-6">
                 <div className="creator-up w-12 h-12 rounded-full bg-ink flex items-center justify-center text-pearl shadow-sm">
                   <Activity className="w-5 h-5" />
                 </div>
                 <h2 className="creator-up text-3xl font-serif italic text-ink">We look for signal, not scale.</h2>
                 <p className="creator-up text-ink/70 leading-relaxed">
                   You do not need a million followers to join Glowbridge. You need clinical authority. We actively seek highly engaged specialists who bring rigour, honesty, and deep formulation knowledge to our beauty ecosystem.
                 </p>
                 <div className="creator-up pt-4">
                   <Link to="/apply/creator" className="inline-flex px-6 py-3 rounded-full bg-moss text-white text-sm font-medium hover:bg-ink transition-colors shadow-sm">
                     Join the Vanguard
                   </Link>
                 </div>
               </div>
               
               <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Dr. Sarah K.', role: 'Cosmetic Chemist', followers: '14k', focus: 'Formulation Teardowns', icon: <Beaker className="w-5 h-5" /> },
                    { name: 'Elena V.', role: 'Licensed Esthetician', followers: '45k', focus: 'Barrier Therapies', icon: <Dna className="w-5 h-5" /> },
                    { name: 'James M.', role: 'K-Beauty Analyst', followers: '8k', focus: 'Ingredient Cross-checking', icon: <FileBadge2 className="w-5 h-5" /> },
                    { name: 'Chloe T.', role: 'Sensitive Skin Voice', followers: '22k', focus: 'Eczema & Rosacea', icon: <Sparkles className="w-5 h-5" /> },
                  ].map((creator, i) => (
                    <div key={i} className="creator-up p-6 rounded-2xl bg-surfaceHover border border-ink/5 flex flex-col justify-between min-h-[160px] group hover:bg-white transition-colors">
                       <div className="flex justify-between items-start">
                         <div className="text-moss">{creator.icon}</div>
                         <div className="text-xs font-mono text-ink/40 bg-ink/5 px-2 py-1 rounded-md">{creator.followers} signal</div>
                       </div>
                       <div>
                         <h4 className="font-medium text-ink mb-1">{creator.name}</h4>
                         <p className="text-xs text-ink/60">{creator.role} · {creator.focus}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* The Protocol Mechanics (Give & Get) */}
      <section className="py-24 bg-ink text-pearl border-t border-pearl/5">
         <div className="max-w-6xl mx-auto px-6 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="creator-up text-4xl font-sans tracking-tight">The Protocol Mechanics</h2>
              <p className="creator-up text-pearl/50 leading-relaxed">
                This is not a generic gifting list. This is a rigorous exchange of value between clinical formulators and analytical creators. Here is exactly how it works.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
               {/* What You Get */}
               <div className="creator-up bg-white/5 border border-pearl/10 rounded-3xl p-10 space-y-8">
                 <h3 className="text-2xl font-serif italic text-gold flex items-center gap-3">
                   <Star className="w-5 h-5" /> What You Get
                 </h3>
                 <ul className="space-y-6">
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5"><ChevronRight className="w-4 h-4" /></div>
                     <div>
                       <h4 className="font-medium text-pearl">Pre-Market Access</h4>
                       <p className="text-sm text-pearl/60 mt-1">100% free, direct shipping of highly-formulated, unreleased K-Beauty and biotech products.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5"><ChevronRight className="w-4 h-4" /></div>
                     <div>
                       <h4 className="font-medium text-pearl">Direct Brand Visibility</h4>
                       <p className="text-sm text-pearl/60 mt-1">Your detailed artifacts go straight to the founding chemistry teams, bypassing PR agencies entirely.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5"><ChevronRight className="w-4 h-4" /></div>
                     <div>
                       <h4 className="font-medium text-pearl">Paid 'Guest Host' Eligibility</h4>
                       <p className="text-sm text-pearl/60 mt-1">Top-tier reviewers unlock access to lead digital teardown event panels, funded directly by Glowbridge.</p>
                     </div>
                   </li>
                 </ul>
               </div>

               {/* What We Expect */}
               <div className="creator-up bg-black/40 border border-pearl/10 rounded-3xl p-10 space-y-8">
                 <h3 className="text-2xl font-serif italic text-moss flex items-center gap-3">
                   <FileBadge2 className="w-5 h-5" /> What Is Expected
                 </h3>
                 <ul className="space-y-6">
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-moss/10 text-moss flex items-center justify-center shrink-0 mt-0.5"><Lock className="w-4 h-4" /></div>
                     <div>
                       <h4 className="font-medium text-pearl">Minimum 14-Day Testing</h4>
                       <p className="text-sm text-pearl/60 mt-1">We demand rigorous usage. You cannot review a clinical barrier serum effectively in 24 hours.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-moss/10 text-moss flex items-center justify-center shrink-0 mt-0.5"><Lock className="w-4 h-4" /></div>
                     <div>
                       <h4 className="font-medium text-pearl">Structured Artifact Submission</h4>
                       <p className="text-sm text-pearl/60 mt-1">You must submit a written 'Artifact' directly on the platform detailing texture, absorption, and isolated effects.</p>
                     </div>
                   </li>
                   <li className="flex gap-4 items-start">
                     <div className="w-6 h-6 rounded bg-moss/10 text-moss flex items-center justify-center shrink-0 mt-0.5"><Lock className="w-4 h-4" /></div>
                     <div>
                       <h4 className="font-medium text-pearl">Complete Disclosure</h4>
                       <p className="text-sm text-pearl/60 mt-1">No generic hype. State your baseline skin state, report only what you experienced, and abide by strict FTC guidelines.</p>
                     </div>
                   </li>
                 </ul>
               </div>
            </div>

            <div className="creator-up pt-12 text-center">
              <Link to="/apply/creator" className="inline-flex px-8 py-4 rounded-full bg-gold text-ink font-medium hover:bg-white transition-colors shadow-sm">
                I Understand The Terms. Verify Me.
              </Link>
            </div>
         </div>
      </section>

    </div>
  );
}
