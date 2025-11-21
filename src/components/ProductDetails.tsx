// components/ProductDetails.tsx
'use client';

import { ProductType } from '@/types';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';

interface ProductDetailsProps {
  product: ProductType;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[product.colors[0]]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleColorChange = (color: string) => {
    if (color === selectedColor) return;

    setIsImageLoading(true);
    setSelectedColor(color);
    setActiveImage(product.images[color]);

    // Имитация загрузки для анимации
    setTimeout(() => setIsImageLoading(false), 300);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      // Имитация задержки для лучшего UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      addToCart({
        product,
        quantity,
        selectedSize,
        selectedColor,
      });

      toast.success(
        <div className="flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          <span>Товар {product.name} добавлен в корзину!</span>
        </div>,
        {
          icon: false,
        },
      );
    } catch (error) {
      toast.error('Ошибка при добавлении товара в корзину');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    // TODO: Перенаправление на страницу оформления заказа
    // router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Ссылка скопирована в буфер обмена!');
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">
            Главная
          </Link>
          <span>›</span>
          <Link href="/products" className="hover:text-gray-700">
            Товары
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ */}
            <div className="space-y-4">
              {/* Основное изображение */}
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isImageLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}>
                  <Image
                    src={activeImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
                  </div>
                )}

                {/* Бейджы */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Новинка
                  </span>
                </div>

                {/* Кнопки действий */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Миниатюры цветов */}
              {product.colors.length > 1 && (
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm font-medium text-gray-700 w-full">Доступные цвета:</span>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className={`relative group rounded-lg border-2 p-1 transition-all duration-300 ${
                        selectedColor === color
                          ? 'border-gray-800 scale-105 shadow-md'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}>
                      <div
                        className="w-12 h-12 rounded-md transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                      {selectedColor === color && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-white" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ИНФОРМАЦИЯ О ТОВАРЕ */}
            <div className="space-y-6">
              {/* Заголовок и цена */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-lg text-gray-600">{product.shortDescription}</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-lg text-green-600 font-medium">В наличии</span>
                </div>
              </div>

              {/* Выбор размера */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Размер:</span>
                  <span className="text-sm text-gray-500">Таблица размеров</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-gray-800 bg-gray-800 text-white shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-md'
                      }`}>
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Выбор цвета (дублируем для удобства) */}
              {product.colors.length > 1 && (
                <div className="space-y-3">
                  <span className="text-sm font-medium text-gray-700">Цвет:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        className={`relative group rounded-full p-1 border-2 transition-all duration-200 ${
                          selectedColor === color
                            ? 'border-gray-800 scale-110'
                            : 'border-gray-200 hover:border-gray-400'
                        }`}
                        title={color.charAt(0).toUpperCase() + color.slice(1)}>
                        <div
                          className="w-8 h-8 rounded-full transition-transform duration-200 group-hover:scale-110"
                          style={{ backgroundColor: color }}
                        />
                        {selectedColor === color && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Количество и кнопка добавления */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Количество:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      -
                    </button>
                    <span className="px-4 py-2 min-w-12 text-center font-medium bg-gray-50">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="px-4 py-2 hover:bg-gray-100 transition-colors">
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl hover:bg-gray-800 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                    {isAddingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Добавляем...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        <span>В корзину</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={isAddingToCart}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 font-medium text-lg shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed">
                    Купить сейчас
                  </button>
                </div>

                <Link
                  href="/cart"
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                  <ShoppingCart className="w-5 h-5" />
                  Перейти в корзину
                </Link>
              </div>

              {/* Преимущества */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Бесплатная доставка</div>
                    <div className="text-xs text-gray-500">от $100</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Гарантия качества</div>
                    <div className="text-xs text-gray-500">1 год</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Возврат</div>
                    <div className="text-xs text-gray-500">30 дней</div>
                  </div>
                </div>
              </div>

              {/* Полное описание */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Описание товара</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Характеристики */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Характеристики</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Категория:</span>
                      <span className="font-medium capitalize">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Доступные цвета:</span>
                      <span className="font-medium capitalize">{product.colors.join(', ')}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Размеры:</span>
                      <span className="font-medium">{product.sizes.join(', ').toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Артикул:</span>
                      <span className="font-medium">{product.id.slice(-8)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Информация о доставке */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <div className="text-sm">
                    <div className="font-medium text-blue-900">Бесплатная доставка</div>
                    <div className="text-blue-700">
                      Заказ будет доставлен в течение 2-5 рабочих дней
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Похожие товары */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">С этим товаром покупают</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center py-8 text-gray-500 bg-white rounded-2xl shadow-lg">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <div>Похожие товары</div>
              <div className="text-sm text-gray-400">скоро появятся</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
