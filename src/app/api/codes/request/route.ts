import { createSupabaseAdminClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import { notifyCodeRequest, notifyAdmin } from '@/lib/notify-admin'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"]

/**
 * Gera codigo unico LIVRO-XXXXX
 */
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LIVRO-";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * POST /api/codes/request
 * Cliente que comprou livro físico pede código de acesso
 * Público (não precisa autenticação)
 * Usa admin client para bypassa RLS (anon não tem SELECT nesta tabela)
 *
 * Se comprovativo (proofUrl) foi enviado:
 *   → auto-gera codigo, cria conta, concede acesso imediato
 *   → notifica admin que foi auto-atendido
 * Se sem comprovativo:
 *   → cria pedido pendente para revisao manual
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, whatsapp, purchaseLocation, proofUrl } = body

    // Validações básicas
    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Nome e email são obrigatórios' },
        { status: 400 }
      )
    }

    // Usar admin client para todas as operações (bypassa RLS)
    const adminClient = createSupabaseAdminClient()

    if (!adminClient) {
      console.error('SUPABASE_SERVICE_ROLE_KEY não configurada')
      return NextResponse.json(
        { error: 'Configuração do servidor incompleta' },
        { status: 500 }
      )
    }

    // Verifica se já existe pedido pendente ou aprovado para este email
    const { data: existingRequest } = await adminClient
      .from('livro_code_requests')
      .select('id, status')
      .eq('email', email)
      .in('status', ['pending', 'approved'])
      .single()

    if (existingRequest) {
      if (existingRequest.status === 'approved') {
        return NextResponse.json(
          { error: 'Este email ja tem acesso concedido.' },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: 'Já tens um pedido pendente. Vamos enviá-lo em breve!' },
        { status: 400 }
      )
    }

    // --- AUTO-ATENDIMENTO: comprovativo enviado → acesso imediato ---
    if (proofUrl) {
      return await handleAutoApproval(adminClient, {
        fullName, email, whatsapp, purchaseLocation, proofUrl,
      })
    }

    // --- FLUXO MANUAL: sem comprovativo → pedido pendente ---
    const { error: insertError } = await adminClient
      .from('livro_code_requests')
      .insert({
        full_name: fullName,
        email,
        whatsapp: whatsapp || null,
        purchase_location: purchaseLocation || null,
        proof_url: null,
        status: 'pending',
      })

    if (insertError) {
      console.error('Erro ao criar pedido:', JSON.stringify(insertError))
      return NextResponse.json(
        { error: `Erro ao guardar pedido: ${insertError.message}` },
        { status: 500 }
      )
    }

    notifyCodeRequest({
      full_name: fullName,
      email,
      whatsapp: whatsapp || undefined,
      purchase_location: purchaseLocation || undefined,
    }).catch(err => console.error('Erro ao notificar admin:', err))

    return NextResponse.json({
      success: true,
      message: 'Pedido recebido! Vais receber o código em até 24h.',
    })
  } catch (error) {
    console.error('Erro ao processar pedido:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * Auto-atendimento: gera codigo, cria conta, concede acesso, notifica admin
 */
async function handleAutoApproval(
  adminClient: ReturnType<typeof createSupabaseAdminClient>,
  data: {
    fullName: string
    email: string
    whatsapp?: string
    purchaseLocation?: string
    proofUrl: string
  }
) {
  const { fullName, email, whatsapp, purchaseLocation, proofUrl } = data
  const normalizedEmail = email.toLowerCase().trim()

  // 1. Gerar codigo unico
  let code = ""
  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = generateCode()
    const { data: existing } = await adminClient!
      .from("livro_codes")
      .select("id")
      .eq("code", candidate)
      .maybeSingle()
    if (!existing) {
      code = candidate
      break
    }
  }

  if (!code) {
    return NextResponse.json(
      { error: 'Erro ao gerar codigo. Tenta novamente.' },
      { status: 500 }
    )
  }

  // 2. Inserir codigo na tabela
  const { data: insertedCode, error: codeInsertError } = await adminClient!
    .from("livro_codes")
    .insert({
      code,
      email: normalizedEmail,
      status: "unused",
      created_by: "auto",
      notes: `Auto-atendimento: ${fullName}`,
    })
    .select()
    .single()

  if (codeInsertError) {
    console.error("Erro ao inserir codigo:", codeInsertError)
    return NextResponse.json(
      { error: 'Erro ao gerar codigo de acesso.' },
      { status: 500 }
    )
  }

  // 3. Criar ou encontrar utilizador
  let userId: string | null = null

  const { data: existingUsers } = await adminClient!.auth.admin.listUsers()
  const existingUser = existingUsers?.users?.find(
    (u: { email?: string }) => u.email === normalizedEmail
  )

  if (existingUser) {
    userId = existingUser.id
  } else {
    const { data: newUser, error: createError } =
      await adminClient!.auth.admin.createUser({
        email: normalizedEmail,
        email_confirm: true,
      })

    if (createError || !newUser.user) {
      console.error("Erro ao criar utilizador:", createError)
      // Codigo ja foi gerado — guardar pedido como aprovado para admin resolver
      return NextResponse.json(
        { error: 'Erro ao criar conta. O teu codigo foi gerado — contacta-nos.' },
        { status: 500 }
      )
    }
    userId = newUser.user.id
  }

  // 4. Conceder acesso (has_book_access)
  await adminClient!
    .from("profiles")
    .upsert(
      { id: userId, email: normalizedEmail, has_book_access: true },
      { onConflict: "id" }
    )

  // Verificacao: confirmar que o acesso foi concedido
  await new Promise(resolve => setTimeout(resolve, 500))
  const { data: verifyProfile } = await adminClient!
    .from("profiles")
    .select("has_book_access")
    .eq("id", userId)
    .single()

  if (verifyProfile && !verifyProfile.has_book_access) {
    await adminClient!
      .from("profiles")
      .update({ has_book_access: true })
      .eq("id", userId)
  }

  // 5. Marcar codigo como usado
  await adminClient!
    .from("livro_codes")
    .update({
      status: "used",
      used_at: new Date().toISOString(),
      used_by: userId,
    })
    .eq("id", insertedCode.id)

  // 6. Criar registo de compra
  await adminClient!.from("purchases").insert({
    user_id: userId,
    product: "livro-codigo",
    access_type_code: "livro-codigo",
    granted_via: "livro_code",
    granted_at: new Date().toISOString(),
  })

  // 7. Guardar pedido como aprovado
  await adminClient!
    .from('livro_code_requests')
    .insert({
      full_name: fullName,
      email: normalizedEmail,
      whatsapp: whatsapp || null,
      purchase_location: purchaseLocation || null,
      proof_url: proofUrl,
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      generated_code_id: insertedCode.id,
    })

  // 8. Notificar admin (Telegram)
  notifyAdmin({
    type: "code_redeemed",
    title: "Auto-atendimento: codigo gerado e acesso concedido",
    message: `${fullName} (${normalizedEmail}) enviou comprovativo e recebeu acesso automatico.`,
    details: {
      Nome: fullName,
      Email: normalizedEmail,
      Codigo: code,
      WhatsApp: whatsapp || "—",
      "Comprou em": purchaseLocation || "—",
      Comprovativo: proofUrl,
    },
  }).catch(err => console.error('Erro ao notificar admin:', err))

  return NextResponse.json({
    success: true,
    autoApproved: true,
    code,
    message: `Acesso concedido! O teu codigo e ${code}. Ja podes entrar com o teu email ${normalizedEmail}.`,
  })
}

/**
 * GET /api/codes/request
 * Admin: lista todos os pedidos
 * Usuário: lista seus próprios pedidos
 */
export async function GET() {
  try {
    const { createSupabaseServerClient } = await import('@/lib/supabase-server')
    const supabase = await createSupabaseServerClient()

    // Verifica autenticação
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Verifica se e admin (email directo ou role)
    const isAdminEmail = ADMIN_EMAILS.includes(session.user.email || "")
    let isAdmin = isAdminEmail

    if (!isAdmin) {
      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single()
      isAdmin = userRole?.role === 'admin'
    }

    // Admin usa admin client para ver tudo, user normal ve so os seus
    const supabaseAdmin = isAdmin ? createSupabaseAdminClient() : null
    const db = supabaseAdmin || supabase

    let query = db
      .from('livro_code_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (!isAdmin) {
      query = query.eq('email', session.user.email)
    }

    const { data: requests, error: requestsError } = await query

    if (requestsError) {
      console.error('Erro ao buscar pedidos:', requestsError)
      return NextResponse.json(
        { error: 'Erro ao buscar pedidos' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      requests,
    })
  } catch (error) {
    console.error('Erro ao listar pedidos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
