// components/ShoppingCartIcon.tsx
'use client';

import { useCartStore } from '@/stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ShoppingCartIcon = () => {
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Link href="/cart" className="relative">
        <ShoppingCart className="w-5 h-5 text-gray-600" />
      </Link>
    );
  }

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-5 h-5 text-gray-600" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default ShoppingCartIcon;
