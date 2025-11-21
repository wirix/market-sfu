import { z } from 'zod';

// СХЕМЫ ВАЛИДАЦИИ
export const registerSchema = z
  .object({
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
    email: z.string().email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

// ТИПЫ ДАННЫХ
export type ProductType = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartItemType = {
  id: string;
  product: ProductType;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// ТИПЫ ДЛЯ ФОРМ
export type RegisterInputs = z.infer<typeof registerSchema>;
export type LoginInputs = z.infer<typeof loginSchema>;

// ТИПЫ ДЛЯ STORE
export type AuthStoreType = {
  user: UserType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export type CartStoreType = {
  cart: CartItemType[];
  addToCart: (item: Omit<CartItemType, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

// Тип для элемента корзины в store
export type CartStoreItem = {
  id: string;
  product: ProductType;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type AddressType = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  street: string;
  apartment?: string;
  postalCode: string;
  isDefault?: boolean;
};

export const addressSchema = z.object({
  firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().min(10, "Номер телефона должен содержать минимум 10 цифр"),
  country: z.string().min(1, "Выберите страну"),
  city: z.string().min(2, "Город должен содержать минимум 2 символа"),
  street: z.string().min(5, "Улица должна содержать минимум 5 символов"),
  apartment: z.string().optional(),
  postalCode: z.string().min(5, "Почтовый индекс должен содержать минимум 5 символов"),
});

export type AddressInputs = z.infer<typeof addressSchema>;