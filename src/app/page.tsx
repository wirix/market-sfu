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
      <div className="relative aspect-[3/1] mb-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center overflow-hidden">
        <div className="text-center text-white space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold animate-slide-in">
            Добро пожаловать в наш магазин
          </h1>
          <p
            className="text-xl md:text-2xl opacity-90 animate-slide-in"
            style={{ animationDelay: '0.1s' }}>
            Лучшая одежда по доступным ценам
          </p>
        </div>
      </div>

      {/* СПИСОК ТОВАРОВ */}
      <div className="space-y-8">
        <section className="animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Популярные товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="animate-slide-in" style={{ animationDelay: '0.6s' }}>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Все товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="animate-slide-in"
                style={{ animationDelay: `${0.7 + index * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
