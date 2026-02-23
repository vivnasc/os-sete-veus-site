import { NextResponse } from "next/server";
import { createSupabaseServerClient, createSupabaseAdminClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * POST /api/profile/sync
 *
 * Diagnostica e repara o perfil do utilizador autenticado.
 * Verifica se existem codigos usados ou compras que concedem acesso
 * e actualiza o perfil se necessario.
 *
 * Resolve o problema de perfis partidos quando o upsert falhou
 * silenciosamente durante o registo do codigo.
 */
export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email || "";

    const supabaseAdmin = createSupabaseAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Servico indisponivel" },
        { status: 503 }
      );
    }

    // 1. Verificar o estado actual do perfil
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    // 2. Verificar se existem codigos usados por este utilizador
    const { data: usedCodes } = await supabaseAdmin
      .from("livro_codes")
      .select("code, used_at")
      .eq("used_by", userId)
      .eq("status", "used");

    // 3. Verificar compras
    const { data: purchases } = await supabaseAdmin
      .from("purchases")
      .select("product, granted_via, granted_at")
      .eq("user_id", userId);

    // 4. Determinar que acessos o utilizador DEVIA ter
    const shouldHaveBookAccess =
      (usedCodes && usedCodes.length > 0) ||
      (purchases &&
        purchases.some(
          (p) =>
            p.granted_via === "livro_code" || p.product === "livro-codigo"
        ));

    const shouldHaveMirrorsAccess =
      purchases &&
      purchases.some(
        (p) =>
          p.product === "espelhos" ||
          p.product === "jornada-completa" ||
          p.product === "pack3"
      );

    // 5. Se o perfil nao existe, criar
    if (!profile) {
      const { error: createError } = await supabaseAdmin
        .from("profiles")
        .insert({
          id: userId,
          email: userEmail,
          has_book_access: shouldHaveBookAccess,
          has_mirrors_access: shouldHaveMirrorsAccess || false,
        });

      if (createError) {
        return NextResponse.json({
          ok: false,
          diagnosis: {
            profile_exists: false,
            create_error: createError.message,
            used_codes: usedCodes?.length ?? 0,
            purchases: purchases?.length ?? 0,
          },
        });
      }

      return NextResponse.json({
        ok: true,
        action: "profile_created",
        diagnosis: {
          profile_existed: false,
          has_book_access: shouldHaveBookAccess,
          used_codes: usedCodes?.length ?? 0,
          purchases: purchases?.length ?? 0,
        },
      });
    }

    // 6. Se o perfil existe mas falta acesso que devia ter, reparar
    const needsRepair =
      (shouldHaveBookAccess && !profile.has_book_access) ||
      (shouldHaveMirrorsAccess && !profile.has_mirrors_access);

    if (needsRepair) {
      const updates: Record<string, boolean> = {};
      if (shouldHaveBookAccess && !profile.has_book_access) {
        updates.has_book_access = true;
      }
      if (shouldHaveMirrorsAccess && !profile.has_mirrors_access) {
        updates.has_mirrors_access = true;
      }

      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update(updates)
        .eq("id", userId);

      return NextResponse.json({
        ok: !updateError,
        action: "profile_repaired",
        diagnosis: {
          profile_existed: true,
          previous_book_access: profile.has_book_access,
          previous_mirrors_access: profile.has_mirrors_access,
          repaired_fields: Object.keys(updates),
          used_codes: usedCodes?.length ?? 0,
          purchases: purchases?.length ?? 0,
          error: updateError?.message,
        },
      });
    }

    // 7. Perfil esta correcto
    return NextResponse.json({
      ok: true,
      action: "no_repair_needed",
      diagnosis: {
        profile_existed: true,
        has_book_access: profile.has_book_access,
        has_mirrors_access: profile.has_mirrors_access,
        used_codes: usedCodes?.length ?? 0,
        purchases: purchases?.length ?? 0,
      },
    });
  } catch (error) {
    console.error("Profile sync error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
