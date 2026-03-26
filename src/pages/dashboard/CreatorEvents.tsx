import { useState } from 'react';
import { Calendar, Video, Clock } from 'lucide-react';

export default function CreatorEvents() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-semibold text-ink tracking-tight">Your Event Invitations</h1>
        <p className="text-sm text-ink/60 mt-1">RSVP to curated showcases to access new products and build your platform reputation.</p>
      </header>

      <div className="space-y-6">
        <h2 className="text-lg font-medium text-ink">Pending Invites</h2>
        
        {!accepted ? (
          <div className="bg-white border border-ink/5 rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-forest/10 text-forest flex items-center justify-center shrink-0">
               <Video className="w-8 h-8" />
            </div>
            
            <div className="flex-1 relative z-10">
               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-clay/10 text-clay text-xs font-mono uppercase tracking-wider font-medium mb-3">
                 Action Required
               </div>
               <h3 className="text-2xl font-serif italic text-ink mb-2">London Digital Showcase: K-Beauty Hydration Focus</h3>
               <p className="text-ink/70 leading-relaxed mb-6">
                 We have selected 3 emerging hydration hero products from South Korea. Join the digital room to hear from the founders directly, see the textures live, and participate in the creator teardown panel.
               </p>
               
               <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                 <div className="flex items-center gap-2 text-ink/60">
                    <Calendar className="w-4 h-4" /> March 28, 2026
                 </div>
                 <div className="flex items-center gap-2 text-ink/60">
                    <Clock className="w-4 h-4" /> 18:00 - 19:00 GMT
                 </div>
               </div>
               
               <div className="flex flex-wrap gap-4">
                  <button onClick={() => setAccepted(true)} className="px-6 py-2.5 rounded-lg bg-ink text-white font-medium shadow-sm hover:bg-forest transition-colors">
                    Accept & RSVP
                  </button>
                  <button className="px-6 py-2.5 rounded-lg border border-ink/10 font-medium text-ink hover:bg-surfaceHover transition-colors">
                    Decline
                  </button>
               </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-moss/20 rounded-2xl shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-moss/10 text-moss rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                 <p className="font-medium text-ink">RSVP Confirmed for Hydration Showcase</p>
                 <p className="text-xs text-ink/60 mt-0.5">The calendar invite and joining details have been sent to your email.</p>
              </div>
            </div>
            <button className="text-sm font-medium text-moss hover:text-forest transition-colors">Add to Calendar</button>
          </div>
        )}

      </div>
      
      <div className="pt-8">
        <h2 className="text-lg font-medium text-ink mb-4">Past Attended</h2>
        <div className="bg-white border border-ink/5 rounded-xl shadow-sm overflow-hidden text-center py-16">
           <p className="text-ink/40 text-sm">No past events yet. Your journey starts here.</p>
        </div>
      </div>
    </div>
  );
}
