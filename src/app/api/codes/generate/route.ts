import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/codes/generate
 * Gera um código único de acesso ao livro digital
 * Apenas admins podem gerar códigos
 */
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    // Verifica autenticação
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    // Verifica se é admin
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single()

    if (!userRole || userRole.role !== 'admin') {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }

    // Pega dados do body
    const body = await request.json()
    const { email, notes } = body

    // Gera código usando função do Supabase
    const { data: codeData, error: codeError } = await supabase
      .rpc('generate_unique_livro_code')

    if (codeError) {
      console.error('Erro ao gerar código:', codeError)
      return NextResponse.json(
        { error: 'Erro ao gerar código' },
        { status: 500 }
      )
    }

    const code = codeData

    // Insere código na tabela
    const { data: insertedCode, error: insertError } = await supabase
      .from('livro_codes')
      .insert({
        code,
        email: email || null,
        status: 'unused',
        created_by: 'admin',
        notes: notes || null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('Erro ao inserir código:', insertError)
      return NextResponse.json(
        { error: 'Erro ao salvar código' },
        { status: 500 }
      )
    }

    // TODO: Enviar email com código (se email fornecido)
    if (email) {
      // Implementar envio de email aqui
      // await sendCodeEmail(email, code)
    }

    return NextResponse.json({
      success: true,
      code: insertedCode,
    })
  } catch (error) {
    console.error('Erro ao gerar código:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
