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
