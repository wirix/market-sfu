// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    // Пробуем посчитать количество товаров
    const productCount = await prisma.product.count();
    const userCount = await prisma.user.count();

    return NextResponse.json({
      success: true,
      productCount,
      userCount,
      message: 'База данных подключена успешно',
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Ошибка подключения к базе данных',
      },
      { status: 500 },
    );
  }
}
