# Guia de Configuração - Brecholaria Vintage

Este documento contém todas as instruções necessárias para configurar e colocar o site em produção.

## 📋 Índice

1. [Configuração do Supabase](#configuração-do-supabase)
2. [Configuração do Mercado Pago](#configuração-do-mercado-pago)
3. [Variáveis de Ambiente](#variáveis-de-ambiente)
4. [Deploy das Edge Functions](#deploy-das-edge-functions)
5. [Executar Migrations](#executar-migrations)
6. [Criar Primeiro Usuário Admin](#criar-primeiro-usuário-admin)
7. [Deploy do Frontend](#deploy-do-frontend)
8. [Testes](#testes)

---

## 1. Configuração do Supabase

### 1.1 Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha os dados:
   - **Name**: brecholaria-vintage
   - **Database Password**: Escolha uma senha forte
   - **Region**: South America (São Paulo)
5. Aguarde a criação do projeto (pode levar alguns minutos)

### 1.2 Obter Credenciais

Após criar o projeto, vá em **Settings** > **API**:

- **Project URL**: `https://xxx.supabase.co`
- **anon public key**: Chave pública para o frontend
- **service_role key**: Chave privada (NUNCA exponha no frontend)

Anote essas credenciais, você precisará delas.

---

## 2. Configuração do Mercado Pago

### 2.1 Criar Conta no Mercado Pago

1. Acesse [https://www.mercadopago.com.br](https://www.mercadopago.com.br)
2. Crie uma conta ou faça login
3. Complete o cadastro da sua empresa

### 2.2 Obter Credenciais

1. Acesse [https://www.mercadopago.com.br/developers/panel/app](https://www.mercadopago.com.br/developers/panel/app)
2. Crie uma aplicação:
   - **Nome**: Brecholaria Vintage
   - **Descrição**: E-commerce de roupas vintage
3. Após criar, você terá acesso a:
   - **Public Key** (Chave Pública): Para uso no frontend
   - **Access Token** (Token de Acesso): Para uso no backend

### 2.3 Modo de Teste vs Produção

O Mercado Pago oferece dois ambientes:

- **Teste**: Use as credenciais de teste para desenvolvimento
- **Produção**: Use as credenciais de produção quando estiver pronto

**Importante**: Você precisa ativar sua conta no Mercado Pago para usar o modo de produção.

---

## 3. Variáveis de Ambiente

### 3.1 Frontend (.env.local)

Crie um arquivo `.env.local` na raiz do projeto:

```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_aqui
VITE_MERCADOPAGO_PUBLIC_KEY=sua_chave_publica_mp_aqui
```

### 3.2 Supabase Edge Functions

No Supabase, vá em **Settings** > **Edge Functions** > **Secrets** e adicione:

```bash
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

---

## 4. Deploy das Edge Functions

### 4.1 Instalar Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# Windows (via Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Linux
brew install supabase/tap/supabase
```

### 4.2 Fazer Login

```bash
supabase login
```

### 4.3 Link com o Projeto

```bash
cd /caminho/para/brecholaria-vintage
supabase link --project-ref seu_project_ref
```

O `project_ref` está na URL do seu projeto: `https://app.supabase.com/project/[project_ref]`

### 4.4 Deploy das Functions

```bash
# Deploy da função de criar pagamento
supabase functions deploy create-payment

# Deploy da função de webhook
supabase functions deploy payment-webhook

# Ou deploy de todas de uma vez
supabase functions deploy
```

### 4.5 Configurar Secrets

```bash
supabase secrets set MERCADOPAGO_ACCESS_TOKEN=seu_token
supabase secrets set SUPABASE_URL=https://xxx.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=sua_key
```

---

## 5. Executar Migrations

### 5.1 Via Supabase CLI

```bash
supabase db push
```

### 5.2 Via Dashboard (alternativa)

1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Copie e cole o conteúdo de cada arquivo em `supabase/migrations/`
4. Execute na ordem:
   - `20251212121513_ac1ca8b7-7d0c-4deb-a3d3-67972cfff052.sql`
   - `20251212150000_add_payment_fields.sql`

---

## 6. Criar Primeiro Usuário Admin

### 6.1 Criar Usuário

1. Acesse o Supabase Dashboard
2. Vá em **Authentication** > **Users**
3. Clique em **Add User**
4. Preencha:
   - **Email**: seu_email@exemplo.com
   - **Password**: senha_forte_aqui
5. Clique em **Create User**

### 6.2 Adicionar Role de Admin

1. Vá em **SQL Editor**
2. Execute o seguinte SQL (substitua o email):

```sql
-- Buscar o ID do usuário
SELECT id FROM auth.users WHERE email = 'seu_email@exemplo.com';

-- Adicionar role de admin (substitua o UUID pelo ID retornado acima)
INSERT INTO public.user_roles (user_id, role)
VALUES ('uuid-do-usuario-aqui', 'admin');
```

### 6.3 Fazer Login

Agora você pode acessar `/admin/login` e fazer login com as credenciais criadas.

---

## 7. Deploy do Frontend

### 7.1 Build do Projeto

```bash
npm run build
```

Isso criará uma pasta `dist/` com os arquivos estáticos.

### 7.2 Opções de Deploy

#### Opção A: Vercel (Recomendado)

1. Instale a Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Configure as variáveis de ambiente no dashboard da Vercel

#### Opção B: Netlify

1. Instale a Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

#### Opção C: Supabase Hosting

O Supabase também oferece hosting gratuito. Consulte a documentação oficial.

---

## 8. Testes

### 8.1 Testar Criação de Produtos

1. Acesse `/admin/login`
2. Faça login com o usuário admin
3. Vá na aba "Produtos"
4. Clique em "Novo Produto"
5. Preencha os dados e faça upload de imagens
6. Salve o produto

### 8.2 Testar Fluxo de Compra

1. Acesse a página inicial
2. Navegue até "Produtos"
3. Adicione produtos ao carrinho
4. Vá para o carrinho
5. Clique em "Finalizar Compra"
6. Preencha os dados de entrega
7. Escolha o método de pagamento
8. Finalize o pedido

### 8.3 Testar Pagamento PIX (Modo Teste)

Para testar pagamentos no modo teste do Mercado Pago:

1. Use as credenciais de teste
2. Ao gerar um pagamento PIX, você receberá um QR Code de teste
3. Use a [ferramenta de teste do Mercado Pago](https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing) para simular pagamentos

### 8.4 Testar Webhook

1. Crie um pedido de teste
2. Simule o pagamento no Mercado Pago
3. Verifique se o status do pedido foi atualizado automaticamente no painel admin

---

## 🔒 Segurança

### Checklist de Segurança

- [ ] Nunca exponha `SUPABASE_SERVICE_ROLE_KEY` no frontend
- [ ] Nunca exponha `MERCADOPAGO_ACCESS_TOKEN` no frontend
- [ ] Use HTTPS em produção
- [ ] Configure Row Level Security (RLS) no Supabase
- [ ] Valide todos os dados no backend
- [ ] Configure rate limiting nas Edge Functions
- [ ] Use senhas fortes para usuários admin
- [ ] Ative 2FA na conta do Supabase e Mercado Pago

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs das Edge Functions no Supabase Dashboard
2. Verifique os logs do Mercado Pago no painel de desenvolvedores
3. Consulte a documentação:
   - [Supabase Docs](https://supabase.com/docs)
   - [Mercado Pago Docs](https://www.mercadopago.com.br/developers/pt/docs)

---

## 🎉 Pronto!

Seu e-commerce está configurado e pronto para uso. Boa sorte com as vendas! 🚀
