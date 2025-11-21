// components/Navbar.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { LogOut, User, Bell, Home, Settings, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ShoppingCartIcon from './ShoppingCartIcon';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      <Link href="/" className="flex items-center">
        <p className="hidden md:block text-md font-medium tracking-wider">МАГАЗИН</p>
      </Link>
      <div className="flex items-center gap-6">
        <div>Поиск</div>
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600" />
        </Link>
        <Bell className="w-4 h-4 text-gray-600" />
        <ShoppingCartIcon />
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
              <Settings className="w-4 h-4" />
              Профиль
            </Link>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm">{session.user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
              <LogOut className="w-4 h-4" />
              Выйти
            </button>
            <Link
              href="/addresses"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800">
              <MapPin className="w-4 h-4" />
              Мои адреса
            </Link>
          </div>
        ) : (
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-800">
            Войти
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
