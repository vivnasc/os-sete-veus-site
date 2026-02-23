import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { SUPABASE_URL } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const BUCKET_NAME = "proof-photos";

/**
 * POST /api/upload-proof
 * Upload de comprovativo de compra (foto do recibo ou livro)
 * Publico — nao precisa autenticacao
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum ficheiro enviado" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de ficheiro nao suportado. Usa JPG, PNG ou WebP." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Ficheiro demasiado grande. Maximo 5MB." },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico de upload indisponivel" },
        { status: 500 }
      );
    }

    // Gerar nome unico para o ficheiro
    const ext = file.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const fileName = `comprovativo-${timestamp}-${random}.${ext}`;

    // Upload para Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { data, error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Erro no upload:", uploadError);

      // Se o bucket nao existe, tentar criar
      if (uploadError.message?.includes("not found") || uploadError.message?.includes("Bucket")) {
        const { error: bucketError } = await supabaseAdmin.storage.createBucket(
          BUCKET_NAME,
          { public: true }
        );

        if (bucketError) {
          console.error("Erro ao criar bucket:", bucketError);
          return NextResponse.json(
            { error: "Erro ao configurar storage" },
            { status: 500 }
          );
        }

        // Tentar upload de novo
        const { error: retryError } = await supabaseAdmin.storage
          .from(BUCKET_NAME)
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (retryError) {
          console.error("Erro no retry upload:", retryError);
          return NextResponse.json(
            { error: "Erro ao guardar ficheiro" },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Erro ao guardar ficheiro" },
          { status: 500 }
        );
      }
    }

    // Construir URL publica
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
