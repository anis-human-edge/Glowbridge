import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, Trophy, Droplet, Zap, Microchip } from 'lucide-react';

const dimensions = [
  {
    id: 'biotech',
    label: 'Biotech Innovators',
    icon: <Microchip className="w-4 h-4" />,
    description: 'Top 10 scientific breakthroughs pushing the boundaries of cellular skincare.',
    items: [
      { rank: '01', title: 'PDRN (Salmon DNA) Serums', brand: 'Rejuran', tag: 'Cellular Regeneration', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop' },
      { rank: '02', title: 'Exosome Delivery Systems', brand: 'ASCE+', tag: 'Nano-Vesicles', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop' },
      { rank: '03', title: 'Recombinant Spider Silk', brand: 'Silk Therapeutics', tag: 'Firming Matrices', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop' },
      { rank: '04', title: 'Plant-Derived EGF', brand: 'Bioeffect', tag: 'Wound Healing', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop' },
      { rank: '05', title: 'Micro-Spicule Creams', brand: 'VT Cosmetics', tag: 'Liquid Microneedling', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop' },
      { rank: '06', title: 'Polyglutamic Acid (PGA)', brand: 'Inkey List', tag: '4x HA Moisture', img: 'https://images.unsplash.com/photo-1571781926291-c477eb317dd4?q=80&w=400&auto=format&fit=crop' },
      { rank: '07', title: 'Fermented Bifida Lysate', brand: 'Manyo Factory', tag: 'Microbiome Defence', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop' },
      { rank: '08', title: 'Ectoin Isolates', brand: 'Dr. Jart+', tag: 'Environmental Shield', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop' },
      { rank: '09', title: 'Volufiline Concentrates', brand: 'Sederma', tag: 'Lipid Volume', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop' },
      { rank: '10', title: 'Copper Tripeptide-1', brand: 'NIOD', tag: 'Collagen Synthesis', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'budget',
    label: 'The Clinical Budget',
    icon: <Droplet className="w-4 h-4" />,
    description: 'Top 10 highly active baseline formulations under £25. High efficacy, transparent labels.',
    items: [
      { rank: '01', title: 'Heartleaf 77% Toner', brand: 'Anua', tag: 'Redness Relief', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop' },
      { rank: '02', title: 'Niacinamide 10% + Zinc', brand: 'The Ordinary', tag: 'Sebum Regulation', img: 'https://images.unsplash.com/photo-1571781926291-c477eb317dd4?q=80&w=400&auto=format&fit=crop' },
      { rank: '03', title: 'Snail 96 Mucin Essence', brand: 'COSRX', tag: 'Hydration Repair', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop' },
      { rank: '04', title: 'Centella Asiatica Ampoule', brand: 'SKIN1004', tag: 'Barrier Soothing', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop' },
      { rank: '05', title: 'Azelaic Acid 15%', brand: 'Theramid', tag: 'Rosacea Therapy', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop' },
      { rank: '06', title: 'Mugwort Essence', brand: 'I\'m From', tag: 'Detoxifying', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop' },
      { rank: '07', title: 'Propolis Light Ampoule', brand: 'COSRX', tag: 'Antibacterial Glow', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop' },
      { rank: '08', title: 'PHA Peeling Gel', brand: 'Benton', tag: 'Gentle Exfoliation', img: 'https://images.unsplash.com/photo-1571781926291-c477eb317dd4?q=80&w=400&auto=format&fit=crop' },
      { rank: '09', title: 'Ceramide NP Liquid', brand: 'Illiyoon', tag: 'Lipid Replenishing', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop' },
      { rank: '10', title: 'Rice Bran Water', brand: 'Beauty of Joseon', tag: 'Milky Brightening', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop' },
    ]
  },
  {
    id: 'devices',
    label: 'Medical Devices',
    icon: <Zap className="w-4 h-4" />,
    description: 'Top 10 scientifically backed at-home hardware bridging the gap to the clinic.',
    items: [
      { rank: '01', title: 'LED Mask (633nm/830nm)', brand: 'Omnilux', tag: 'Fibroblast Stimulation', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop' },
      { rank: '02', title: 'Microcurrent Contour', brand: 'Ziip Halo', tag: 'ATP Enhancement', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop' },
      { rank: '03', title: 'Radiofrequency Wand', brand: 'Medicube', tag: 'Dermal Heating', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop' },
      { rank: '04', title: 'High-Frequency Neon Gas', brand: 'NuDerma', tag: 'Ozone Bacteria Kill', img: 'https://images.unsplash.com/photo-1571781926291-c477eb317dd4?q=80&w=400&auto=format&fit=crop' },
      { rank: '05', title: 'Microneedling Pen (0.25)', brand: 'Dr. Pen', tag: 'Product Penetration', img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=400&auto=format&fit=crop' },
      { rank: '06', title: 'Ultrasonic Spatula', brand: 'Dermaflash', tag: 'Cavitation Clearing', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400&auto=format&fit=crop' },
      { rank: '07', title: 'Galvanic Infuser', brand: 'NuSkin', tag: 'Electrical Repulsion', img: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=400&auto=format&fit=crop' },
      { rank: '08', title: 'Cryotherapy Globes', brand: 'Fraicheur', tag: 'Vasoconstriction', img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop' },
      { rank: '09', title: 'Non-Ablative Laser', brand: 'Lyma', tag: 'Pigment Shattering', img: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=400&auto=format&fit=crop' },
      { rank: '10', title: 'LED Lip Treatment', brand: 'Dr. Dennis Gross', tag: 'Vascular Plumping', img: 'https://images.unsplash.com/photo-1571781926291-c477eb317dd4?q=80&w=400&auto=format&fit=crop' },
    ]
  }
];

export default function TheIndex() {
  const [activeTab, setActiveTab] = useState(dimensions[0].id);

  useEffect(() => {
    gsap.fromTo(
      '.idx-up',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
    );
  }, [activeTab]);

  const activeDimension = dimensions.find(d => d.id === activeTab);

  return (
    <div className="w-full min-h-screen bg-stone/30 pt-32 pb-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ink text-white text-xs font-mono tracking-wider uppercase mb-4 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-gold" />
          The Glowbridge Curation
        </div>
        <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-ink">
          The Intelligence <span className="font-serif italic text-moss">Index</span>
        </h1>
        <p className="text-xl text-ink/60 max-w-2xl mx-auto leading-relaxed">
          The definitive Top 10 rankings across the clinical skincare ecosystem. We parse the noise so our Creator protocol only tests what matters.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {dimensions.map(dim => (
            <button
              key={dim.id}
              onClick={() => setActiveTab(dim.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === dim.id 
                  ? 'bg-ink text-white shadow-premium' 
                  : 'bg-white text-ink/60 hover:bg-white/80 hover:text-ink border border-ink/5 shadow-sm'
              }`}
            >
              <div className={activeTab === dim.id ? 'text-gold' : 'text-ink/40'}>{dim.icon}</div>
              {dim.label}
            </button>
          ))}
        </div>
      </div>

      {/* List Container */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] border border-ink/5 shadow-premium overflow-hidden">
          
          {/* Dimension Header */}
          <div className="p-8 md:p-12 border-b border-ink/5 bg-surfaceHover/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="idx-up text-3xl font-serif italic text-ink mb-2">{activeDimension?.label}</h2>
              <p className="idx-up text-ink/60 max-w-md">{activeDimension?.description}</p>
            </div>
            <div className="idx-up text-xs font-mono text-ink/40 uppercase tracking-widest text-right">
              Updated: <span className="text-ink">Q3 2026</span><br/>
              Status: <span className="text-moss">Protocol Approved</span>
            </div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-ink/5">
            {activeDimension?.items.map((item) => (
              <div key={item.rank} className="idx-up p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:bg-stone/20 transition-colors group">
                {/* Ranking Number */}
                <div className="w-12 h-12 rounded-xl bg-ink/5 flex items-center justify-center font-mono text-xl font-bold text-ink shrink-0 group-hover:bg-ink group-hover:text-gold transition-colors">
                  {item.rank}
                </div>
                
                {/* Thumbnail */}
                <div 
                  className="w-20 h-20 rounded-xl bg-cover bg-center border border-ink/10 shrink-0"
                  style={{ backgroundImage: `url(${item.img})` }}
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-moss/10 text-moss mb-2 border border-moss/20">
                    {item.tag}
                  </div>
                  <h3 className="text-lg font-medium text-ink truncate">{item.title}</h3>
                  <div className="text-sm text-ink/50 mt-1">Example Formulation: <span className="text-ink/80">{item.brand}</span></div>
                </div>

                {/* Claim Button */}
                <button className="hidden sm:flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-white border border-ink/10 text-ink hover:bg-moss hover:border-moss hover:text-white transition-all shadow-sm">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
