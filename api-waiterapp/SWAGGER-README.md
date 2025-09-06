# Waiter App API - Documentação Swagger

Este projeto agora inclui documentação completa da API usando Swagger/OpenAPI 3.0.

## 🚀 Configuração Rápida

### 1. Configurar Node.js 22

Certifique-se de ter o Node.js 22 instalado. O arquivo `.nvmrc` especifica a versão 22.

#### Linux/macOS:

```bash
# Execute o script de configuração
chmod +x setup-swagger.sh
./setup-swagger.sh
```

#### Windows (PowerShell):

```powershell
# Execute o script de configuração
.\setup-swagger.ps1
```

#### Manual:

```bash
# Instalar dependências do Swagger
npm install swagger-jsdoc swagger-ui-express
npm install --save-dev @types/swagger-jsdoc @types/swagger-ui-express
```

### 2. Executar a Aplicação

```bash
# Iniciar MongoDB
npm run docker:start

# Executar em modo desenvolvimento
npm run dev
```

### 3. Acessar Documentação

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
npm run docker:start     # Iniciar MongoDB existente
npm run docker:download  # Baixar e criar container MongoDB
npm run docker:compose   # Iniciar via docker-compose

# Utilitários
npm run create-super-admin  # Criar admin inicial
npm run setup:swagger       # Configurar Swagger (Linux/macOS)
```

## 🎯 Recursos do Swagger

- **Interface interativa** para testar endpoints
- **Autenticação JWT** integrada
- **Schemas detalhados** de request/response
- **Upload de arquivos** documentado
- **Códigos de erro** com exemplos
- **Filtragem por tags** (Auth, Categorias, Produtos, Pedidos)

## 📁 Estrutura da Documentação

```
src/swagger/
├── swagger.ts              # Configuração principal
└── routes/
    ├── auth.ts            # Docs de autenticação
    ├── categories.ts      # Docs de categorias
    ├── products.ts        # Docs de produtos
    └── orders.ts          # Docs de pedidos
```

## 🔧 Personalização

Para personalizar a documentação:

1. Edite `src/swagger/swagger.ts` para alterar configurações gerais
2. Modifique arquivos em `src/swagger/routes/` para ajustar endpoints específicos
3. Adicione novos schemas no objeto `components.schemas`

## 🌐 Deploy

A documentação será automaticamente disponibilizada em produção no mesmo endpoint `/api-docs`.

## 🆘 Troubleshooting

### Erro: Cannot find module 'swagger-jsdoc'

```bash
npm install swagger-jsdoc swagger-ui-express
```

### Erro: Node.js version

Certifique-se de usar Node.js 22:

```bash
nvm use 22  # ou nvm use
```

### Swagger não carrega

1. Verifique se as dependências estão instaladas
2. Confirme se o servidor está rodando na porta 4001
3. Acesse http://localhost:4001/api-docs diretamente
