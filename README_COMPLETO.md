# 🛍️ Brecholaria Vintage - E-commerce Completo

E-commerce moderno e completo para venda de roupas vintage, com sistema de pagamentos integrado, painel administrativo e muito mais.

![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan)

---

## ✨ Funcionalidades

### 🛒 Frontend (Cliente)

- ✅ **Catálogo de Produtos**
  - Listagem com filtros e busca
  - Visualização detalhada de produtos
  - Imagens em alta qualidade
  - Informações de tamanho e condição

- ✅ **Carrinho de Compras**
  - Adicionar/remover produtos
  - Ajustar quantidades
  - Cálculo automático de totais
  - Persistência no localStorage

- ✅ **Sistema de Checkout Completo**
  - Formulário de dados pessoais
  - Endereço de entrega com busca de CEP automática
  - Validação de formulários com Zod
  - Resumo do pedido em tempo real

- ✅ **Múltiplos Métodos de Pagamento**
  - PIX (com QR Code)
  - Cartão de Crédito (parcelamento)
  - Boleto Bancário
  - Integração com Mercado Pago

- ✅ **Página de Confirmação**
  - Detalhes completos do pedido
  - Status de pagamento em tempo real
  - QR Code para PIX
  - Link para boleto

### 🔐 Painel Administrativo

- ✅ **Autenticação Segura**
  - Login com email e senha
  - Sistema de roles (admin/user)
  - Proteção de rotas

- ✅ **Gerenciamento de Produtos**
  - CRUD completo (Criar, Ler, Atualizar, Deletar)
  - Upload de múltiplas imagens
  - Controle de estoque
  - Produtos em destaque
  - Busca e filtros

- ✅ **Gerenciamento de Pedidos**
  - Visualização de todos os pedidos
  - Detalhes completos de cada pedido
  - Atualização de status
  - Filtros por status e data
  - Informações de pagamento

- ✅ **Dashboard com Estatísticas**
  - Total de produtos
  - Produtos em estoque
  - Produtos esgotados
  - Produtos em destaque

### 🎨 Design e UX

- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Tema moderno com shadcn/ui
- ✅ Animações suaves
- ✅ Loading states
- ✅ Feedback visual (toasts)
- ✅ Acessibilidade (ARIA labels)

---

## 🏗️ Tecnologias Utilizadas

### Frontend
- **React 19.2.3** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router v6** - Roteamento
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **React Query** - Gerenciamento de estado server
- **date-fns** - Manipulação de datas

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL - Banco de dados
  - Auth - Autenticação
  - Storage - Armazenamento de imagens
  - Edge Functions - Serverless functions
  - Row Level Security (RLS)

### Pagamentos
- **Mercado Pago** - Gateway de pagamento
  - PIX
  - Cartão de Crédito
  - Boleto Bancário
  - Webhooks para atualização automática

---

## 📁 Estrutura do Projeto

```
brecholaria-vintage/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminTutorial.tsx
│   │   │   ├── OrderDetails.tsx
│   │   │   ├── OrdersTable.tsx
│   │   │   └── ProductFormDialog.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   └── PaymentMethods.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Layout.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductGrid.tsx
│   │   └── ui/
│   │       └── ... (shadcn components)
│   ├── contexts/
│   │   └── CartContext.tsx
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useOrders.tsx
│   │   ├── usePayment.tsx
│   │   └── useProducts.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/
│   │   ├── mercadopago.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Admin.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Contact.tsx
│   │   ├── Index.tsx
│   │   ├── OrderConfirmation.tsx
│   │   ├── ProductDetail.tsx
│   │   └── Products.tsx
│   └── App.tsx
├── supabase/
│   ├── functions/
│   │   ├── create-payment/
│   │   │   └── index.ts
│   │   └── payment-webhook/
│   │       └── index.ts
│   └── migrations/
│       ├── 20251212121513_ac1ca8b7-7d0c-4deb-a3d3-67972cfff052.sql
│       └── 20251212150000_add_payment_fields.sql
├── CONFIGURACAO.md
├── PLANO_DESENVOLVIMENTO.md
└── package.json
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ ou Bun 1.3+
- Conta no Supabase
- Conta no Mercado Pago (opcional para testes)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/gabxw/brecholaria-vintage.git
cd brecholaria-vintage
```

2. **Instale as dependências**
```bash
npm install
# ou
bun install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local`:
```bash
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
VITE_MERCADOPAGO_PUBLIC_KEY=sua_chave_mp (opcional)
```

4. **Execute o projeto**
```bash
npm run dev
# ou
bun run dev
```

5. **Acesse no navegador**
```
http://localhost:5173
```

---

## 🔧 Configuração Completa

Para configurar o projeto em produção com banco de dados, pagamentos e deploy, consulte o arquivo **[CONFIGURACAO.md](./CONFIGURACAO.md)** que contém:

- Configuração do Supabase
- Configuração do Mercado Pago
- Deploy das Edge Functions
- Execução das Migrations
- Criação de usuário admin
- Deploy do frontend
- Testes completos

---

## 📊 Banco de Dados

### Tabelas

- **products** - Produtos da loja
- **orders** - Pedidos dos clientes
- **user_roles** - Roles de usuários (admin/user)
- **site_settings** - Configurações do site

### Storage

- **products** - Bucket para imagens de produtos

### Edge Functions

- **create-payment** - Cria pagamentos no Mercado Pago
- **payment-webhook** - Recebe notificações de pagamento

---

## 🔐 Segurança

- ✅ Row Level Security (RLS) habilitado em todas as tabelas
- ✅ Políticas de acesso configuradas
- ✅ Autenticação via Supabase Auth
- ✅ Tokens de pagamento processados apenas no backend
- ✅ Validação de dados no servidor
- ✅ HTTPS obrigatório em produção

---

## 🎯 Roadmap

### Próximas Funcionalidades

- [ ] Sistema de cupons de desconto
- [ ] Programa de fidelidade
- [ ] Wishlist (lista de desejos)
- [ ] Avaliações e comentários
- [ ] Notificações por email
- [ ] Chat de suporte
- [ ] Rastreamento de pedidos
- [ ] Relatórios e analytics
- [ ] Exportação de dados
- [ ] Multi-idioma

---

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Lint do código

# Supabase
supabase start       # Inicia Supabase local
supabase db push     # Aplica migrations
supabase functions deploy  # Deploy das functions
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Gabriel**
- GitHub: [@gabxw](https://github.com/gabxw)

---

## 🙏 Agradecimentos

- [Supabase](https://supabase.com) - Backend incrível
- [Mercado Pago](https://mercadopago.com.br) - Gateway de pagamento
- [shadcn/ui](https://ui.shadcn.com) - Componentes UI
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS
- [Lucide Icons](https://lucide.dev) - Ícones

---

## 📞 Suporte

Se tiver dúvidas ou problemas:

1. Consulte a [documentação de configuração](./CONFIGURACAO.md)
2. Abra uma [issue](https://github.com/gabxw/brecholaria-vintage/issues)
3. Entre em contato

---

**Desenvolvido com ❤️ para a comunidade vintage**
