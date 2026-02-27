#!/usr/bin/env node

/**
 * Script de configuração do banco de dados
 *
 * FORMA MAIS SIMPLES E SEGURA:
 * Este script mostra instruções claras de como executar o SQL
 */

const fs = require('fs');
const path = require('path');

// Tentar carregar .env.local
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv não instalado, tudo bem
}

console.log('\n' + '='.repeat(70));
console.log('🎯  CONFIGURAÇÃO DO BANCO DE DADOS - OS SETE VÉUS');
console.log('='.repeat(70) + '\n');

// Verificar se o arquivo SQL existe
const sqlPath = path.join(__dirname, 'supabase-schema.sql');
if (!fs.existsSync(sqlPath)) {
  console.error('❌ Erro: Arquivo supabase-schema.sql não encontrado!\n');
  process.exit(1);
}

const sqlContent = fs.readFileSync(sqlPath, 'utf8');
const lineCount = sqlContent.split('\n').length;

console.log('✅ Arquivo SQL encontrado!');
console.log(`   📄 ${lineCount} linhas de SQL\n`);

// Verificar variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseKey === 'ADICIONA_TUA_SERVICE_ROLE_KEY_AQUI') {
  console.log('⚠️  Variáveis de ambiente não configuradas\n');
  console.log('📝 PASSOS PARA CONFIGURAR .env.local:\n');
  console.log('1. Vai ao Supabase Dashboard:');
  console.log('   https://supabase.com/dashboard\n');
  console.log('2. Abre o teu projeto\n');
  console.log('3. Vai a: Settings → API\n');
  console.log('4. Copia a "service_role" key (secreta)\n');
  console.log('5. Edita .env.local e substitui:');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=ADICIONA_TUA_SERVICE_ROLE_KEY_AQUI');
  console.log('   pela tua chave\n');
} else {
  console.log('✅ Variáveis de ambiente configuradas!\n');

  // Testar conexão básica
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    });

    console.log('🔌 Testando conexão com Supabase...');

    supabase.from('access_types').select('count', { count: 'exact', head: true })
      .then(({ error }) => {
        if (error && error.code === '42P01') {
          console.log('⚠️  Tabelas ainda não existem (normal antes do SQL)\n');
        } else if (error) {
          console.log(`❌ Erro: ${error.message}\n`);
        } else {
          console.log('✅ Conexão OK! Tabelas já existem.\n');
        }
        mostrarInstrucoes();
      });
  } catch (e) {
    console.log('ℹ️  Supabase client não disponível (instala: npm install)\n');
    mostrarInstrucoes();
  }

  return;
}

mostrarInstrucoes();

function mostrarInstrucoes() {
  console.log('='.repeat(70));
  console.log('📋  COMO EXECUTAR O SQL NO SUPABASE');
  console.log('='.repeat(70) + '\n');

  console.log('PASSOS:');
  console.log('───────\n');
  console.log('1. Abre: https://supabase.com/dashboard\n');
  console.log('2. Seleciona o teu projeto "os-sete-veus"\n');
  console.log('3. Menu lateral → SQL Editor (ícone de código)</n');
  console.log('4. Clica em "+ New query" (botão verde)\n');
  console.log('5. Abre o arquivo: supabase-schema.sql');
  console.log('   (está na raiz do projeto)\n');
  console.log('6. Copia TODO o conteúdo (Ctrl+A, Ctrl+C)\n');
  console.log('7. Cola no SQL Editor do Supabase\n');
  console.log('8. Clica em "RUN" (ou Ctrl+Enter) 🚀\n');
  console.log('9. Aguarda... (pode demorar 10-30 segundos)\n');
  console.log('10. Se aparecer "Success. No rows returned" → PERFEITO! ✅\n');

  console.log('='.repeat(70) + '\n');

  console.log('✅ Depois de executar, terás:\n');
  console.log('   • 4 tabelas novas (access_types, payments, etc)');
  console.log('   • 3 tipos de acesso configurados');
  console.log('   • Segurança (RLS) ativada');
  console.log('   • Sistema pronto para usar!\n');

  console.log('🎉 Testa em: https://seteveus.space/admin\n');
  console.log('📱 Telegram de suporte: t.me/viviannedossantos\n');
  console.log('='.repeat(70) + '\n');
}
