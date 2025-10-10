'use client';

import { ProductType } from '@/types';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* ИЗОБРАЖЕНИЕ ТОВАРА */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3] bg-gray-50">
          <Image
            src={product.images[product.colors[0]]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* ИНФОРМАЦИЯ О ТОВАРЕ */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium text-lg">{product.name}</h1>
        <p className="text-sm text-gray-500 line-clamp-2">{product.shortDescription}</p>

        {/* ВЫБОР РАЗМЕРА */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Размер</span>
            <select className="ring-1 ring-gray-300 rounded-md px-2 py-1 bg-white">
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ЦЕНА И КНОПКА */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-900 cursor-pointer transition-all duration-300">
            <ShoppingCart className="w-4 h-4" />В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
