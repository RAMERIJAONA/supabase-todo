import { createClient } from "jsr:@supabase/supabase-js@2";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Load environment variables from .env file
config({ export: true });

const supabaseUrl = Deno.env.get('SUPABASE_URL') || "https://<your_supabase_id>.supabase.co";
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || "<your_annon_key>";

Deno.serve(async (req: Request) => {

  const authHeader = req.headers.get('Authorization')!
  const supabase = createClient(
    supabaseUrl,
    supabaseKey ?? '',
    { global: { headers: { Authorization: authHeader } } }
  )
  
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
     return new Response('Error select user', { status: 500 });
  }

  return new Response(`${data}`, { status: 201 });
 
});


