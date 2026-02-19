import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

export async function POST(request: Request) {
  try {
    const { path, token } = await request.json();

    if (!path || !token) {
      return NextResponse.json({ error: "Parâmetros em falta" }, { status: 400 });
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Serviço indisponível" }, { status: 503 });
    }

    // Verify the user's token
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 401 });
    }

    // Check if user has a purchase
    const { data: purchase } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (!purchase) {
      return NextResponse.json({ error: "Sem acesso" }, { status: 403 });
    }

    // Generate signed URL (valid for 1 hour)
    const { data, error } = await supabaseAdmin.storage
      .from("conteudo")
      .createSignedUrl(path, 3600);

    if (error || !data) {
      return NextResponse.json({ error: "Ficheiro não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ url: data.signedUrl });
  } catch {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
