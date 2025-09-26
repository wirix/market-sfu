import Image from 'next/image';
import Link from 'next/link';
import { Bell, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      <Link href="/" className="flex items-center">
        <p className="hidden md:block text-md font-medium tracking-wider">МАГАЗИН</p>
      </Link>
      <div className="flex items-center gap-6">
        <div>поиск</div>
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />
        <Link href="/login">Войти</Link>
      </div>
    </nav>
  );
};

export default Navbar;
