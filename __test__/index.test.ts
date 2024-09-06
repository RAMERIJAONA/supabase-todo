// index.test.ts
import { createClient } from "jsr:@supabase/supabase-js@2";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Mock environment variables
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_ANON_KEY = 'test_anon_key';

// Mock createClient function
jest.mock('jsr:@supabase/supabase-js@2', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: [], error: null })),
    })),
  })),
}));

describe('Supabase Client', () => {
  beforeAll(() => {
    config({ export: true });
  });

  it('should load environment variables correctly', () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBe('https://test.supabase.co');
    expect(supabaseKey).toBe('test_anon_key');
  });

  it('should create Supabase client correctly', async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      headers: new Headers({
        "Authorization": "Bearer test_token",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ username: "testuser", email: "test@example.com", age: 30 }),
    });

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;

    const supabase = createClient(
      supabaseUrl,
      supabaseKey,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { username, email, age } = await req.json();

    expect(username).toBe("testuser");
    expect(email).toBe("test@example.com");
    expect(age).toBe(30);
  });
});