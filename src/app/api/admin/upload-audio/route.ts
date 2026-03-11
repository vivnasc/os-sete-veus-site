import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "audios";

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ erro: "Payload inválido." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const filename = formData.get("filename") as string | null;

  if (!file || !filename) {
    return NextResponse.json({ erro: "Ficheiro ou nome em falta." }, { status: 400 });
  }

  // Cria bucket se não existir
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === BUCKET)) {
    const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 52428800, // 50MB
      allowedMimeTypes: ["audio/mpeg", "audio/mp3", "audio/ogg", "audio/wav"],
    });
    if (bucketErr && bucketErr.message !== "Bucket already exists") {
      return NextResponse.json({ erro: bucketErr.message }, { status: 500 });
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, {
      contentType: "audio/mpeg",
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(filename)}`;
  return NextResponse.json({ url });
}
