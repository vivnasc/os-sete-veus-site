import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e password são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se utilizador já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está registado' },
        { status: 400 }
      )
    }

    // Hash da password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar utilizador
    // Se for o email da autora, atribuir role "author"
    const isAuthor = email === 'viv.saraiva@gmail.com'

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: isAuthor ? 'author' : 'reader',
      }
    })

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  } catch (error) {
    console.error('Erro no registo:', error)
    return NextResponse.json(
      { error: 'Erro ao criar conta' },
      { status: 500 }
    )
  }
}
