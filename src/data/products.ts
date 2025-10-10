import { ProductType } from '@/types';

export const products: ProductType[] = [
  {
    id: '1',
    name: 'Футболка Adidas CoreFit',
    shortDescription: 'Стильная и удобная футболка для повседневной носки.',
    description:
      'Эта футболка изготовлена из высококачественного хлопка, обеспечивающего комфорт в течение всего дня. Идеально подходит для спорта и повседневной носки.',
    price: 39.9,
    sizes: ['s', 'm', 'l', 'xl', 'xxl'],
    colors: ['gray', 'purple', 'green'],
    images: {
      gray: '/products/1g.png',
      purple: '/products/1p.png',
      green: '/products/1gr.png',
    },
    category: 't-shirts',
  },
  {
    id: '2',
    name: 'Куртка Puma Ultra Warm',
    shortDescription: 'Теплая куртка для холодной погоды.',
    description:
      'Современная куртка с утеплением, защищающая от ветра и холода. Отлично подходит для активного отдыха.',
    price: 59.9,
    sizes: ['s', 'm', 'l', 'xl'],
    colors: ['gray', 'green'],
    images: {
      gray: '/products/2g.png',
      green: '/products/2gr.png',
    },
    category: 'jackets',
  },
  {
    id: '3',
    name: 'Толстовка Nike Air Essentials',
    shortDescription: 'Уютная толстовка для комфорта.',
    description:
      'Мягкая и теплая толстовка, которая станет вашим любимым предметом гардероба в прохладную погоду.',
    price: 69.9,
    sizes: ['s', 'm', 'l'],
    colors: ['green', 'blue', 'black'],
    images: {
      green: '/products/3gr.png',
      blue: '/products/3b.png',
      black: '/products/3bl.png',
    },
    category: 'sweatshirts',
  },
  {
    id: '4',
    name: 'Футболка Nike Dri-FIT',
    shortDescription: 'Спортивная футболка с технологией сушки.',
    description:
      'Футболка с технологией Dri-FIT, которая отводит влагу от тела, сохраняя вас сухими во время тренировок.',
    price: 29.9,
    sizes: ['s', 'm', 'l'],
    colors: ['white', 'pink'],
    images: {
      white: '/products/4w.png',
      pink: '/products/4p.png',
    },
    category: 't-shirts',
  },
];
