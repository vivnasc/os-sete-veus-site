import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/**
 * GET /api/codes/list
 * Lista todos os codigos e estatisticas (admin only)
 */
export async function GET() {
  try {
    // Verificar autenticacao via cookies
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
    }

    // Verificar admin (via email ou role)
    const ADMIN_EMAILS = ["viv.saraiva@gmail.com"];
    const isAdminEmail = ADMIN_EMAILS.includes(session.user.email || "");

    if (!isAdminEmail) {
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (!userRole || userRole.role !== "admin") {
        return NextResponse.json(
          { error: "Sem permissao" },
          { status: 403 }
        );
      }
    }

    // Usar service role para aceder a todos os codigos
    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: "Servico indisponivel" },
        { status: 503 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Buscar todos os codigos
    const { data: codes, error } = await supabaseAdmin
      .from("livro_codes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar codigos:", error);
      return NextResponse.json(
        { error: "Erro ao buscar codigos" },
        { status: 500 }
      );
    }

    const allCodes = codes || [];

    // Calcular stats
    const total = allCodes.length;
    const used = allCodes.filter((c) => c.status === "used").length;
    const unused = allCodes.filter((c) => c.status === "unused").length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = allCodes.filter(
      (c) => new Date(c.created_at) >= today
    ).length;

    return NextResponse.json({
      success: true,
      codes: allCodes,
      stats: {
        total,
        used,
        unused,
        today: todayCount,
      },
    });
  } catch (error) {
    console.error("Erro ao listar codigos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
