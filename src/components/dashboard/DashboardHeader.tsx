import { Bell, Search } from 'lucide-react';

export default function DashboardHeader() {
  return (
    <header className="h-16 bg-surface border-b border-ink/5 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center w-full max-w-sm">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-ink/40" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-ink/10 rounded-lg leading-5 bg-surfaceHover text-ink placeholder-ink/40 focus:outline-none focus:bg-white focus:ring-1 focus:ring-moss focus:border-moss sm:text-sm transition-all shadow-sm"
            placeholder="Search products, events, or reports..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-ink/60 hover:text-ink hover:bg-surfaceHover rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-clay ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
}
