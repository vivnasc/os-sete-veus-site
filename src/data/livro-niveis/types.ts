export type GlossarioEntry = {
  termo: string
  definicao: string
  exemplo?: string
  veus_relacionados?: number[]
}

export type ExemploConcreto = {
  contexto: string
  texto: string
}

export type NotaContextual = {
  paragrafo_indice: number
  texto: string
}

export type NivelCapitulo = {
  capitulo_numero: number

  // Semente
  resumo_acessivel: string[]
  perguntas_orientadoras: string[]
  exemplos_concretos: ExemploConcreto[]

  // Raiz
  notas_contextuais: NotaContextual[]
  termos_destacados: string[]

  // Jornada de autodescobertas (Semente + Raiz)
  crencas_a_mapear?: string[]
  sinais_do_veu?: string[]
  guiao_reflexao?: string[]
  espelho_pessoal?: string
}
