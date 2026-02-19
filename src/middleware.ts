import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const SUPABASE_URL = "https://tdytdamtfillqyklgrmb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXRkYW10ZmlsbHF5a2xncm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzk4ODAsImV4cCI6MjA4NTk1NTg4MH0.W1w_M7dQXgPehDP0NUWWE4QHcW214XGVRIVXtG5n9z4";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refresh session — important for keeping cookies in sync
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    // Match all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
