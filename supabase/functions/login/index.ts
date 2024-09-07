import { createClient } from "jsr:@supabase/supabase-js@2";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Load environment variables from .env file
config({ export: true });

const supabaseUrl = Deno.env.get('SUPABASE_URL') || "https://<your_supabase_id>.supabase.co";
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || "<your_annon_key>";

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return the JWT
    return new Response(JSON.stringify({ token: data.session?.access_token }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
