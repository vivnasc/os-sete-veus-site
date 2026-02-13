import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = 'https://tdytdamtfillqyklgrmb.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXRkYW10ZmlsbHF5a2xncm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzk4ODAsImV4cCI6MjA4NTk1NTg4MH0.W1w_M7dQXgPehDP0NUWWE4QHcW214XGVRIVXtG5n9z4'

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
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
