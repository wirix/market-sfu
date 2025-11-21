// app/products/[id]/page.tsx
import { notFound } from 'next/navigation';
import { ProductType } from '@/types';
import ProductDetails from '@/components/ProductDetails';
import { prisma } from '../../../../lib/prisma';

// Генерируем метаданные для SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return {
        title: 'Товар не найден',
      };
    }

    return {
      title: `${product.name} - Магазин одежды`,
      description: product.shortDescription,
      openGraph: {
        title: product.name,
        description: product.shortDescription,
        images: [Object.values(product.images)[0]],
      },
    };
  } catch (error) {
    return {
      title: 'Товар',
    };
  }
}

// Получаем данные товара
async function getProduct(id: string): Promise<ProductType | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      sizes: product.sizes as string[],
      colors: product.colors as string[],
      images: product.images as Record<string, string>,
      category: product.category,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Генерируем статические параметры (опционально)
export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({
      select: { id: true },
    });

    return products.map((product) => ({
      id: product.id,
    }));
  } catch (error) {
    return [];
  }
}

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
};

export default ProductPage;
