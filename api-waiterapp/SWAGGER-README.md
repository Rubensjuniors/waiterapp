# Waiter App API - Documentação Swagger

Este projeto agora inclui documentação completa da API usando Swagger/OpenAPI 3.0.

### 1. Executar a Aplicação

```bash
# Iniciar MongoDB
yarn run docker:compose

# Executar em modo desenvolvimento
yarn run dev
```

### 2. Acessar Documentação

Após iniciar a aplicação, acesse:

- **Swagger UI**: http://localhost:4001/api-docs
- **API Base URL**: http://localhost:4001

## 📚 Documentação da API

### Endpoints Principais

#### 🔐 Autenticação

- `POST /auth/signup` - Registrar novo usuário
- `POST /auth/signin` - Fazer login
- `PATCH /auth/refresh` - Renovar token
- `POST /auth/logout` - Fazer logout

#### 🏷️ Categorias

- `GET /categories` - Listar categorias
- `POST /categories` - Criar categoria (requer auth)
- `DELETE /categories/:id` - Deletar categoria (requer auth)
- `GET /categories/:id/products` - Produtos por categoria

#### 🍕 Produtos

- `GET /products` - Listar produtos
- `POST /products` - Criar produto (requer auth + upload)
- `DELETE /products/:id` - Deletar produto (requer auth)

#### 📋 Pedidos

- `GET /orders` - Listar pedidos
- `GET /orders/:table` - Pedidos por mesa
- `POST /orders` - Criar pedido
- `PATCH /orders/:id` - Atualizar status
- `DELETE /orders/:id` - Deletar pedido

### 🔑 Autenticação

A API usa **JWT Bearer Token** para autenticação:

```
Authorization: Bearer <seu_token_aqui>
```

### 📝 Schemas

A documentação inclui schemas detalhados para:

- **User** - Usuários do sistema
- **Category** - Categorias de produtos
- **Product** - Produtos do cardápio
- **Order** - Pedidos dos clientes
- **Error** - Respostas de erro

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Executar com hot reload
npm run docs         # Info sobre documentação
npm run lint         # Corrigir código

# Produção
npm run build        # Construir aplicação
npm run start        # Executar em produção

# Testes
npm run test         # Executar testes
npm run test:watch   # Executar testes em watch mode

# Docker/MongoDB
npm run docker:compose   # Iniciar via docker-compose

```
