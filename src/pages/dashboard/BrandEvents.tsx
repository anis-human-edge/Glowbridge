import { Calendar, Video, MapPin, Users, Loader2 } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';

export default function BrandEvents() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-ink/40" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-semibold text-ink tracking-tight">Protocol Showcases</h1>
        <p className="text-sm text-ink/60 mt-1">Manage your upcoming product features and community appearances connected to the protocol engine.</p>
      </header>

      {events && events.length === 0 ? (
         <div className="bg-surfaceHover border border-ink/5 rounded-2xl p-16 text-center text-ink/50">
           No upcoming events found on the protocol schedule.
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events?.map((evt: any) => (
            <div key={evt.id} className="bg-white border border-ink/5 rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
               <div className="h-32 bg-stone/50 relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-ink/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    {evt.status === 'upcoming' 
                      ? <span className="inline-flex px-2.5 py-1 rounded bg-moss text-white text-[10px] font-mono font-medium tracking-wide uppercase">Confirmed</span>
                      : <span className="inline-flex px-2.5 py-1 rounded bg-ink/10 border border-ink/20 text-ink/70 text-[10px] font-mono font-medium tracking-wide uppercase">{evt.status}</span>}
                  </div>
                  {evt.type === 'digital' ? (
                    <Video className="w-12 h-12 text-ink/20 absolute -right-2 -bottom-2" />
                  ) : (
                    <MapPin className="w-12 h-12 text-ink/20 absolute -right-2 -bottom-2" />
                  )}
               </div>
               
               <div className="p-6 flex-1 flex flex-col">
                 <div className="flex items-center gap-2 mb-3">
                   <span className="text-[10px] font-mono text-clay tracking-widest uppercase">{evt.type}</span>
                 </div>
                 <h3 className="text-lg font-medium text-ink mb-4">{evt.title}</h3>
                 <p className="text-sm text-ink/60 line-clamp-2 mb-4">{evt.description || 'Join our latest curated showcase.'}</p>
                 
                 <div className="mt-auto space-y-3">
                   <div className="flex items-center gap-3 text-sm text-ink/70">
                     <Calendar className="w-4 h-4 text-ink/40" />
                     {new Date(evt.date).toLocaleDateString()}
                   </div>
                   <div className="flex items-center gap-3 text-sm text-ink/70">
                     <Users className="w-4 h-4 text-ink/40" />
                     {evt.max_capacity} Capacity Limit
                   </div>
                 </div>

                 <div className="mt-6 pt-5 border-t border-ink/5 flex justify-end">
                    <button className="text-sm font-medium text-ink hover:text-moss transition-colors">
                      View Details →
                    </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
