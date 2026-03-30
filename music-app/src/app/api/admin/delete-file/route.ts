import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const BUCKET = "audios";

/**
 * Delete a file from Supabase Storage.
 * POST /api/admin/delete-file { path: "albums/espelho-ilusao/faixa-01-cover.jpg" }
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const { path } = await req.json();
    if (!path) {
      return NextResponse.json({ erro: "path obrigatório." }, { status: 400 });
    }

    const { error } = await auth.supabase.storage.from(BUCKET).remove([path]);

    if (error) {
      return NextResponse.json({ erro: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    return NextResponse.json({ erro: String(err) }, { status: 500 });
  }
}
