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

  const { username, email, age } = await req.json();
  // Note: for validate data we can use JOY or Koa package

  // Validate username
  if (typeof username !== 'string' || username.trim() === '') {
    return new Response('Invalid username', { status: 400 });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return new Response('Invalid email', { status: 400 });
  }

  // Validate age
  if (typeof age !== 'number' || !Number.isInteger(age) || age <= 0) {
    return new Response('Invalid age', { status: 400 });
  }

  // Check email uniqueness
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.log('fetchError', fetchError)
    return new Response('Error checking email uniqueness', { status: 500 });
  }

  if (existingUser) {
    // Email exists, update the user information
    const { error: updateError } = await supabase
      .from('users')
      .update({ username, age })
      .eq('email', email);

    if (updateError) {
      return new Response('Error updating user information', { status: 500 });
    }

    return new Response('User information updated successfully', { status: 200 });
  } else {
    // Email does not exist, create a new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, age }]);

    if (error) {
      return new Response('Error creating user', { status: 500 });
    }
    return new Response(`User created successfull ${data}`, { status: 201 });
  }
 
});


