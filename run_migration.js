import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;
const connectionString = "postgresql://postgres:sb_publishable_UR0H0BWA8XcsZ6u-P9_ylA_sadBGRYW@db.jqpwucwzacqrpeazqbmd.supabase.co:5432/postgres";

async function runMigration() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const sql = fs.readFileSync(path.join(process.cwd(), 'supabase', 'migrations', '20260409000000_bridgr_v2_schema.sql'), 'utf8');
    await client.connect();
    console.log("Connected to Supabase database.");
    await client.query(sql);
    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

runMigration();
