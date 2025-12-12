#!/usr/bin/env node

/**
 * Script para verificar se a configuração do Supabase está correta
 * Execute: node verificar-config.js
 */

const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verificando configuração do Supabase...\n');

// Verificar se .env.local existe
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env.local não encontrado!');
  console.log('   Crie o arquivo .env.local na raiz do projeto');
  console.log('   Copie o conteúdo de .env.example e preencha com suas credenciais\n');
  process.exit(1);
}

console.log('✅ Arquivo .env.local encontrado');

// Ler e verificar conteúdo
const envContent = fs.readFileSync(envPath, 'utf-8');

const checks = [
  {
    name: 'VITE_SUPABASE_URL',
    regex: /VITE_SUPABASE_URL=https:\/\/[a-z0-9]+\.supabase\.co/,
    message: 'URL do Supabase configurada'
  },
  {
    name: 'VITE_SUPABASE_PUBLISHABLE_KEY',
    regex: /VITE_SUPABASE_PUBLISHABLE_KEY=eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,
    message: 'Chave pública do Supabase configurada'
  }
];

let allOk = true;

checks.forEach(check => {
  if (check.regex.test(envContent)) {
    console.log(`✅ ${check.message}`);
  } else {
    console.log(`❌ ${check.name} não configurada ou inválida`);
    allOk = false;
  }
});

console.log('');

if (allOk) {
  console.log('🎉 Configuração parece estar correta!');
  console.log('   Execute: npm run dev');
  console.log('   Acesse: http://localhost:5173/admin/login\n');
} else {
  console.log('⚠️  Há problemas na configuração');
  console.log('   Verifique o arquivo .env.local');
  console.log('   Consulte: GUIA_SUPABASE_PASSO_A_PASSO.md\n');
  process.exit(1);
}
