import Link from 'next/link';

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <p className="hidden md:block text-md font-medium tracking-wider text-white">МАГАЗИН</p>
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Ссылки</p>
        <Link href="/">Главная</Link>
        <Link href="/">Котнакты</Link>
        <Link href="/">Условия обслуживания</Link>
        <Link href="/">Политика конфиденциальности</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Ссылки</p>
        <Link href="/">Все товары</Link>
        <Link href="/">Новые</Link>
        <Link href="/">Лучшие</Link>
        <Link href="/">Скидки</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Ссылки</p>
        <Link href="/">О нас</Link>
        <Link href="/">Блог</Link>
        <Link href="/">Партнеры</Link>
      </div>
    </div>
  );
};

export default Footer;
