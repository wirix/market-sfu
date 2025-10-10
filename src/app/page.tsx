// app/page.tsx
import ProductCard from '@/components/ProductCard';
import { ProductType } from '@/types';
import { products as fallbackProducts } from '@/data/products';

async function getProducts(): Promise<ProductType[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await res.json();

    // Если база пустая, используем fallback данные
    if (products.length === 0) {
      console.log('📦 Using fallback products data');
      return fallbackProducts;
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    console.log('📦 Using fallback products due to error');
    return fallbackProducts;
  }
}

const Homepage = async () => {
  const products = await getProducts();

  return (
    <div className="">
      {/* ГЛАВНЫЙ БАННЕР */}
      <div className="relative aspect-[3/1] mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Добро пожаловать в наш магазин</h1>
          <p className="text-xl">Лучшая одежда по доступным ценам</p>
        </div>
      </div>

      {/* СПИСОК ТОВАРОВ */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Популярные товары</h2>
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Товары временно недоступны</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* ВСЕ ТОВАРЫ */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Все товары</h2>
        {products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Товары временно недоступны</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
