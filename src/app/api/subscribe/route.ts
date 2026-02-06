import { NextResponse } from "next/server";

const SUPABASE_URL = "https://tdytdamtfillqyklgrmb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXRkYW10ZmlsbHF5a2xncm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzk4ODAsImV4cCI6MjA4NTk1NTg4MH0.W1w_M7dQXgPehDP0NUWWE4QHcW214XGVRIVXtG5n9z4";

const MAILERLITE_API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiMWMwYjkwMDA2NWRiZWVkMWQ3NTlhNjViZDhiZTY1ODllZjE0ZjI2ZTIyOWU4ZWM4Y2M0ODcwMzQ2YzNmNjZjMDIzNjdmZmZiOThmMWY5ZGQiLCJpYXQiOjE3NzAzODY2NjcuMjQwNzA1LCJuYmYiOjE3NzAzODY2NjcuMjQwNzA4LCJleHAiOjQ5MjYwNjAyNjcuMjM3MzY5LCJzdWIiOiIyMTEyNzYwIiwic2NvcGVzIjpbXX0.UnF2B_H9QMolD_C88MlDIRWfsrYQRGheGFod9KB8yfrQy6Zafa1mDs7oW1PjZ9iRHGJsTXl5RXsojv0wGuEUj4f6skyUUSp2JNxZj6o8VxfP9MbYcLHbb0UaFndAKJIeDiE2JPqCZB518eiT3gv5EEhU1iMd198ASlZaeTTNCck0KhHeCOVMPLWZQcnnWMr37hWagdTwXyGN_oNOrLefWWM0rBbKekBwBe3ShFTNUAxBDu1giPSuTDTUz_klVTq5y0B0TN1Tzhw04HyKN6CXMq_cGeHj3Ls320cMJioXz9YBOiKIYSGkK2H1cv3DH4I-ZTJkFFbql7to8vlwTFILRN3aoigAfFgkaVtAoF_VdP7v6U4wGmt9nssgYLVt4NUUCRQTo3Aa5VJJ-AX9_4GgBgR9lI3WUZKkyLjDg087lW_1EiVLOIGwK2irLuxTNi54dxevj5i3mVNAMDp6dJX46wnssF1OxbAZhK3hV-OrFDjaow2pMkSBVAHidxphoky0lJ7l4APMj1Vlc4po2zwq0o0gnptyGl3Ie_5gvoPGLtlB1afaS7fQbHsFMp0MmywCeBFfCPIHWm00uJcGG2GFOv8CGHEu8w6OOY7jl1I7c6mbgxFYAf-03yVxBmZn85w4VxmhQL70q3ZrSjy6IfswYC1xVCyNhyFkyeJXC9mZWAs";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Save to Supabase and MailerLite in parallel
    const [supabaseRes, mailerliteRes] = await Promise.allSettled([
      fetch(`${SUPABASE_URL}/rest/v1/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email }),
      }),
      fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${MAILERLITE_API_TOKEN}`,
        },
        body: JSON.stringify({ email }),
      }),
    ]);

    // Check if at least one succeeded
    const supabaseOk =
      supabaseRes.status === "fulfilled" &&
      (supabaseRes.value.ok || supabaseRes.value.status === 409);
    const mailerliteOk =
      mailerliteRes.status === "fulfilled" &&
      (mailerliteRes.value.ok || mailerliteRes.value.status === 409);

    if (!supabaseOk && !mailerliteOk) {
      return NextResponse.json({ error: "Erro ao guardar" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
