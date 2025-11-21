// lib/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API Documentation',
      version: '1.0.0',
      description: 'Документация API для интернет-магазина одежды',
      contact: {
        name: 'API Support',
        email: 'support@merket.com',
      },
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // User Schemas
        User: {
          type: 'object',
          required: ['id', 'email', 'name'],
          properties: {
            id: {
              type: 'string',
              description: 'Уникальный идентификатор пользователя',
              example: '507f1f77bcf86cd799439011',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email пользователя',
              example: 'user@example.com',
            },
            name: {
              type: 'string',
              description: 'Имя пользователя',
              example: 'Иван Иванов',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Дата создания',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Дата обновления',
            },
          },
        },

        // Product Schemas
        Product: {
          type: 'object',
          required: ['id', 'name', 'price', 'category'],
          properties: {
            id: {
              type: 'string',
              description: 'Уникальный идентификатор товара',
              example: '507f1f77bcf86cd799439012',
            },
            name: {
              type: 'string',
              description: 'Название товара',
              example: 'Футболка Adidas CoreFit',
            },
            description: {
              type: 'string',
              description: 'Полное описание товара',
            },
            shortDescription: {
              type: 'string',
              description: 'Краткое описание товара',
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Цена товара',
              example: 39.9,
            },
            sizes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Доступные размеры',
              example: ['s', 'm', 'l', 'xl'],
            },
            colors: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Доступные цвета',
              example: ['gray', 'purple', 'green'],
            },
            images: {
              type: 'object',
              additionalProperties: {
                type: 'string',
              },
              description: 'Изображения товара по цветам',
            },
            category: {
              type: 'string',
              description: 'Категория товара',
              example: 't-shirts',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },

        // Cart Item Schemas
        CartItem: {
          type: 'object',
          required: ['id', 'product', 'quantity', 'selectedSize', 'selectedColor'],
          properties: {
            id: {
              type: 'string',
              description: 'Уникальный идентификатор элемента корзины',
            },
            product: {
              $ref: '#/components/schemas/Product',
            },
            quantity: {
              type: 'integer',
              description: 'Количество товара',
              minimum: 1,
              example: 2,
            },
            selectedSize: {
              type: 'string',
              description: 'Выбранный размер',
              example: 'm',
            },
            selectedColor: {
              type: 'string',
              description: 'Выбранный цвет',
              example: 'gray',
            },
          },
        },

        // Address Schemas
        Address: {
          type: 'object',
          required: [
            'firstName',
            'lastName',
            'email',
            'phone',
            'country',
            'city',
            'street',
            'postalCode',
          ],
          properties: {
            id: {
              type: 'string',
              description: 'Уникальный идентификатор адреса',
            },
            firstName: {
              type: 'string',
              description: 'Имя',
              example: 'Иван',
            },
            lastName: {
              type: 'string',
              description: 'Фамилия',
              example: 'Иванов',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email',
              example: 'ivan@example.com',
            },
            phone: {
              type: 'string',
              description: 'Номер телефона',
              example: '+7 (999) 123-45-67',
            },
            country: {
              type: 'string',
              description: 'Страна',
              example: 'Россия',
            },
            city: {
              type: 'string',
              description: 'Город',
              example: 'Москва',
            },
            street: {
              type: 'string',
              description: 'Улица и дом',
              example: 'ул. Тверская, д. 15',
            },
            apartment: {
              type: 'string',
              description: 'Квартира/офис',
              example: 'кв. 42',
            },
            postalCode: {
              type: 'string',
              description: 'Почтовый индекс',
              example: '125009',
            },
            isDefault: {
              type: 'boolean',
              description: 'Основной адрес',
              example: true,
            },
          },
        },

        // Error Schemas
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Сообщение об ошибке',
            },
            error: {
              type: 'string',
              description: 'Тип ошибки',
            },
          },
        },

        // Auth Schemas
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123',
            },
          },
        },

        RegisterRequest: {
          type: 'object',
          required: ['name', 'email', 'password', 'confirmPassword'],
          properties: {
            name: {
              type: 'string',
              example: 'Иван Иванов',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'password123',
            },
            confirmPassword: {
              type: 'string',
              format: 'password',
              example: 'password123',
            },
          },
        },

        // Response Schemas
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
            },
            message: {
              type: 'string',
            },
            data: {
              type: 'object',
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
  apis: ['./app/api/**/route.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
