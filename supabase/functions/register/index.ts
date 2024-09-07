import { createClient } from "jsr:@supabase/supabase-js@2";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Load environment variables from .env file
config({ export: true });

const supabaseUrl = Deno.env.get('SUPABASE_URL') || "https://<your_supabase_id>.supabase.co";
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || "<your_annon_key>";

const supabase = createClient(supabaseUrl, supabaseKey);

Deno.serve(async (req: Request) => {
  try {
    const { email, password } = await req.json();

    // Sign up the user
    const { error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      return new Response(JSON.stringify({ error: signUpError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return success response
    return new Response(JSON.stringify({ message: 'User signed up successfully' }), {
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