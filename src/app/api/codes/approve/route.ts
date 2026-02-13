import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/codes/approve
 * Admin aprova pedido de código e gera código automaticamente
 */
export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

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
    const { requestId } = body

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID não fornecido' },
        { status: 400 }
      )
    }

    // Busca o pedido
    const { data: requestData, error: requestError } = await supabase
      .from('livro_code_requests')
      .select('*')
      .eq('id', requestId)
      .single()

    if (requestError || !requestData) {
      return NextResponse.json(
        { error: 'Pedido não encontrado' },
        { status: 404 }
      )
    }

    // Verifica se já foi aprovado
    if (requestData.status === 'approved') {
      return NextResponse.json(
        { error: 'Este pedido já foi aprovado' },
        { status: 400 }
      )
    }

    // Gera código único
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

    // Cria código na tabela
    const { data: insertedCode, error: insertError } = await supabase
      .from('livro_codes')
      .insert({
        code,
        email: requestData.email,
        status: 'unused',
        created_by: 'admin',
        notes: `Gerado para pedido #${requestId} - ${requestData.full_name}`,
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

    // Atualiza pedido como aprovado
    const { error: updateError } = await supabase
      .from('livro_code_requests')
      .update({
        status: 'approved',
        generated_code_id: insertedCode.id,
        reviewed_at: new Date().toISOString(),
        reviewed_by: session.user.id,
      })
      .eq('id', requestId)

    if (updateError) {
      console.error('Erro ao atualizar pedido:', updateError)
      return NextResponse.json(
        { error: 'Erro ao atualizar pedido' },
        { status: 500 }
      )
    }

    // TODO: Enviar email com código ao cliente
    // await sendCodeEmail(requestData.email, code, requestData.full_name)

    return NextResponse.json({
      success: true,
      code: insertedCode,
      message: `Código ${code} gerado e enviado para ${requestData.email}`,
    })
  } catch (error) {
    console.error('Erro ao aprovar pedido:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/codes/approve
 * Admin rejeita pedido de código
 */
export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

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
    const { requestId, reason } = body

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID não fornecido' },
        { status: 400 }
      )
    }

    // Atualiza pedido como rejeitado
    const { error: updateError } = await supabase
      .from('livro_code_requests')
      .update({
        status: 'rejected',
        rejection_reason: reason || 'Pedido rejeitado pelo administrador',
        reviewed_at: new Date().toISOString(),
        reviewed_by: session.user.id,
      })
      .eq('id', requestId)

    if (updateError) {
      console.error('Erro ao rejeitar pedido:', updateError)
      return NextResponse.json(
        { error: 'Erro ao rejeitar pedido' },
        { status: 500 }
      )
    }

    // TODO: Enviar email ao cliente informando rejeição (opcional)

    return NextResponse.json({
      success: true,
      message: 'Pedido rejeitado',
    })
  } catch (error) {
    console.error('Erro ao rejeitar pedido:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
