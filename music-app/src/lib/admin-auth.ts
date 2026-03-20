import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./supabase-server";

const ADMIN_EMAIL = "viv.saraiva@gmail.com";

export { ADMIN_EMAIL };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabaseClient = SupabaseClient<any, any, any>;

/**
 * Verify the request comes from the admin user.
 * Returns the Supabase service client if authorized, or a 401/403 response.
 */
export async function requireAdmin(cookieHeader: string | null): Promise<
  | { ok: true; supabase: AnySupabaseClient }
  | { ok: false; response: NextResponse }
> {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    return {
      ok: false,
      response: NextResponse.json(
        { erro: "SUPABASE_SERVICE_ROLE_KEY nao configurada." },
        { status: 500 }
      ),
    };
  }

  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!anonKey) {
    return {
      ok: false,
      response: NextResponse.json(
        { erro: "NEXT_PUBLIC_SUPABASE_ANON_KEY nao configurada." },
        { status: 500 }
      ),
    };
  }

  // Use anon key to verify the user's JWT from cookies/headers
  const userClient = createClient(SUPABASE_URL, anonKey, {
    auth: { persistSession: false },
    global: {
      headers: cookieHeader ? { cookie: cookieHeader } : {},
    },
  });

  const { data: { user }, error } = await userClient.auth.getUser();

  if (error || !user || user.email !== ADMIN_EMAIL) {
    return {
      ok: false,
      response: NextResponse.json(
        { erro: "Acesso negado. Apenas a administradora pode aceder." },
        { status: 403 }
      ),
    };
  }

  const serviceClient = createClient(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false },
  });

  return { ok: true, supabase: serviceClient };
}
