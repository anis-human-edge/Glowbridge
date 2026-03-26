import { Loader2, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useActiveProducts } from '../../hooks/useProducts';
import { Link } from 'react-router-dom';

export default function Discoveries() {
  const { data: products, isLoading } = useActiveProducts();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-pearl animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-6">
        
        <header className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-moss text-xs font-mono tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Curated Formulations
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-ink tracking-tight">The Protocol Showcase</h1>
          <p className="text-lg text-ink/70 leading-relaxed font-medium">
            Explore the latest clinical skincare and beauty formulations approved by the Glowbridge protocol. Tested by science, validated by creators.
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 animate-spin text-ink/20" />
          </div>
        ) : products?.length === 0 ? (
          <div className="bg-white border border-ink/5 rounded-3xl p-16 text-center shadow-sm">
             <div className="w-16 h-16 bg-stone rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-6 h-6 text-ink/40" />
             </div>
             <h3 className="text-2xl font-serif italic text-ink mb-2">Awaiting Curation</h3>
             <p className="text-ink/60 mb-8 max-w-md mx-auto">There are currently no active products in the public showcase. Brands are in the Queue awaiting protocol approval.</p>
             <Link to="/brands" className="px-6 py-3 rounded-full bg-ink text-white font-medium hover:bg-forest transition-colors shadow-sm inline-flex items-center gap-2">
               Submit a Product <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product: any) => (
              <div key={product.id} className="group bg-white rounded-3xl p-6 border border-ink/5 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col h-full">
                
                <div className="w-full aspect-square bg-stone rounded-2xl mb-6 overflow-hidden relative border border-ink/5">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                  <div className="absolute top-4 left-4 border bg-white/90 backdrop-blur-md px-3 border-ink/5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-ink">
                    {product.category}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="text-xs font-mono text-moss uppercase tracking-wider mb-2">
                      {product.brands?.company_name || 'Protocol Brand'}
                    </div>
                    <h3 className="text-xl font-medium text-ink leading-tight">{product.name}</h3>
                  </div>

                  {product.ingredients && (
                    <p className="text-sm text-ink/60 line-clamp-2 leading-relaxed">
                      {product.ingredients}
                    </p>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-ink/5 flex items-center justify-between">
                   <div className="flex items-center gap-1.5">
                     <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full border border-white bg-moss/20"></div>
                       <div className="w-6 h-6 rounded-full border border-white bg-clay/20"></div>
                       <div className="w-6 h-6 rounded-full border border-white bg-gold/20"></div>
                     </div>
                     <span className="text-xs text-ink/50 ml-2 font-medium">In demand</span>
                   </div>
                   <button className="w-8 h-8 rounded-full bg-stone flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-white transition-colors">
                     <ArrowRight className="w-4 h-4" />
                   </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
