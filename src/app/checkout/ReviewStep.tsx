// components/checkout/ReviewStep.tsx
'use client';

import { AddressType } from '@/types';
import { Shield, ArrowLeft, CheckCircle, CreditCard, Truck } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface ReviewStepProps {
  selectedAddress: AddressType | null;
  onPrevStep: () => void;
  isLoading: boolean;
}

const ReviewStep = ({ selectedAddress, onPrevStep, isLoading }: ReviewStepProps) => {
  const { cart, getTotalPrice, getTotalItems, clearCart } = useCartStore();
  const router = useRouter();

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = async () => {
    // Имитация процесса оформления заказа
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Очищаем корзину после успешного заказа
    clearCart();

    toast.success('Заказ успешно оформлен!');

    // Перенаправляем на страницу успеха
    router.push('/order-success');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Shield className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Подтверждение заказа</h2>
          <p className="text-gray-600">Проверьте информацию перед оформлением</p>
        </div>
      </div>

      {/* Информация о заказе */}
      <div className="space-y-6 mb-6">
        {/* Адрес доставки */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            Адрес доставки
          </h3>
          {selectedAddress && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="font-medium">
                {selectedAddress.firstName} {selectedAddress.lastName}
              </p>
              <p className="text-gray-600">
                {selectedAddress.street}
                {selectedAddress.apartment && `, ${selectedAddress.apartment}`}
              </p>
              <p className="text-gray-600">
                {selectedAddress.city}, {selectedAddress.country}, {selectedAddress.postalCode}
              </p>
              <p className="text-gray-500">{selectedAddress.phone}</p>
            </div>
          )}
        </div>

        {/* Способ оплаты */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            Способ оплаты
          </h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-medium">Банковская карта</p>
            <p className="text-gray-600">Оплата онлайн</p>
          </div>
        </div>

        {/* Товары */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Товары в заказе</h3>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[item.selectedColor]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">
                    Размер: {item.selectedSize.toUpperCase()}, Цвет: {item.selectedColor}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Итоговая стоимость */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Товары ({getTotalItems()} шт.)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Доставка</span>
              <span>{shippingCost === 0 ? 'Бесплатно' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span>Итого</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="flex gap-3">
        <button
          onClick={onPrevStep}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="flex-1" />

        <button
          onClick={handlePlaceOrder}
          disabled={isLoading}
          className="bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Оформляем...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Подтвердить заказ</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
