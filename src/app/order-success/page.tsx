// app/order-success/page.tsx
'use client';

import { CheckCircle, Truck, Mail } from 'lucide-react';
import Link from 'next/link';

const OrderSuccessPage = () => {
  const orderNumber = `#${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Иконка успеха */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Заголовок */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Заказ успешно оформлен!</h1>

          {/* Номер заказа */}
          <p className="text-lg text-gray-600 mb-2">
            Номер вашего заказа: <span className="font-semibold text-gray-900">{orderNumber}</span>
          </p>

          {/* Информация */}
          <p className="text-gray-600 mb-8">
            Подробности заказа и информация о доставке отправлены на вашу электронную почту.
          </p>

          {/* Детали заказа */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Что дальше?</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Подтверждение по email</div>
                  <div className="text-sm text-gray-600">
                    Мы отправили подтверждение заказа на ваш email
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Отслеживание доставки</div>
                  <div className="text-sm text-gray-600">
                    Когда заказ будет отправлен, вы получите номер для отслеживания
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-gray-900">Получение заказа</div>
                  <div className="text-sm text-gray-600">
                    Ожидайте доставки в течение 2-5 рабочих дней
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
              Продолжить покупки
            </Link>

            <Link
              href="/orders"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
              Мои заказы
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
