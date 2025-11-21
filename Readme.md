# Swagger Documentation для Backend API

## 📖 Обзор

В проекте реализована автоматическая документация API с использованием Swagger (OpenAPI 3.0). Документация предоставляет полное описание всех endpoints, параметров, схем данных и позволяет интерактивно тестировать API.

## 🚀 Быстрый старт

### Доступ к документации

**Локальная разработка:**
http://localhost:3000/api-docs

## 🛠️ Установка и настройка

### Предварительные требования

- Node.js 18+
- Next.js 14+
- Установленные зависимости проекта

### Зависимости

```bash
npm install swagger-jsdoc swagger-ui-express
npm install -D @types/swagger-jsdoc @types/swagger-ui-express
```

📚 Использование документации
Просмотр API endpoints
Откройте страницу документации в браузере

Разверните категорию (Products, Users, Authentication и т.д.)

Выберите endpoint для просмотра деталей

Интерактивное тестирование
Нажмите "Try it out" для любого endpoint

Заполните параметры:

Path parameters (в URL)

Query parameters

Body parameters (для POST/PUT запросов)

Нажмите "Execute" для отправки запроса

Просмотрите ответ с кодом статуса и телом

Авторизация в Swagger
Для защищенных endpoints:

Нажмите кнопку "Authorize" вверху страницы

Введите JWT токен: Bearer ваш-jwt-токен

Нажмите "Authorize"

Закройте модальное окно

📋 Доступные разделы API
🔐 Authentication
POST /api/auth/register - Регистрация пользователя

POST /api/auth/login - Вход в систему

POST /api/auth/logout - Выход из системы

👥 Users
GET /api/auth/profile - Получить профиль

PUT /api/auth/profile - Обновить профиль

DELETE /api/auth/profile - Удалить аккаунт

🛍️ Products
GET /api/products - Список товаров (с фильтрацией)

GET /api/products/{id} - Товар по ID

🛒 Cart
GET /api/cart - Получить корзину

POST /api/cart - Добавить в корзину

PUT /api/cart/{id} - Обновить корзину

DELETE /api/cart/{id} - Удалить из корзины

📦 Orders
POST /api/orders - Создать заказ

GET /api/orders - История заказов

GET /api/orders/{id} - Детали заказа


✍️ Добавление новой документации
Для нового endpoint
Добавьте JSDoc комментарии в файл route:
```bash
 * @swagger
 * /api/your-endpoint:
 *   post:
 *     summary: Создание ресурса
 *     description: Подробное описание функциональности
 *     tags:
 *       - CategoryName
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/YourSchema'
 *     responses:
 *       201:
 *         description: Ресурс создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSchema'
 *       400:
 *         description: Ошибка валидации
 */
```
 Параметры запроса
Path parameters:
```bash
 * @swagger
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 */
```
 Query parameters:
```bash
 * @swagger
 * parameters:
 *   - in: query
 *     name: category
 *     schema:
 *       type: string
 *     description: Фильтр по категории
 */
```

 Для новой схемы данных
Добавьте в lib/swagger.ts:
```bash
components: {
  schemas: {
    YourSchema: {
      type: 'object',
      required: ['field1', 'field2'],
      properties: {
        field1: {
          type: 'string',
          description: 'Описание поля',
          example: 'example value'
        },
        field2: {
          type: 'number',
          format: 'float',
          minimum: 0
        }
      }
    }
  }
}

```
