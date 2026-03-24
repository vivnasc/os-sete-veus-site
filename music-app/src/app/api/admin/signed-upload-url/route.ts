import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";

const BUCKET = "audios";

/**
 * Generate a signed upload URL so the client can upload directly to Supabase Storage.
 * This bypasses Vercel's 4.5MB body size limit.
 * POST /api/admin/signed-upload-url { filename: "albums/espelho-ilusao/faixa-01.mp3" }
 */
export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  const supabase = auth.supabase;

  try {
    const { filename } = await req.json();
    if (!filename || typeof filename !== "string") {
      return NextResponse.json({ erro: "filename obrigatorio." }, { status: 400 });
    }

    // Create signed upload URL (valid for 2 minutes)
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUploadUrl(filename);

    if (error) {
      // If file already exists, we need to use upsert approach
      // Fall back to generating a signed URL for overwrite
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET)
        .createSignedUploadUrl(filename, { upsert: true });

      if (uploadError) {
        return NextResponse.json(
          { erro: "Erro ao gerar URL: " + uploadError.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        signedUrl: uploadData.signedUrl,
        token: uploadData.token,
        path: uploadData.path,
      });
    }

    return NextResponse.json({
      signedUrl: data.signedUrl,
      token: data.token,
      path: data.path,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ erro: msg }, { status: 500 });
  }
}
