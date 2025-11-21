// app/checkout/page.tsx
'use client';

import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { AddressType } from '@/types';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AddressStep from './AddressStep';
import PaymentStep from './PaymentStep';
import ReviewStep from './ReviewStep';

// Временные данные адресов
const mockAddresses: AddressType[] = [
  {
    id: '1',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    country: 'Россия',
    city: 'Москва',
    street: 'ул. Тверская, д. 15',
    apartment: 'кв. 42',
    postalCode: '125009',
    isDefault: true,
  },
  {
    id: '2',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    country: 'Россия',
    city: 'Санкт-Петербург',
    street: 'Невский проспект, д. 100',
    postalCode: '191186',
    isDefault: false,
  },
];

type CheckoutStep = 'address' | 'payment' | 'review';

const CheckoutPage = () => {
  const { cart, getTotalPrice, getTotalItems } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(mockAddresses[0]);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { id: 'address' as const, title: 'Адрес доставки', number: 1 },
    { id: 'payment' as const, title: 'Оплата', number: 2 },
    { id: 'review' as const, title: 'Подтверждение', number: 3 },
  ];

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingCost;

  const handleNextStep = () => {
    if (currentStep === 'address') {
      if (!selectedAddress) {
        alert('Пожалуйста, выберите адрес доставки');
        return;
      }
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'payment') {
      setCurrentStep('address');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Корзина пуста</h1>
            <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ.</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              Перейти к товарам
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Оформление заказа</h1>

          {/* Индикатор шагов */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  {/* Шаг */}
                  <div
                    className={`flex flex-col items-center ${
                      steps.findIndex((s) => s.id === currentStep) >= index
                        ? 'text-blue-600'
                        : 'text-gray-400'
                    }`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                        steps.findIndex((s) => s.id === currentStep) > index
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : steps.findIndex((s) => s.id === currentStep) === index
                          ? 'border-blue-600 text-blue-600'
                          : 'border-gray-300 text-gray-400'
                      }`}>
                      {steps.findIndex((s) => s.id === currentStep) > index ? '✓' : step.number}
                    </div>
                    <span className="text-xs mt-2 font-medium hidden sm:block">{step.title}</span>
                  </div>

                  {/* Разделитель */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 ${
                        steps.findIndex((s) => s.id === currentStep) > index
                          ? 'bg-blue-600'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2 space-y-6">
            {/* Шаг 1: Адрес доставки */}
            {currentStep === 'address' && (
              <AddressStep
                addresses={mockAddresses}
                selectedAddress={selectedAddress}
                onSelectAddress={setSelectedAddress}
                onNextStep={handleNextStep}
              />
            )}

            {/* Шаг 2: Оплата */}
            {currentStep === 'payment' && (
              <PaymentStep onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
            )}

            {/* Шаг 3: Подтверждение */}
            {currentStep === 'review' && (
              <ReviewStep
                selectedAddress={selectedAddress}
                onPrevStep={handlePrevStep}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Боковая панель с итогами */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ваш заказ</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[item.selectedColor]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize.toUpperCase()}, {item.selectedColor}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Подытог</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Бесплатно' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                {subtotal < 100 && (
                  <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg">
                    🎉 Добавьте товаров на ${(100 - subtotal).toFixed(2)} для бесплатной доставки!
                  </div>
                )}

                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                  <span>Итого</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Информация о безопасности */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Безопасная оплата</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>SSL шифрование</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Гарантия возврата</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Защита покупателя</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
