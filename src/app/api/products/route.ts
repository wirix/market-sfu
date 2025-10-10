// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    console.log('📦 Fetching products from database...');

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(`✅ Found ${products.length} products`);

    return NextResponse.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return NextResponse.json({ message: 'Ошибка при получении товаров' }, { status: 500 });
  }
}
