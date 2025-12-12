# Plano de Desenvolvimento - Brecholaria Vintage

## Análise da Estrutura Atual

### Tecnologias Utilizadas
- **Frontend**: React 19 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Estado**: React Query + Context API
- **Roteamento**: React Router v6

### Funcionalidades Existentes
1. ✅ Sistema de produtos com CRUD completo
2. ✅ Painel administrativo com autenticação
3. ✅ Upload de imagens no Supabase Storage
4. ✅ Carrinho de compras (frontend only)
5. ✅ Tabelas de banco de dados estruturadas
6. ✅ Sistema de roles (admin/user)

## Funcionalidades a Implementar

### 1. Sistema de Checkout Completo
**Prioridade**: Alta

#### Componentes:
- `CheckoutPage.tsx` - Página principal de checkout
- `CheckoutForm.tsx` - Formulário de dados do cliente
- `PaymentMethods.tsx` - Seleção de método de pagamento
- `OrderSummary.tsx` - Resumo do pedido

#### Fluxo:
1. Cliente revisa carrinho
2. Preenche dados pessoais (nome, email, telefone, endereço)
3. Escolhe método de pagamento (PIX, Cartão, Boleto)
4. Confirma pedido
5. Pedido é salvo no banco de dados
6. Redirecionamento para página de confirmação

### 2. Integração com Gateway de Pagamento
**Prioridade**: Alta

#### Opções de Gateway:
- **Mercado Pago** (Recomendado para Brasil)
  - Suporta PIX, Cartão, Boleto
  - API bem documentada
  - Sandbox para testes
  
- **Stripe** (Alternativa internacional)
  - Suporte a cartões
  - Boa documentação

#### Implementação:
1. Criar conta no Mercado Pago
2. Configurar credenciais no Supabase (variáveis de ambiente)
3. Criar Edge Function no Supabase para processar pagamentos
4. Implementar webhooks para atualizar status dos pedidos

### 3. Melhorias no Painel Admin
**Prioridade**: Média

#### Funcionalidades:
- ✅ Upload de fotos (já existe, mas pode ser melhorado)
- 📋 Gerenciamento de pedidos
  - Visualizar todos os pedidos
  - Atualizar status (novo → pago → enviado → concluído)
  - Filtrar por status e data
  - Exportar relatórios
- 📊 Dashboard com estatísticas
  - Vendas do mês
  - Produtos mais vendidos
  - Gráficos de desempenho
- 🖼️ Galeria de imagens melhorada
  - Drag & drop para upload múltiplo
  - Crop e edição básica
  - Organização de imagens

### 4. Funcionalidades Adicionais de E-commerce
**Prioridade**: Baixa

- Sistema de cupons de desconto
- Programa de fidelidade
- Wishlist (lista de desejos)
- Avaliações e comentários de produtos
- Sistema de busca avançada com filtros
- Notificações por email (confirmação de pedido, envio, etc.)

## Estrutura de Arquivos a Criar

```
src/
├── pages/
│   ├── Checkout.tsx (NOVO)
│   └── OrderConfirmation.tsx (NOVO)
├── components/
│   ├── checkout/
│   │   ├── CheckoutForm.tsx (NOVO)
│   │   ├── PaymentMethods.tsx (NOVO)
│   │   └── OrderSummary.tsx (NOVO)
│   └── admin/
│       ├── OrdersTable.tsx (NOVO)
│       ├── OrderDetails.tsx (NOVO)
│       └── ImageUploader.tsx (MELHORAR)
├── hooks/
│   ├── useOrders.tsx (NOVO)
│   └── usePayment.tsx (NOVO)
└── lib/
    └── mercadopago.ts (NOVO)

supabase/
└── functions/
    ├── create-payment/ (NOVO)
    └── payment-webhook/ (NOVO)
```

## Migrations do Banco de Dados

### Tabelas Existentes:
- ✅ `products` - Produtos
- ✅ `orders` - Pedidos
- ✅ `site_settings` - Configurações
- ✅ `user_roles` - Roles de usuários

### Possíveis Melhorias:
- Adicionar tabela `order_items` para normalizar itens do pedido
- Adicionar tabela `payments` para rastrear transações
- Adicionar tabela `coupons` para cupons de desconto

## Ordem de Implementação

### Fase 1: Checkout Básico (Atual)
1. Criar página de checkout
2. Implementar formulário de dados do cliente
3. Salvar pedidos no banco de dados
4. Página de confirmação

### Fase 2: Integração de Pagamento
1. Configurar Mercado Pago
2. Criar Edge Functions no Supabase
3. Implementar fluxo de pagamento PIX
4. Implementar webhooks
5. Atualizar status de pedidos automaticamente

### Fase 3: Melhorias Admin
1. Página de gerenciamento de pedidos
2. Atualização manual de status
3. Visualização de detalhes do pedido
4. Melhorias no upload de imagens

### Fase 4: Funcionalidades Extras
1. Sistema de cupons
2. Notificações por email
3. Dashboard com estatísticas
4. Outras melhorias

## Considerações Técnicas

### Segurança
- Todas as transações de pagamento devem ser processadas no backend (Edge Functions)
- Nunca expor chaves privadas no frontend
- Validar todos os dados no servidor
- Implementar rate limiting

### Performance
- Otimizar imagens antes do upload
- Implementar lazy loading
- Cache de produtos com React Query
- Paginação de pedidos no admin

### UX/UI
- Feedback visual em todas as ações
- Loading states apropriados
- Mensagens de erro claras
- Design responsivo em todas as páginas

## Próximos Passos Imediatos

1. ✅ Criar este documento de planejamento
2. 🔄 Implementar página de checkout
3. 🔄 Criar formulário de dados do cliente
4. 🔄 Salvar pedidos no banco
5. 🔄 Página de confirmação
6. 🔄 Configurar Mercado Pago
7. 🔄 Implementar pagamentos
