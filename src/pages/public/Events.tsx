import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight, CheckCircle2, Star, Shield, Users, Target, MessageSquare, Briefcase, Zap, BadgeCheck, LineChart } from 'lucide-react';
import clsx from 'clsx';

export default function Events() {
  const [activeRole, setActiveRole] = useState<'brand' | 'creator'>('brand');

  useEffect(() => {
    // Basic entrance animations
    gsap.fromTo(
      '.anim-up',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="w-full pt-20 bg-pearl text-ink select-none relative overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="py-24 sm:py-32 relative overflow-hidden min-h-[90vh] flex flex-col justify-center border-b border-ink/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-clay/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-moss/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center">
          <div className="anim-up inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink/5 border border-ink/10 text-ink/80 text-xs font-mono tracking-wider uppercase mb-8">
            <Star className="w-3.5 h-3.5" />
            MONTHLY BRAND–CREATOR MATCHMAKING
          </div>
          
          <h1 className="anim-up text-6xl sm:text-8xl font-sans tracking-tight text-ink text-balance leading-[1.05] mb-8 max-w-4xl">
            The room where <br/><span className="font-serif italic text-forest">real partnerships</span> begin.
          </h1>
          
          <p className="anim-up text-xl text-ink/60 max-w-2xl leading-relaxed mb-12">
            Brands need a trusted voice. Creators need a product they believe in. One curated evening changes everything — no cold DMs, no fake followers, no broken deals.
          </p>
          
          <div className="anim-up flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/apply/brand" className="inline-flex px-8 py-4 rounded-full bg-ink text-white font-medium hover:bg-forest transition-all shadow-premium hover:shadow-premium-hover items-center gap-2">
              I'm a brand — apply <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/apply/creator" className="inline-flex px-8 py-4 rounded-full bg-white border border-ink/10 text-ink font-medium hover:bg-surfaceHover transition-all items-center gap-2">
              I'm a creator — join <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="anim-up flex flex-wrap justify-center gap-12 mt-20 pt-12 border-t border-ink/5 w-full max-w-3xl">
            <div className="text-center space-y-1">
              <div className="text-4xl font-serif italic text-ink">47</div>
              <div className="text-xs font-mono uppercase tracking-widest text-ink/40">brands launched</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-4xl font-serif italic text-ink">320+</div>
              <div className="text-xs font-mono uppercase tracking-widest text-ink/40">active creators</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-4xl font-serif italic text-ink">12</div>
              <div className="text-xs font-mono uppercase tracking-widest text-ink/40">events held</div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden bg-ink text-pearl py-3 flex border-b border-ink/10">
           <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] items-center gap-8 text-xs font-mono uppercase tracking-widest opacity-80">
             <span>CURATED BRANDS ONLY</span><span className="text-moss">•</span>
             <span>VETTED CREATORS</span><span className="text-moss">•</span>
             <span>IN-PERSON TRUST</span><span className="text-moss">•</span>
             <span>MONTHLY COHORTS</span><span className="text-moss">•</span>
             <span>COMMISSION DEALS AGREED IN-ROOM</span><span className="text-moss">•</span>
             <span>NO FOLLOWER MINIMUM</span><span className="text-moss">•</span>
             <span>NO AGENCY FEES</span><span className="text-moss">•</span>
             <span>REAL PRODUCT TRIAL</span><span className="text-moss">•</span>
             {/* Duplicate for seamless loop */}
             <span>CURATED BRANDS ONLY</span><span className="text-moss">•</span>
             <span>VETTED CREATORS</span><span className="text-moss">•</span>
             <span>IN-PERSON TRUST</span><span className="text-moss">•</span>
             <span>MONTHLY COHORTS</span><span className="text-moss">•</span>
             <span>COMMISSION DEALS AGREED IN-ROOM</span><span className="text-moss">•</span>
             <span>NO FOLLOWER MINIMUM</span><span className="text-moss">•</span>
             <span>NO AGENCY FEES</span><span className="text-moss">•</span>
             <span>REAL PRODUCT TRIAL</span>
           </div>
        </div>
      </section>

      {/* 2. WHY IT WORKS */}
      <section className="py-24 sm:py-32 bg-white border-b border-ink/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 space-y-16 relative z-10">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="anim-up text-xs font-mono uppercase tracking-widest text-ink/40">WHY IT WORKS</div>
            <h2 className="anim-up text-4xl sm:text-5xl font-sans tracking-tight">One room. <span className="font-serif italic text-moss">Both problems solved.</span></h2>
            <p className="anim-up text-ink/60 leading-relaxed text-lg">
              Every other solution — platforms, agencies, cold DMs — fails one or both parties. We fix both in the same evening.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Brands Column */}
            <div className="anim-up bg-stone/20 border border-ink/5 rounded-3xl p-10 space-y-8 relative overflow-hidden">
              <h3 className="text-2xl font-serif italic text-ink flex items-center gap-3 border-b border-ink/10 pb-6">
                BRANDS <span className="text-sm font-sans not-italic bg-white px-3 py-1 rounded-full text-ink tracking-normal relative top-[1px]">WHAT YOU GET 🎯</span>
              </h3>
              <ul className="space-y-8">
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><Target className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-ink">Pre-qualified creators, matched to your niche</h4>
                    <p className="text-sm text-ink/60 mt-2 leading-relaxed">Every creator in the room is relevant to your category. No cold list-buying, no follower-count lottery.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><Zap className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-ink">10+ warm conversations in one evening</h4>
                    <p className="text-sm text-ink/60 mt-2 leading-relaxed">Replaces 3 weeks of cold outreach. Creators who try your product in-room are already half-sold.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><MessageSquare className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-ink">Live product feedback from real promoters</h4>
                    <p className="text-sm text-ink/60 mt-2 leading-relaxed">Creators tell you what's hard to sell, what the messaging misses — before you scale.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-moss/10 text-moss border border-moss/20 flex items-center justify-center shrink-0 mt-0.5"><Shield className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-ink">Accountability built into every deal</h4>
                    <p className="text-sm text-ink/60 mt-2 leading-relaxed">Next month's event reviews results publicly. Creators who perform get more brands. No more ghosting.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Creators Column */}
            <div className="anim-up bg-ink text-white rounded-3xl p-10 space-y-8 shadow-premium relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-forest/20 blur-3xl pointer-events-none rounded-full"></div>
              <h3 className="text-2xl font-serif italic text-pearl flex items-center gap-3 border-b border-white/10 pb-6 relative z-10">
                CREATORS <span className="text-sm font-sans not-italic bg-white/10 px-3 py-1 rounded-full text-pearl tracking-normal relative top-[1px]">WHAT YOU GET 🛡️</span>
              </h3>
              <ul className="space-y-8 relative z-10">
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-white/10 text-pearl border border-white/20 flex items-center justify-center shrink-0 mt-0.5"><BadgeCheck className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-pearl">Vetted brands — your reputation stays safe</h4>
                    <p className="text-sm text-pearl/60 mt-2 leading-relaxed">Only curated brands are admitted. You'll never promote something you regret. Curation is our job.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-white/10 text-pearl border border-white/20 flex items-center justify-center shrink-0 mt-0.5"><Briefcase className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-pearl">Walk out with a deal — same evening</h4>
                    <p className="text-sm text-pearl/60 mt-2 leading-relaxed">Trial product + commission terms agreed before you leave. No weeks of chasing a reply.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-white/10 text-pearl border border-white/20 flex items-center justify-center shrink-0 mt-0.5"><Users className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-pearl">Zero follower minimum to enter</h4>
                    <p className="text-sm text-pearl/60 mt-2 leading-relaxed">Brands here want authentic storytellers, not vanity metrics. The door is open from day one.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded bg-white/10 text-pearl border border-white/20 flex items-center justify-center shrink-0 mt-0.5"><LineChart className="w-4 h-4" /></div>
                  <div>
                    <h4 className="font-medium text-pearl">A community that teaches you as you grow</h4>
                    <p className="text-sm text-pearl/60 mt-2 leading-relaxed">Shared wins, content frameworks, peers who've done it. Faster progress than going alone.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE FORMAT */}
      <section className="py-24 sm:py-32 bg-pearl relative overflow-hidden text-ink">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-20">
            <div className="anim-up text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">THE FORMAT</div>
            <h2 className="anim-up text-4xl sm:text-5xl font-sans tracking-tight mb-6">One evening. Structured.<br/><span className="font-serif italic text-clay">Intentional. Effective.</span></h2>
            <p className="anim-up text-ink/60 leading-relaxed text-lg max-w-2xl">
              Not a networking mixer. Not a conference. A precision-engineered environment for trust to form fast.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 relative">
            <div className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-ink/10"></div>
            
            {/* Step 01 */}
            <div className="anim-up relative space-y-6">
               <div className="w-14 h-14 bg-white border border-ink/10 rounded-full flex items-center justify-center text-xl font-serif italic text-ink shadow-sm relative z-10">01</div>
               <h3 className="text-2xl font-medium text-ink tracking-tight">Apply & get curated</h3>
               <p className="text-ink/60 leading-relaxed min-h-[100px]">
                 Brands submit a product brief. Creators submit a self-profile. We screen both sides — quality, niche fit, deal readiness. Not everyone gets in, and that's the point.
               </p>
               <div className="flex flex-wrap gap-2 pt-4">
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Brand brief</span>
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Creator profile</span>
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Curation filter</span>
               </div>
            </div>

            {/* Step 02 */}
            <div className="anim-up relative space-y-6">
               <div className="w-14 h-14 bg-white border border-ink/10 rounded-full flex items-center justify-center text-xl font-serif italic text-ink shadow-sm relative z-10">02</div>
               <h3 className="text-2xl font-medium text-ink tracking-tight">The evening: demo, meet, decide</h3>
               <p className="text-ink/60 leading-relaxed min-h-[100px]">
                 Brands run 3-minute floor pitches and product demo stations. Structured speed-matching rounds (8 min each). A deal room opens in the final hour for committing to trial partnerships.
               </p>
               <div className="flex flex-wrap gap-2 pt-4">
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Product demos</span>
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Speed matching</span>
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Deal room</span>
               </div>
            </div>

            {/* Step 03 */}
            <div className="anim-up relative space-y-6">
               <div className="w-14 h-14 bg-white border border-ink/10 rounded-full flex items-center justify-center text-xl font-serif italic text-ink shadow-sm relative z-10">03</div>
               <h3 className="text-2xl font-medium text-ink tracking-tight">After: track, perform, return</h3>
               <p className="text-ink/60 leading-relaxed min-h-[100px]">
                 Deals are logged. A shared dashboard tracks results. Next month's event opens with a wins board — public, visible, motivating. The best performers get first access to new brands.
               </p>
               <div className="flex flex-wrap gap-2 pt-4">
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Results tracking</span>
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Wins board</span>
                 <span className="px-3 py-1 bg-ink/5 border border-ink/10 rounded-full text-xs font-mono text-ink/60">Monthly cadence</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DEEP DIVE */}
      <section className="py-24 sm:py-32 bg-ink text-pearl">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <div className="anim-up text-xs font-mono uppercase tracking-widest text-pearl/40">DEEP DIVE</div>
            <h2 className="anim-up text-4xl font-sans tracking-tight">Built for your specific situation</h2>
            <p className="anim-up text-pearl/60 leading-relaxed max-w-xl mx-auto">
              Select your role to see exactly what the event solves for you.
            </p>
            
            <div className="anim-up inline-flex p-1 bg-white/5 rounded-full border border-white/10 mt-6">
              <button 
                onClick={() => setActiveRole('brand')}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeRole === 'brand' ? "bg-white text-ink shadow-md" : "text-pearl/60 hover:text-pearl"
                )}
              >
                I'm a brand
              </button>
              <button 
                onClick={() => setActiveRole('creator')}
                className={clsx(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeRole === 'creator' ? "bg-white text-ink shadow-md" : "text-pearl/60 hover:text-pearl"
                )}
              >
                I'm a creator
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Content */}
            <div className="anim-up space-y-8">
               <h3 className="text-3xl sm:text-4xl font-serif italic text-pearl leading-tight">
                 {activeRole === 'brand' 
                   ? "You built a great product. Now you need people to believe in it." 
                   : "You have a trusted voice. Now you need products you actually believe in."}
               </h3>
               <p className="text-lg text-pearl/70 leading-relaxed">
                 {activeRole === 'brand'
                   ? "The hardest part of launching isn't the product — it's the first wave of credible, authentic voices. This event gives you direct access to storytellers who believe what they promote."
                   : "The hardest part of growing isn't making content — it's finding brand partners who respect your integrity and offer fair terms. This event gives you direct access to curated brands with real products ready for trial."}
               </p>
               
               <ul className="space-y-4 pt-4">
                 {activeRole === 'brand' ? (
                   <>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Stop burning budget on influencer platforms that deliver mismatched creators</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Get live messaging feedback before you scale your ad spend</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Commission-only deals mean zero upfront cost until sales happen</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Build a reliable, repeating cohort of creators — not a one-off campaign</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Your product goes home with creators who tried it in-room</li>
                   </>
                 ) : (
                    <>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Stop sending cold DMs to brands that never reply</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Experience the product firsthand before ever recommending it</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Trial product + commission terms agreed before you leave the room</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Build long-term relationships with brands who value your work</li>
                     <li className="flex gap-4 text-pearl/80"><CheckCircle2 className="w-5 h-5 text-moss shrink-0" /> Go home with full-sized products to start testing immediately</li>
                   </>
                 )}
               </ul>
            </div>

            {/* Right Content - Stats Table */}
            <div className="anim-up bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10">
               <div className="text-xs font-mono text-pearl/40 uppercase tracking-widest mb-8">
                 {activeRole === 'brand' ? 'WHAT BRANDS TYPICALLY LEAVE WITH' : 'WHAT CREATORS TYPICALLY LEAVE WITH'}
               </div>
               
               <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-white/10 pb-6">
                   <div className="text-pearl/80">Avg. {activeRole === 'brand' ? 'creator conversations per night' : 'brand demos per night'}</div>
                   <div className="text-xl font-medium">8 – 14</div>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-6">
                   <div className="text-pearl/80">Trial partnerships agreed in-room</div>
                   <div className="text-xl font-medium">3 – 6</div>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-6">
                   <div className="text-pearl/80">Time saved vs cold outreach</div>
                   <div className="text-xl font-medium">~3 weeks</div>
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-6">
                   <div className="text-pearl/80">Participation cost model</div>
                   <div className="text-xl font-medium text-right">{activeRole === 'brand' ? 'Product + flat fee' : '100% Free'}</div>
                 </div>
                 <div className="flex justify-between items-center">
                   <div className="text-pearl/80">{activeRole === 'brand' ? 'Creator follower minimum' : 'Follower minimum'}</div>
                   <div className="text-xl font-medium text-right">None</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FROM THE ROOM (Testimonials) */}
      <section className="py-24 sm:py-32 bg-stone/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16">
            <div className="anim-up text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">FROM THE ROOM</div>
            <h2 className="anim-up text-4xl font-serif italic text-ink tracking-tight">What people say the morning after</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="anim-up bg-white border border-ink/5 p-10 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono border border-ink/10 rounded px-2 py-1 inline-block uppercase text-ink/60 mb-6 tracking-widest">BRAND</div>
                <div className="text-4xl text-ink/20 font-serif leading-none h-6">"</div>
                <p className="text-ink/80 leading-relaxed italic relative z-10 mb-8 font-serif text-lg">
                  I spent two months on cold outreach before this. One evening here gave me more qualified conversations than all of that combined — and three of those creators posted within the week.
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-ink/5 pt-6 mt-auto">
                 <div className="w-10 h-10 rounded-full bg-forest text-pearl flex items-center justify-center font-medium text-sm">SL</div>
                 <div>
                   <div className="font-medium text-ink">Sarah L.</div>
                   <div className="text-xs text-ink/50">Founder, skincare brand · 2nd event</div>
                 </div>
              </div>
            </div>

            <div className="anim-up bg-white border border-ink/5 p-10 rounded-2xl shadow-sm flex flex-col justify-between md:translate-y-8">
              <div>
                <div className="text-[10px] font-mono border border-ink/10 rounded px-2 py-1 inline-block uppercase text-ink/60 mb-6 tracking-widest">CREATOR</div>
                <div className="text-4xl text-ink/20 font-serif leading-none h-6">"</div>
                <p className="text-ink/80 leading-relaxed italic relative z-10 mb-8 font-serif text-lg">
                  I only have 4k followers. Every platform I tried told me I wasn't big enough. Here, the brand literally gave me their product and said — just tell your story. That's all I needed.
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-ink/5 pt-6 mt-auto">
                 <div className="w-10 h-10 rounded-full bg-clay text-pearl flex items-center justify-center font-medium text-sm">MO</div>
                 <div>
                   <div className="font-medium text-ink">Marcus O.</div>
                   <div className="text-xs text-ink/50">Lifestyle creator · 1st event</div>
                 </div>
              </div>
            </div>

            <div className="anim-up bg-white border border-ink/5 p-10 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono border border-ink/10 rounded px-2 py-1 inline-block uppercase text-ink/60 mb-6 tracking-widest">BRAND</div>
                <div className="text-4xl text-ink/20 font-serif leading-none h-6">"</div>
                <p className="text-ink/80 leading-relaxed italic relative z-10 mb-8 font-serif text-lg">
                  A creator told me my packaging was confusing in the first five minutes. I would never have heard that online. We redesigned it before our paid campaign. That feedback alone was worth the evening.
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-ink/5 pt-6 mt-auto">
                 <div className="w-10 h-10 rounded-full bg-gold/90 text-white flex items-center justify-center font-medium text-sm">JK</div>
                 <div>
                   <div className="font-medium text-ink">James K.</div>
                   <div className="text-xs text-ink/50">Co-founder, wellness brand · 3rd event</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. NEXT EVENT CTA */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="anim-up bg-ink text-pearl rounded-3xl p-10 sm:p-16 text-center space-y-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-forest/30 blur-3xl pointer-events-none rounded-full transform translate-x-1/4 -translate-y-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-moss/30 blur-3xl pointer-events-none rounded-full transform -translate-x-1/4 translate-y-1/4"></div>
            
            <div className="relative z-10 space-y-4">
              <h2 className="text-4xl sm:text-5xl font-serif italic text-white tracking-tight">The next room is being filled now.</h2>
              <p className="text-pearl/70 max-w-xl mx-auto text-lg leading-relaxed">
                Brands and creators are curated in advance. Spaces are limited on both sides to keep the room high-quality. Apply early.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap justify-center gap-8 sm:gap-16 pt-4">
               <div className="space-y-1">
                 <div className="text-xs font-mono text-pearl/40 uppercase tracking-widest">DATE</div>
                 <div className="text-xl font-medium tracking-tight">May 15, 2026</div>
               </div>
               <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
               <div className="space-y-1">
                 <div className="text-xs font-mono text-pearl/40 uppercase tracking-widest">LOCATION</div>
                 <div className="text-xl font-medium tracking-tight">London, UK</div>
               </div>
               <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
               <div className="space-y-1">
                 <div className="text-xs font-mono text-pearl/40 uppercase tracking-widest">SPOTS REMAINING</div>
                 <div className="text-xl font-medium tracking-tight text-white">8 brands · 40 creators</div>
               </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-center justify-center pt-8 border-t border-white/10">
              <Link to="/apply/brand" className="w-full sm:w-auto inline-flex px-8 py-4 rounded-full bg-white text-ink font-medium hover:bg-stone transition-all justify-center items-center gap-2">
                Apply as a brand <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/apply/creator" className="w-full sm:w-auto inline-flex px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all justify-center items-center gap-2">
                Join as a creator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/5 opacity-40">
               <div className="flex justify-center gap-4 text-xs font-mono uppercase tracking-widest">
                  <span>© 2026 Bridgr.</span>
                  <span>Monthly brand–creator events.</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[marquee_20s_linear_infinite\\] {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
