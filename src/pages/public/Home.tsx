import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, MapPin, Target, Sparkles, Building2, Zap, ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-pearl text-ink font-sans antialiased selection:bg-brand selection:text-white pb-20">
      {/* HERO SECTION */}
      <section className="pt-24 md:pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <span className="text-[11px] font-condensed tracking-[0.3em] uppercase text-ink/50 mb-6 flex items-center justify-center gap-3">
          Authentic Reviews <span className="w-1 h-1 rounded-full bg-ink/30"></span> 
          Seamless Matches <span className="w-1 h-1 rounded-full bg-ink/30"></span> 
          Local Trustpad
        </span>
        
        <h2 className="text-6xl md:text-8xl font-serif text-ink tracking-tight leading-[0.9] mb-8 max-w-5xl">
          Build Real Trust<br/>
          <span className="text-ink/30 italic">and</span> Wins.
        </h2>
        
        <p className="text-xl md:text-2xl text-ink/70 max-w-3xl mb-16 leading-relaxed">
          Bridgr is a localised platform featuring a monthly flagship event — built to turn two-sided frustration into partnerships that actually work. 
          <br/><br/>
          <span className="text-base text-ink/60">Brands gain the social proof, high-fidelity content, and word-of-mouth momentum they need to launch. Creators get vetted products, direct access, and the professional income they deserve.</span>
        </p>

        {/* DUAL CTAS */}
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
           <Link to="/auth/register/brand" className="group flex-1 bg-surface border border-stone/50 hover:border-brand/50 hover:shadow-premium rounded-2xl p-6 text-left transition-all duration-300">
             <div className="bg-brand/10 w-10 h-10 rounded-full flex items-center justify-center text-brand mb-4">🏷️</div>
             <h3 className="font-serif text-xl mb-2 text-ink">I'm launching a product</h3>
             <p className="text-sm text-ink/60 mb-6">Market intelligence, creator partnerships, and a launchpad event — all in one place.</p>
             <div className="flex items-center text-brand text-sm font-medium gap-2 group-hover:gap-4 transition-all">
               Start Brand Journey <ArrowRight size={16} />
             </div>
           </Link>

           <Link to="/auth/register/creator" className="group flex-1 bg-surface border border-stone/50 hover:border-creator/50 hover:shadow-premium rounded-2xl p-6 text-left transition-all duration-300">
             <div className="bg-creator/10 w-10 h-10 rounded-full flex items-center justify-center text-creator mb-4">✨</div>
             <h3 className="font-serif text-xl mb-2 text-ink">I create content</h3>
             <p className="text-sm text-ink/60 mb-6">Discover products you believe in, build your reputation, and grow your income.</p>
             <div className="flex items-center text-creator text-sm font-medium gap-2 group-hover:gap-4 transition-all">
               Join Creator Network <ArrowRight size={16} />
             </div>
           </Link>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-stone/40 bg-surface/50 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-32 text-center">
           <div>
             <div className="text-4xl font-serif text-ink tracking-tighter mb-1">320+</div>
             <div className="text-xs font-condensed tracking-widest text-ink/40 uppercase">Active Creators</div>
           </div>
           <div>
             <div className="text-4xl font-serif text-ink tracking-tighter mb-1">47</div>
             <div className="text-xs font-condensed tracking-widest text-ink/40 uppercase">Brands Launched</div>
           </div>
           <div>
             <div className="text-4xl font-serif text-ink tracking-tighter mb-1">28d</div>
             <div className="text-xs font-condensed tracking-widest text-ink/40 uppercase">Avg. To First Sale</div>
           </div>
        </div>
      </section>

      {/* HOW IT WORKS DUAL TRACK */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
           <h3 className="text-xs font-condensed tracking-widest text-ink/40 uppercase mb-4">How it Works</h3>
           <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight mb-6">You arrive at the event already knowing who you want to meet.</h2>
           <p className="text-ink/60 text-lg">The platform does the groundwork in the weeks before. The event is where everything that's been building — intelligence, interest, signals — comes to a head.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          
          {/* BRAND COLUMN */}
          <div className="flex flex-col gap-12 relative">
             <div className="absolute left-6 top-8 bottom-0 w-px bg-brand/20 -z-10"></div>
             
             <div className="sticky top-32 bg-pearl pb-4 z-10 w-full mb-8">
               <h3 className="text-brand text-sm font-semibold tracking-widest uppercase mb-2">Brands</h3>
               <h4 className="text-3xl font-serif text-ink">From invisible to in-demand.</h4>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-brand text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">1</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Your product gets a full market picture</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">System analyses your product against the market — giving clarity on your positioning, competitive edge, and audience fit.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-brand">Know Your Market Position</span>
               </div>
             </div>
             
             <div className="flex gap-6 relative">
               <div className="bg-brand text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">2</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Creators tell you what they think</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Honest pre-market feedback you'd normally pay thousands for — delivered before the event via the dynamic product pool.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-brand">Pre-Launch Market Validation</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-brand text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">3</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Choose how you show up</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Apply for a featured launch slot. Still building momentum? Send products to interested creators to keep collecting feedback.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-brand">Launch On Your Terms</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-brand text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">4</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Walk in knowing exactly who to meet</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">See which creators engaged with your product and how well they match your audience. A confirmed shortlist of interested parties.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-brand">Warm Introductions</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-brand text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">5</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Deals agreed. Content starts.</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Partnerships committed on the night. Trial products go home. Reviews, reels, and affiliate content live within 30 days.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-brand">Real Output. Real Sales.</span>
               </div>
             </div>
          </div>

          {/* CREATOR COLUMN */}
          <div className="flex flex-col gap-12 relative">
             <div className="absolute left-6 top-8 bottom-0 w-px bg-creator/20 -z-10"></div>

             <div className="sticky top-32 bg-pearl pb-4 z-10 w-full mb-8">
               <h3 className="text-creator text-sm font-semibold tracking-widest uppercase mb-2">Creators</h3>
               <h4 className="text-3xl font-serif text-ink">From overlooked to recognised.</h4>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-creator text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">1</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Discover products worth your voice</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Browse a curated pool of new brands — each one reviewed before it enters. No scrolling through junk.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-creator">Your Taste, Respected</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-creator text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">2</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Your opinion shapes features</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Reacting and commenting directly influences which brands get the spotlight. Your voice carries weight here.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-creator">Influence Without Follower Counts</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-creator text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">3</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Get recognised for real intent</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Creators who contribute thoughtfully rise to the top of our monthly recognition programme. Quality matters, not volume.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-creator">Merit-Based</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-creator text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">4</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Arrive with targets in mind</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">The event isn't a blind date — it's the moment you meet the founder of the brand you've already decided to like.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-creator">Purposeful Night</span>
               </div>
             </div>

             <div className="flex gap-6 relative">
               <div className="bg-creator text-white w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl shrink-0 shadow-md">5</div>
               <div>
                  <h5 className="text-xl font-medium mb-2">Walk away with deals & products</h5>
                  <p className="text-ink/60 leading-relaxed mb-3">Commission terms agreed in the room. Trial product in your hands. Portfolio of credible brand associations grows instantly.</p>
                  <span className="text-[10px] font-condensed tracking-widest uppercase text-creator">Income & Career Together</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* THE EVENT BANNER */}
      <section className="bg-ink text-pearl py-24 my-20">
        <div className="max-w-6xl mx-auto px-6">
           <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
             <div className="flex items-center gap-3 text-brand text-xs font-semibold tracking-widest uppercase mb-6">
                <Star size={16} /> Bridgr Flagship Event
             </div>
             <h2 className="text-5xl md:text-6xl font-serif leading-tight mb-6">The room where real partnerships begin.<br/><span className="text-pearl/40 italic">Every month.</span></h2>
             <p className="text-pearl/60 text-xl font-sans leading-relaxed">It's where the market intelligence, the creator engagement, and the mutual interest — all of it — crystallises into actual deals, in a single curated evening.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-pearl/5 border border-pearl/10 p-8 rounded-2xl">
                 <MapPin className="text-brand mb-4 shrink-0" size={32} />
                 <h4 className="text-xl font-medium mb-2">Monthly Cadence</h4>
                 <p className="text-pearl/50 text-sm leading-relaxed">The rhythm creates urgency and accountability. Show up consistently and the room starts working for you.</p>
              </div>
              <div className="bg-pearl/5 border border-pearl/10 p-8 rounded-2xl">
                 <ShieldCheck className="text-creator mb-4 shrink-0" size={32} />
                 <h4 className="text-xl font-medium mb-2">Curated Room</h4>
                 <p className="text-pearl/50 text-sm leading-relaxed">Both sides curated before each event. Not a generic mixer. Real intent from everyone present.</p>
              </div>
              <div className="bg-pearl/5 border border-pearl/10 p-8 rounded-2xl">
                 <Target className="text-amber-500 mb-4 shrink-0" size={32} />
                 <h4 className="text-xl font-medium mb-2">The Top 10 Reveal</h4>
                 <p className="text-pearl/50 text-sm leading-relaxed">The 10 most compelling products and 10 most engaged creators surfaced. Being featured is earned.</p>
              </div>
           </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto">
        <div className="mb-16">
          <h3 className="text-xs font-condensed tracking-widest text-ink/40 uppercase mb-4">Four things we stand by</h3>
          <h2 className="text-4xl md:text-5xl font-serif text-ink leading-tight">Built so trust isn't a feature.<br/>It's the foundation.</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
           <div className="flex flex-col">
              <h4 className="text-xl font-medium mb-3 flex items-center gap-3"><span className="text-ink/20 font-serif">01</span> Editorial Curation</h4>
              <p className="text-ink/60 leading-relaxed mb-4">Every brand and every creator is reviewed before they enter. Real products. Fair terms. Genuine intent. Bad actors on either side are never admitted.</p>
              <p className="text-sm border-l-2 border-stone pl-4 text-ink/80 italic">"Everyone there had earned their place. That changes the whole dynamic."</p>
           </div>
           <div className="flex flex-col">
              <h4 className="text-xl font-medium mb-3 flex items-center gap-3"><span className="text-ink/20 font-serif">02</span> Physical Trust</h4>
              <p className="text-ink/60 leading-relaxed mb-4">You cannot read a founder through a pitch deck. Meeting in person compresses weeks of trust-building into one single conversation.</p>
              <p className="text-sm border-l-2 border-stone pl-4 text-ink/80 italic">"I knew within five minutes whether I wanted to work with them."</p>
           </div>
           <div className="flex flex-col">
              <h4 className="text-xl font-medium mb-3 flex items-center gap-3"><span className="text-ink/20 font-serif">03</span> Monthly Accountability</h4>
              <p className="text-ink/60 leading-relaxed mb-4">Urgency that keeps both sides honest. Results are visible to the community. Relationships deepen every single cycle.</p>
              <p className="text-sm border-l-2 border-stone pl-4 text-ink/80 italic">"By month three, I didn't need to explain myself to new brands anymore."</p>
           </div>
           <div className="flex flex-col">
              <h4 className="text-xl font-medium mb-3 flex items-center gap-3"><span className="text-ink/20 font-serif">04</span> Output, Not Theatre</h4>
              <p className="text-ink/60 leading-relaxed mb-4">The event is just the beginning. Bridgr produces output that lives on: reviews indexed, videos converting, affiliate content earning while you sleep.</p>
              <p className="text-sm border-l-2 border-stone pl-4 text-ink/80 italic">"Three months later I was still getting sales from content posted that week."</p>
           </div>
        </div>
      </section>

      {/* NEXT EVENT FOOTER CTA */}
      <section className="bg-surface border-t border-stone/50 mt-20 pt-20 pb-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          
          <div className="flex-1">
             <h2 className="text-4xl font-serif text-ink mb-4">The room is being filled.</h2>
             <p className="text-ink/60 text-lg max-w-md mb-8">Both sides are curated before each event. Join the platform today—the product pool is open, the next event is close, and spots fill fast.</p>
             <div className="flex flex-col sm:flex-row gap-4">
               <Link to="/auth/register/brand" className="bg-brand text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand/90 transition-colors shadow-md">
                  Submit Product <ArrowUpRight size={18} />
               </Link>
               <Link to="/auth/register/creator" className="bg-creator text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-creator/90 transition-colors shadow-md">
                  Join as Creator <ArrowUpRight size={18} />
               </Link>
             </div>
          </div>

          <div className="bg-pearl border border-stone/50 rounded-2xl p-8 shadow-sm min-w-[320px]">
             <h3 className="font-serif text-2xl mb-6">Next Event</h3>
             <ul className="space-y-4">
                <li className="flex justify-between border-b border-stone/40 pb-4">
                  <span className="text-ink/50 text-sm uppercase tracking-widest font-condensed">Date</span>
                  <span className="font-medium text-ink">15 May 2026</span>
                </li>
                <li className="flex justify-between border-b border-stone/40 pb-4">
                  <span className="text-ink/50 text-sm uppercase tracking-widest font-condensed">Location</span>
                  <span className="font-medium text-ink">London, UK</span>
                </li>
                <li className="flex justify-between border-b border-stone/40 pb-4">
                  <span className="text-ink/50 text-sm uppercase tracking-widest font-condensed">Brand Spots</span>
                  <span className="font-medium text-brand">8 Remaining</span>
                </li>
                <li className="flex justify-between border-b border-stone/40 pb-4">
                  <span className="text-ink/50 text-sm uppercase tracking-widest font-condensed">Creator Spots</span>
                  <span className="font-medium text-creator">40 Remaining</span>
                </li>
                <li className="flex justify-between pb-1">
                  <span className="text-ink/50 text-sm uppercase tracking-widest font-condensed">Product Pool</span>
                  <span className="font-medium text-ink flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Open Now</span>
                </li>
             </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-stone/40 flex flex-col md:flex-row justify-between items-center text-sm text-ink/40">
           <p>© 2026 Bridgr · Monthly brand–creator events · London</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-ink">Privacy</a>
             <a href="#" className="hover:text-ink">Contact</a>
             <a href="#" className="hover:text-ink">Instagram</a>
             <a href="#" className="hover:text-ink">LinkedIn</a>
           </div>
        </div>
      </section>

    </div>
  );
}
