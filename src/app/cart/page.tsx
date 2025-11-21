// app/cart/page.tsx
'use client';

import { useCartStore } from '@/stores/cartStore';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } =
    useCartStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleCheckout = () => {
    // TODO: Реализовать процесс оформления заказа
    router.push('/checkout');
  };

  const shippingCost = 10;
  const discount = 0; // Можно добавить логику скидок
  const totalPrice = getTotalPrice();
  const finalTotal = totalPrice + shippingCost - discount;

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Ваша корзина пуста</h1>
            <p className="text-gray-600 mb-8">
              Добавьте товары в корзину, чтобы продолжить покупки.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-5 h-5 mr-2" />
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина покупок</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium transition-colors">
            Очистить корзину
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Список товаров */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Изображение товара */}
                  <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.images[item.selectedColor]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Информация о товаре */}
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            Цвет: <strong className="capitalize">{item.selectedColor}</strong>
                          </span>
                          <span>
                            Размер: <strong>{item.selectedSize.toUpperCase()}</strong>
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          ${item.product.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Кнопка удаления */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Управление количеством */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                          disabled={item.quantity <= 1}>
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100 transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Итоговая информация */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Итог заказа</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Товары ({getTotalItems()} шт.)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-medium">${shippingCost.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Скидка</span>
                    <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-gray-900 text-white py-4 px-6 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 font-medium text-lg">
                <ShoppingBag className="w-6 h-6" />
                Оформить заказ
              </button>

              <Link
                href="/"
                className="w-full mt-4 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                <ArrowRight className="w-5 h-5" />
                Продолжить покупки
              </Link>
            </div>

            {/* Дополнительная информация */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Преимущества</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Бесплатная доставка от $100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Возврат в течение 30 дней</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Безопасная оплата</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендуемые товары */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Вам может понравиться</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center py-8 text-gray-500 bg-white rounded-2xl">
              Рекомендуемые товары появятся здесь
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
