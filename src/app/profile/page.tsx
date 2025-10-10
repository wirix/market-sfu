// app/profile/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type UserProfile = {
  name: string;
  email: string;
};

const ProfilePage = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserProfile>({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (session?.user) {
      setUserData({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [session]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      // Обновляем сессию с проверкой на существование session
      if (session) {
        await update({
          ...session,
          user: {
            ...session.user,
            name: userData.name,
            email: userData.email,
          },
        });
      }

      toast.success('Профиль успешно обновлен!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка при обновлении профиля');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm('Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.')) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      toast.success('Аккаунт успешно удален');
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Ошибка при удалении аккаунта');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Доступ запрещен</h1>
          <p>Пожалуйста, войдите в систему чтобы просмотреть профиль.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Мой профиль</h1>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
              {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={isLoading}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
              Удалить аккаунт
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Информация о сессии</h2>
          <p>
            <strong>ID пользователя:</strong> {session.user.id || 'Не указан'}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email || 'Не указан'}
          </p>
          <p>
            <strong>Имя:</strong> {session.user.name || 'Не указано'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
