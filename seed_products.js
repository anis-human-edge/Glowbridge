import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jqpwucwzacqrpeazqbmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcHd1Y3d6YWNxcnBlYXpxYm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDQ4NTIsImV4cCI6MjA4MTEyMDg1Mn0.uiOWrWK1DnpE0f11sJqcBY1_eddzwuH5JgzmYiHWZHE';
const supabase = createClient(supabaseUrl, supabaseKey);

const DUMMY_PRODUCTS = [
  {
    name: 'Barrier Restore Ceramide Serum',
    category: 'Skincare',
    description: 'A deeply hydrating ceramide formulation designed to rebuild the skin barrier under 7 days. Targets clinical repair and premium efficacy.',
    price_gbp: 48.00,
    commission_rate: 15.00,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Squalane Glo-Oil',
    category: 'Skincare',
    description: '100% plant-derived squalane mimicking natural sebum. Lightweight, non-comedogenic, and perfect for a dewy finish without greasiness.',
    price_gbp: 28.50,
    commission_rate: 20.00,
    img: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Opaline Soft-Focus Foundation',
    category: 'Makeup',
    description: 'Medium buildable coverage infused with hyaluronic acid. Gives a soft-focus glass skin effect while remaining deeply breathable.',
    price_gbp: 35.00,
    commission_rate: 18.50,
    img: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Rosemary Scalp Fortifier',
    category: 'Haircare',
    description: 'Scientifically backed follicle stimulating serum utilizing wild-harvested rosemary extract. Promotes dense growth within 12 weeks of nightly application.',
    price_gbp: 52.00,
    commission_rate: 12.00,
    img: 'https://images.unsplash.com/photo-1608248593842-8d9e2b1b3b2a?auto=format&fit=crop&q=80&w=600'
  }
];

async function seedData() {
  console.log("Seeding Database...");

  const email = `glossier_demo${Math.floor(Math.random() * 10000)}@gmail.com`;

  // 1. Register Mock Brand
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: 'password12345!'
  });

  if (authError || !authData?.user?.id) {
    console.error("Auth Fail", authError);
    return;
  }

  const uid = authData.user.id;

  // 2. Insert Base User Profile
  await supabase.from('bth_users').insert({ id: uid, role: 'brand', email, status: 'active' });

  // 3. Insert Brand Profile
  const { data: brandRow, error: bError } = await supabase.from('bth_brands_v2').insert({
    user_id: uid,
    company_name: 'Glossier (Demo)',
    visibility: 'open'
  }).select().single();

  if (bError) {
     console.error("Brand Failure", bError);
     return;
  }

  console.log(`Successfully Generated Brand: ${brandRow.company_name}`);

  // 4. Inject 4 unique products attached to the brand
  for(let prod of DUMMY_PRODUCTS) {
     const { data: pData, error: pError } = await supabase.from('bth_products_v2').insert({
        brand_id: brandRow.id,
        name: prod.name,
        category: prod.category,
        description: prod.description,
        price_gbp: prod.price_gbp,
        commission_rate: prod.commission_rate,
        status: 'approved',
        visibility: 'open'
     }).select().single();

     if (pError) {
        console.error("Product Error:", pError);
        continue;
     }

     // 5. Connect product image
     await supabase.from('bth_product_images').insert({
        product_id: pData.id,
        image_url: prod.img,
        is_hero: true,
        display_order: 1
     });
     console.log(`Added Product & Image: ${prod.name}`);
  }

  console.log("Finished injection.");
}

seedData();
