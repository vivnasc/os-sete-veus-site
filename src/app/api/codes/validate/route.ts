import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * POST /api/codes/validate
 * Valida um código de acesso e marca como usado
 * Usado durante o registo de novo utilizador
 */
export async function POST(request: Request) {
  try {
    const supabase = await createSupabaseServerClient()

    // Pega código do body
    const body = await request.json()
    const { code, userId } = body

    if (!code) {
      return NextResponse.json(
        { error: 'Código não fornecido' },
        { status: 400 }
      )
    }

    // Busca código
    const { data: codeData, error: codeError } = await supabase
      .from('livro_codes')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .single()

    if (codeError || !codeData) {
      return NextResponse.json(
        { error: 'Código inválido ou não encontrado' },
        { status: 404 }
      )
    }

    // Verifica se já foi usado
    if (codeData.status === 'used') {
      return NextResponse.json(
        { error: 'Este código já foi usado' },
        { status: 400 }
      )
    }

    // Verifica se está expirado
    if (codeData.status === 'expired') {
      return NextResponse.json(
        { error: 'Este código expirou' },
        { status: 400 }
      )
    }

    // Marca código como usado
    const { error: updateError } = await supabase
      .from('livro_codes')
      .update({
        status: 'used',
        used_at: new Date().toISOString(),
        used_by: userId || null,
      })
      .eq('id', codeData.id)

    if (updateError) {
      console.error('Erro ao atualizar código:', updateError)
      return NextResponse.json(
        { error: 'Erro ao validar código' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      code: codeData,
    })
  } catch (error) {
    console.error('Erro ao validar código:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
