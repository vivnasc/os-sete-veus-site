import { createSupabaseAdminClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'
import { notifyCodeRequest } from '@/lib/notify-admin'

export const dynamic = 'force-dynamic'

const ADMIN_EMAILS = ["viv.saraiva@gmail.com"]

/**
 * POST /api/codes/request
 * Cliente que comprou livro físico pede código de acesso
 * Público (não precisa autenticação)
 * Usa admin client para bypassa RLS (anon não tem SELECT nesta tabela)
 *
 * Cria pedido pendente. Admin revê comprovativo e aprova no painel.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, whatsapp, purchaseLocation, proofUrl } = body

    // Validações básicas
    if (!fullName || !email || !whatsapp) {
      return NextResponse.json(
        { error: 'Nome, email e WhatsApp são obrigatórios' },
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

    // Verifica se já existe pedido pendente para este email
    const { data: existingRequest } = await adminClient
      .from('livro_code_requests')
      .select('id, status')
      .eq('email', email)
      .eq('status', 'pending')
      .single()

    if (existingRequest) {
      return NextResponse.json(
        {
          error: 'Já tens um pedido pendente. Vamos enviá-lo em breve!',
        },
        { status: 400 }
      )
    }

    // Cria pedido via admin client (bypassa RLS)
    const { error: insertError } = await adminClient
      .from('livro_code_requests')
      .insert({
        full_name: fullName,
        email,
        whatsapp: whatsapp || null,
        purchase_location: purchaseLocation || null,
        proof_url: proofUrl || null,
        status: 'pending',
      })

    if (insertError) {
      console.error('Erro ao criar pedido:', JSON.stringify(insertError))
      return NextResponse.json(
        { error: `Erro ao guardar pedido: ${insertError.message}` },
        { status: 500 }
      )
    }

    // Notificar admin — AWAIT para garantir que o Vercel nao mata a funcao antes
    await notifyCodeRequest({
      full_name: fullName,
      email,
      whatsapp: whatsapp || undefined,
      purchase_location: purchaseLocation || undefined,
      proof_url: proofUrl || undefined,
    })

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
