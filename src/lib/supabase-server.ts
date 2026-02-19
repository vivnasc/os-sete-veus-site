import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const SUPABASE_URL = 'https://tdytdamtfillqyklgrmb.supabase.co'
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXRkYW10ZmlsbHF5a2xncm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzk4ODAsImV4cCI6MjA4NTk1NTg4MH0.W1w_M7dQXgPehDP0NUWWE4QHcW214XGVRIVXtG5n9z4'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // setAll called from Server Component context — can be ignored
        }
      },
    },
  })
}

/**
 * Cria cliente admin com service role key (para operacoes privilegiadas).
 * Retorna null se SUPABASE_SERVICE_ROLE_KEY nao estiver configurada.
 */
export function createSupabaseAdminClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) return null

  return createClient(SUPABASE_URL, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
