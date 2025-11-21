// components/ProductCard.tsx (добавить функциональность корзины)
'use client';

import { ProductType } from '@/types';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'react-toastify';

const ProductCard = ({ product }: { product: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.images[product.colors[0]]);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleColorChange = (color: string) => {
    if (color === selectedColor) return;

    setIsImageLoading(true);
    setSelectedColor(color);
    setCurrentImage(product.images[color]);

    setTimeout(() => setIsImageLoading(false), 300);
  };

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity: 1,
      selectedSize,
      selectedColor,
    });

    toast.success(`Товар "${product.name}" добавлен в корзину!`);
  };

  return (
    <div className="group shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Изображение товара */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3] bg-gray-50 overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isImageLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}>
            <Image
              src={currentImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </div>
          )}
        </div>
      </Link>

      {/* Информация о товаре */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium text-lg group-hover:text-gray-700 transition-colors duration-300">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500 line-clamp-2">{product.shortDescription}</p>

        {/* Выбор размера */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Размер</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="ring-1 ring-gray-300 rounded-md px-2 py-1 bg-white">
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Выбор цвета */}
        {product.colors.length > 1 && (
          <div className="flex flex-col gap-2 text-xs">
            <span className="text-gray-500">Цвет</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`relative cursor-pointer border-2 rounded-full p-1 transition-all duration-200 ${
                    selectedColor === color
                      ? 'border-gray-600 scale-110'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Цена и кнопка */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900 cursor-pointer transition-all duration-300 hover:scale-105">
            <ShoppingCart className="w-4 h-4" />В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
