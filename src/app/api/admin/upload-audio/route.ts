import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "audios";

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error("[upload-audio] Env vars em falta:", { supabaseUrl: !!supabaseUrl, serviceKey: !!serviceKey });
    return NextResponse.json(
      { erro: "Configuração do servidor incompleta (env vars em falta)." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, serviceKey);

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (e) {
    console.error("[upload-audio] Falha ao ler formData:", e);
    return NextResponse.json({ erro: "Payload inválido." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const filename = formData.get("filename") as string | null;

  if (!file || !filename) {
    return NextResponse.json({ erro: "Ficheiro ou nome em falta." }, { status: 400 });
  }

  // Cria bucket se não existir (sem allowedMimeTypes — mais compatível)
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  if (listErr) {
    console.error("[upload-audio] Erro ao listar buckets:", listErr);
    return NextResponse.json({ erro: `Erro ao listar buckets: ${listErr.message}` }, { status: 500 });
  }

  if (!buckets?.find((b) => b.name === BUCKET)) {
    const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });
    if (bucketErr && !bucketErr.message.includes("already exists")) {
      console.error("[upload-audio] Erro ao criar bucket:", bucketErr);
      return NextResponse.json({ erro: `Erro ao criar bucket: ${bucketErr.message}` }, { status: 500 });
    }
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch (e) {
    console.error("[upload-audio] Erro ao ler ficheiro:", e);
    return NextResponse.json({ erro: "Erro ao ler ficheiro." }, { status: 500 });
  }

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, {
      contentType: "audio/mpeg",
      upsert: true,
    });

  if (error) {
    console.error("[upload-audio] Erro ao fazer upload:", error);
    return NextResponse.json({ erro: `Erro no upload: ${error.message}` }, { status: 500 });
  }

  const url = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filename)}`;
  return NextResponse.json({ url });
}
