#!/usr/bin/env node

/**
 * Script para verificar se a configuração do Supabase está correta
 * Execute: node verificar-config.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🔍 Verificando configuração do Supabase...\n');

// Verificar se .env.local existe
const envPath = join(__dirname, '.env.local');
if (!existsSync(envPath)) {
  console.log('❌ Arquivo .env.local não encontrado!');
  console.log('   Crie o arquivo .env.local na raiz do projeto');
  console.log('   Copie o conteúdo de .env.example e preencha com suas credenciais\n');
  process.exit(1);
}

console.log('✅ Arquivo .env.local encontrado');

// Ler e verificar conteúdo
const envContent = readFileSync(envPath, 'utf-8');

const checks = [
  {
    name: 'VITE_SUPABASE_URL',
    regex: /VITE_SUPABASE_URL\s*=\s*["']?https:\/\/[a-z0-9]+\.supabase\.co["']?/,
    message: 'URL do Supabase configurada'
  },
  {
    name: 'VITE_SUPABASE_PUBLISHABLE_KEY',
    regex: /VITE_SUPABASE_PUBLISHABLE_KEY\s*=\s*["']?eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+["']?/,
    message: 'Chave pública do Supabase configurada'
  }
];

let allOk = true;
const problems = [];

checks.forEach(check => {
  if (check.regex.test(envContent)) {
    console.log(`✅ ${check.message}`);
  } else {
    console.log(`❌ ${check.name} não configurada ou inválida`);
    problems.push(check.name);
    allOk = false;
  }
});

// Verificar se há variáveis duplicadas ou incorretas
if (envContent.includes('VITE_SUPABASE_PROJECT_ID')) {
  console.log('⚠️  VITE_SUPABASE_PROJECT_ID não é necessária (remova)');
  problems.push('Variável desnecessária: VITE_SUPABASE_PROJECT_ID');
}

// Verificar se há URLs duplicadas
const urlMatches = envContent.match(/https:\/\/[a-z0-9]+\.supabase\.co/g);
if (urlMatches && urlMatches.length > 1) {
  console.log('⚠️  Múltiplas URLs encontradas - use apenas uma em VITE_SUPABASE_URL');
  problems.push('URLs duplicadas');
}

console.log('');

if (allOk && problems.length === 0) {
  console.log('🎉 Configuração parece estar correta!');
  console.log('   Execute: npm run dev');
  console.log('   Acesse: http://localhost:5173/admin/login\n');
} else {
  console.log('⚠️  Há problemas na configuração:');
  problems.forEach(p => console.log(`   - ${p}`));
  console.log('\n   Verifique o arquivo .env.local');
  console.log('   Consulte: GUIA_SUPABASE_PASSO_A_PASSO.md\n');
  process.exit(1);
}
