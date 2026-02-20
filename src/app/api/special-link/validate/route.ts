import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";
import { notifySpecialLinkUsed } from "@/lib/notify-admin";

export async function POST(request: Request) {
  try {
    const { code, email, password } = await request.json();

    if (!code || !email) {
      return NextResponse.json(
        { error: "Código e email são obrigatórios" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    // Buscar link especial
    const { data: specialLink, error: fetchError } = await supabaseAdmin
      .from("special_links")
      .select("*")
      .eq("code", code)
      .single();

    if (fetchError || !specialLink) {
      return NextResponse.json(
        { error: "Código inválido ou expirado" },
        { status: 404 }
      );
    }

    // Validações
    if (!specialLink.is_active) {
      return NextResponse.json(
        { error: "Este link foi desativado" },
        { status: 400 }
      );
    }

    if (specialLink.current_uses >= specialLink.max_uses) {
      return NextResponse.json(
        { error: "Este link já atingiu o número máximo de usos" },
        { status: 400 }
      );
    }

    if (specialLink.expires_at) {
      const expiryDate = new Date(specialLink.expires_at);
      if (expiryDate < new Date()) {
        return NextResponse.json(
          { error: "Este link expirou" },
          { status: 400 }
        );
      }
    }

    // Verificar se o usuário existe, se não, criar
    let userId: string | null = null;

    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(
      (u) => u.email === email.toLowerCase()
    );

    if (existingUser) {
      userId = existingUser.id;
      // Se o utilizador já existe e enviou password, actualizar a password
      if (password) {
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          password,
        });
      }

      // Verificar se já tem acesso
      const { data: existingPurchase } = await supabaseAdmin
        .from("purchases")
        .select("*")
        .eq("user_id", userId)
        .eq("access_type_code", specialLink.access_type_code)
        .single();

      if (existingPurchase) {
        return NextResponse.json(
          { error: "Este email já tem acesso a este conteúdo" },
          { status: 400 }
        );
      }
    } else {
      // Criar novo usuário
      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email: email.toLowerCase(),
          email_confirm: true,
          ...(password ? { password } : {}),
        });

      if (createError || !newUser.user) {
        return NextResponse.json(
          { error: "Erro ao criar conta" },
          { status: 500 }
        );
      }

      userId = newUser.user.id;
    }

    // Dar acesso ao usuário
    const { error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: userId,
        product: specialLink.access_type_code,
        access_type_code: specialLink.access_type_code,
        granted_via: "special_link",
        granted_at: new Date().toISOString(),
      });

    if (purchaseError) {
      console.error("Purchase creation error:", purchaseError);
      return NextResponse.json(
        { error: "Erro ao conceder acesso" },
        { status: 500 }
      );
    }

    // Atualizar contador do link
    await supabaseAdmin
      .from("special_links")
      .update({
        current_uses: specialLink.current_uses + 1,
        is_used: true,
        used_by: userId,
        used_at: new Date().toISOString(),
      })
      .eq("id", specialLink.id);

    // Notificar admin
    await notifySpecialLinkUsed({
      email: email.toLowerCase(),
      access_type: specialLink.access_type_code,
    });

    return NextResponse.json({
      ok: true,
      message:
        "Acesso concedido! Enviámos um link para o teu email para fazeres login.",
    });
  } catch (error) {
    console.error("Link validation error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
