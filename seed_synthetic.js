import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jqpwucwzacqrpeazqbmd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcHd1Y3d6YWNxcnBlYXpxYm1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NDQ4NTIsImV4cCI6MjA4MTEyMDg1Mn0.uiOWrWK1DnpE0f11sJqcBY1_eddzwuH5JgzmYiHWZHE';
const supabase = createClient(supabaseUrl, supabaseKey);

const creators = [
  { name: 'Sarah J.', tier: 'recognised', category: 'Skincare', score: 94 },
  { name: 'Mikayla N.', tier: 'recognised', category: 'Makeup', score: 92 },
  { name: 'Alex H.', tier: 'active', category: 'Skincare', score: 86 },
  { name: 'David R.', tier: 'new', category: 'Wellness', score: 70 }
];

async function seedData() {
  console.log("Connecting to Supabase Auth...");

  for (const c of creators) {
    const email = `${c.name.toLowerCase().replace(/[^a-z]/g, '')}${Math.floor(Math.random() * 10000)}@gmail.com`;

    // 1. Register through Supabase Auth explicitly to generate auth.users and get the ID
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: 'password12345!'
    });

    if (authError) {
      console.log(`Error signing up ${c.name}:`, authError.message);
      continue;
    }

    const uid = authData?.user?.id;
    if (!uid) {
       console.log("Failed to get UID");
       continue;
    }

    // 2. Insert bth_users profile
    const { error: userError } = await supabase.from('bth_users').insert({
      id: uid,
      role: 'creator',
      email: email,
      status: 'active'
    });

    if (userError) {
      console.log(`Error seeding user ${c.name}:`, userError);
      continue;
    }

    const { error: creatorError } = await supabase.from('bth_creators_v2').insert({
      user_id: uid,
      display_name: c.name
    });

    if (creatorError) {
      console.log(`Error seeding creator ${c.name}:`, creatorError);
    } else {
      console.log(`Successfully Seeded Creator: ${c.name} (${c.tier})`);
    }
  }

  console.log("Synthetic Creator Auth injection complete!");
}

seedData();
