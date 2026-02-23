import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-server";

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];

/**
 * POST /api/admin/grant-access
 * Permite a admin conceder acesso manualmente a um utilizador.
 * Body: { email, adminEmail, accessType }
 * accessType: "book" | "mirrors" | "audiobook" | "admin"
 */
export async function POST(request: Request) {
  try {
    const { email, adminEmail, accessType = "book" } = await request.json();

    if (!email || !adminEmail) {
      return NextResponse.json(
        { error: "Email do utilizador e email da admin são obrigatórios" },
        { status: 400 }
      );
    }

    if (!ADMIN_EMAILS.includes(adminEmail)) {
      return NextResponse.json(
        { error: "Sem permissão" },
        { status: 403 }
      );
    }

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    // Encontrar o utilizador pelo email
    const { data: users } = await supabaseAdmin.auth.admin.listUsers();
    const targetUser = users?.users?.find(
      (u) => u.email === email.toLowerCase()
    );

    if (!targetUser) {
      return NextResponse.json(
        { error: "Utilizador não encontrado" },
        { status: 404 }
      );
    }

    // Construir o objecto de update com base no tipo de acesso
    const accessFields: Record<string, boolean> = {};
    switch (accessType) {
      case "book":
        accessFields.has_book_access = true;
        break;
      case "mirrors":
        accessFields.has_mirrors_access = true;
        break;
      case "audiobook":
        accessFields.has_audiobook_access = true;
        break;
      case "admin":
        accessFields.is_admin = true;
        break;
      default:
        return NextResponse.json(
          { error: "Tipo de acesso inválido" },
          { status: 400 }
        );
    }

    // Usar upsert para garantir que funciona mesmo sem perfil existente
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: targetUser.id,
          ...accessFields,
        },
        { onConflict: "id" }
      );

    if (profileError) {
      console.error("Grant access error:", profileError);
      return NextResponse.json(
        { error: "Erro ao conceder acesso: " + profileError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: `Acesso "${accessType}" concedido a ${email}`,
    });
  } catch (error) {
    console.error("Grant access error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
