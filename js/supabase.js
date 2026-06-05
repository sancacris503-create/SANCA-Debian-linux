const SUPABASE_URL = "https://bfvezwzysstzpncgqssb.supabase.co";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmdmV6d3p5c3N0enBuY2dxc3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MzE1NzksImV4cCI6MjA5NTMwNzU3OX0.hayjkXzRbtac8HEzioHSCuCaF4TxotK8aouu6FSFlQ0";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase conectado", db);
