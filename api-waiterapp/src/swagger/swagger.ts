import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Waiter App API',
      version: '1.0.0',
      description: 'API para aplicação de garçom - gerenciamento de pedidos, produtos e categorias',
      contact: {
        name: 'API Support',
        email: 'support@waiterapp.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:4001',
        description: 'Servidor de desenvolvimento',
      },
      {
        url: 'https://api.waiterapp.com',
        description: 'Servidor de produção',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT no formato: Bearer {token}',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do usuário',
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            role: {
              type: 'string',
              enum: ['waiter', 'admin', 'restaurant'],
              description: 'Papel do usuário no sistema',
            },
            urlCoverPhoto: {
              type: 'string',
              description: 'URL da foto de perfil',
            },
          },
        },
        Category: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único da categoria',
            },
            name: {
              type: 'string',
              description: 'Nome da categoria',
            },
            icon: {
              type: 'string',
              description: 'Ícone da categoria',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do produto',
            },
            name: {
              type: 'string',
              description: 'Nome do produto',
            },
            description: {
              type: 'string',
              description: 'Descrição do produto',
            },
            imagePath: {
              type: 'string',
              description: 'Caminho da imagem do produto',
            },
            price: {
              type: 'number',
              description: 'Preço do produto',
            },
            ingredients: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome do ingrediente',
                  },
                  icon: {
                    type: 'string',
                    description: 'Ícone do ingrediente',
                  },
                },
              },
            },
            category: {
              $ref: '#/components/schemas/Category',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID único do pedido',
            },
            table: {
              type: 'string',
              description: 'Número da mesa',
            },
            status: {
              type: 'string',
              enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
              description: 'Status do pedido',
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: {
                    $ref: '#/components/schemas/Product',
                  },
                  quantity: {
                    type: 'number',
                    description: 'Quantidade do produto',
                  },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/swagger/routes/*.ts', './src/router/*.ts'], // Caminhos para os arquivos com documentação
}

const specs = swaggerJsdoc(options)

export { specs, swaggerUi }
