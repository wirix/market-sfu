// src/stores/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartStoreType, CartStoreItem } from '@/types';

export const useCartStore = create<CartStoreType>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const { cart } = get();
        const existingItemIndex = cart.findIndex(
          (cartItem) =>
            cartItem.product.id === item.product.id &&
            cartItem.selectedSize === item.selectedSize &&
            cartItem.selectedColor === item.selectedColor,
        );

        if (existingItemIndex !== -1) {
          // Увеличиваем количество если товар уже в корзине
          const updatedCart = [...cart];
          updatedCart[existingItemIndex].quantity += item.quantity;
          set({ cart: updatedCart });
        } else {
          // Добавляем новый товар
          const newItem: CartStoreItem = {
            id: Math.random().toString(36).substr(2, 9),
            ...item,
          };
          set({ cart: [...cart, newItem] });
        }
      },

      removeFromCart: (itemId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.id !== itemId) });
      },

      updateQuantity: (itemId, quantity) => {
        const { cart } = get();
        if (quantity < 1) return;

        const updatedCart = cart.map((item) => (item.id === itemId ? { ...item, quantity } : item));
        set({ cart: updatedCart });
      },

      clearCart: () => {
        set({ cart: [] });
      },

      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
