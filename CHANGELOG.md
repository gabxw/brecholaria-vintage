# Changelog - Brecholaria Vintage

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [2.0.0] - 2024-12-12

### ✨ Adicionado

#### Sistema de Checkout Completo
- Página de checkout com formulário de dados do cliente
- Validação de formulários com Zod
- Busca automática de endereço via CEP (ViaCEP API)
- Componente `CheckoutForm` com validação completa
- Componente `OrderSummary` com resumo do pedido
- Componente `PaymentMethods` para seleção de pagamento
- Página `OrderConfirmation` com detalhes do pedido

#### Sistema de Pagamentos
- Integração com Mercado Pago
- Suporte a PIX (com QR Code)
- Suporte a Cartão de Crédito (parcelamento)
- Suporte a Boleto Bancário
- Edge Function `create-payment` para processar pagamentos
- Edge Function `payment-webhook` para receber notificações
- Hook `usePayment` para gerenciar pagamentos no frontend
- Biblioteca `mercadopago.ts` com funções auxiliares

#### Gerenciamento de Pedidos (Admin)
- Hook `useOrders` para CRUD de pedidos
- Componente `OrdersTable` com listagem e filtros
- Componente `OrderDetails` com visualização completa
- Atualização de status de pedidos
- Filtros por status e busca
- Integração com painel administrativo existente

#### Banco de Dados
- Migration para adicionar campo `payment_id` em orders
- Índice para otimizar buscas por payment_id

#### Documentação
- `CONFIGURACAO.md` - Guia completo de configuração
- `PLANO_DESENVOLVIMENTO.md` - Planejamento técnico
- `README_COMPLETO.md` - README atualizado com todas as features
- `.env.example` - Exemplo de variáveis de ambiente
- `CHANGELOG.md` - Este arquivo

### 🔄 Modificado

#### Rotas
- Adicionadas rotas `/checkout` e `/pedido/:id`
- Atualizado `App.tsx` com novas rotas

#### Carrinho
- Botão "Finalizar Compra" agora redireciona para `/checkout`
- Removido toast temporário

#### Painel Admin
- Aba "Pedidos" agora funcional com listagem completa
- Adicionado hook `useOrders` no componente Admin
- Integração com componentes de gerenciamento de pedidos

### 🐛 Corrigido
- Validação de formulários
- Tipagem TypeScript em todos os componentes
- Imports e exports

### 📦 Dependências
Nenhuma nova dependência foi adicionada. Todas as funcionalidades usam as bibliotecas já existentes:
- `@tanstack/react-query` - Gerenciamento de estado
- `react-hook-form` + `zod` - Formulários e validação
- `date-fns` - Manipulação de datas
- `@supabase/supabase-js` - Cliente Supabase

### 🔐 Segurança
- Todas as operações de pagamento são processadas no backend
- Tokens sensíveis nunca são expostos no frontend
- Validação de dados no servidor via Edge Functions
- RLS (Row Level Security) mantido em todas as tabelas

### 📝 Notas de Atualização

Para atualizar de versões anteriores:

1. Execute as novas migrations:
```bash
supabase db push
```

2. Deploy das Edge Functions:
```bash
supabase functions deploy create-payment
supabase functions deploy payment-webhook
```

3. Configure as variáveis de ambiente do Mercado Pago

4. Crie um usuário admin se ainda não tiver

Consulte `CONFIGURACAO.md` para instruções detalhadas.

---

## [1.0.0] - 2024-12-11

### ✨ Versão Inicial

- Sistema de produtos com CRUD
- Painel administrativo
- Autenticação de usuários
- Upload de imagens
- Carrinho de compras
- Layout responsivo
- Integração com Supabase
