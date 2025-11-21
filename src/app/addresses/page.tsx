// app/addresses/page.tsx
'use client';

import { useState } from 'react';
import { AddressInputs, AddressType } from '@/types';
import { MapPin, Plus } from 'lucide-react';
import AddressList from '@/components/AddressList';
import AddressModal from '@/components/AddressModal';
import { toast } from 'react-toastify';

// Временные данные (в реальном приложении будут из API)
const mockAddresses: AddressType[] = [
  {
    id: '1',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    country: 'Россия',
    city: 'Москва',
    street: 'ул. Тверская, д. 15',
    apartment: 'кв. 42',
    postalCode: '125009',
    isDefault: true,
  },
  {
    id: '2',
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    country: 'Россия',
    city: 'Санкт-Петербург',
    street: 'Невский проспект, д. 100',
    postalCode: '191186',
    isDefault: false,
  },
];

const AddressesPage = () => {
  const [addresses, setAddresses] = useState<AddressType[]>(mockAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddAddress = (data: AddressInputs) => {
    setIsLoading(true);

    // Имитация API запроса
    setTimeout(() => {
      const newAddress: AddressType = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        isDefault: addresses.length === 0, // Первый адрес по умолчанию
      };

      setAddresses((prev) => [...prev, newAddress]);
      setIsModalOpen(false);
      setIsLoading(false);
      toast.success('Адрес успешно добавлен!');
    }, 1000);
  };

  const handleEditAddress = (data: AddressInputs) => {
    if (!editingAddress?.id) return;

    setIsLoading(true);

    // Имитация API запроса
    setTimeout(() => {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...data } : addr)),
      );

      setEditingAddress(null);
      setIsModalOpen(false);
      setIsLoading(false);
      toast.success('Адрес успешно обновлен!');
    }, 1000);
  };

  const handleDeleteAddress = (addressId: string) => {
    if (confirm('Вы уверены, что хотите удалить этот адрес?')) {
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
      toast.success('Адрес удален');
    }
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })),
    );
    toast.success('Основной адрес изменен');
  };

  const openAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const openEditModal = (address: AddressType) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-blue-100 rounded-xl">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мои адреса</h1>
            <p className="text-gray-600">Управление адресами доставки</p>
          </div>
        </div>

        {/* Основной контент */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <AddressList
            addresses={addresses}
            onSelect={handleSetDefault}
            onEdit={openEditModal}
            onDelete={handleDeleteAddress}
            onAddNew={openAddModal}
          />
        </div>

        {/* Кнопка добавления для пустого состояния */}
        {addresses.length > 0 && (
          <div className="mt-6">
            <button
              onClick={openAddModal}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 justify-center">
              <Plus className="w-5 h-5" />
              Добавить новый адрес
            </button>
          </div>
        )}

        {/* Модальное окно */}
        <AddressModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editingAddress ? handleEditAddress : handleAddAddress}
          initialData={editingAddress || undefined}
          isLoading={isLoading}
          mode={editingAddress ? 'edit' : 'create'}
        />
      </div>
    </div>
  );
};

export default AddressesPage;
