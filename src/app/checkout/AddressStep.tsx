// components/checkout/AddressStep.tsx
'use client';

import { AddressType } from '@/types';
import { MapPin, Plus, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import AddressModal from '@/components/AddressModal';
import { AddressInputs } from '@/types';

interface AddressStepProps {
  addresses: AddressType[];
  selectedAddress: AddressType | null;
  onSelectAddress: (address: AddressType) => void;
  onNextStep: () => void;
}

const AddressStep = ({
  addresses,
  selectedAddress,
  onSelectAddress,
  onNextStep,
}: AddressStepProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAddress = (data: AddressInputs) => {
    // В реальном приложении здесь будет API запрос
    const newAddress: AddressType = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      isDefault: false,
    };

    // Добавляем новый адрес в список и выбираем его
    onSelectAddress(newAddress);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Адрес доставки</h2>
          <p className="text-gray-600">Выберите адрес для доставки заказа</p>
        </div>
      </div>

      {/* Список адресов */}
      <div className="space-y-4 mb-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedAddress?.id === address.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelectAddress(address)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900">
                    {address.firstName} {address.lastName}
                  </h4>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Основной
                    </span>
                  )}
                  {selectedAddress?.id === address.id && (
                    <Check className="w-4 h-4 text-blue-500" />
                  )}
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    {address.street}
                    {address.apartment && `, ${address.apartment}`}
                  </p>
                  <p>
                    {address.city}, {address.country}, {address.postalCode}
                  </p>
                  <p className="text-gray-500">{address.phone}</p>
                  <p className="text-gray-500">{address.email}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки действий */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-3 px-4 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 transition-colors">
          <Plus className="w-5 h-5" />
          Добавить новый адрес
        </button>

        <div className="flex-1" />

        <button
          onClick={onNextStep}
          disabled={!selectedAddress}
          className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2">
          Продолжить к оплате
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <Link
        href="/addresses"
        className="inline-flex items-center text-gray-600 hover:text-gray-700 mt-4 text-sm">
        Управление адресами доставки
      </Link>

      {/* Модальное окно добавления адреса */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAddress}
        mode="create"
      />
    </div>
  );
};

export default AddressStep;
