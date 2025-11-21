// components/AddressList.tsx
'use client';

import { AddressType } from '@/types';
import { Edit2, Trash2, MapPin, Check, Plus } from 'lucide-react';

interface AddressListProps {
  addresses: AddressType[];
  selectedAddressId?: string;
  onSelect: (address: AddressType) => void;
  onEdit: (address: AddressType) => void;
  onDelete: (addressId: string) => void;
  onAddNew: () => void;
}

const AddressList = ({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onDelete,
  onAddNew,
}: AddressListProps) => {
  if (addresses.length === 0) {
    return (
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Нет сохраненных адресов</h3>
        <p className="text-gray-500 mb-6">Добавьте адрес для быстрого оформления заказов</p>
        <button
          onClick={onAddNew}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 mx-auto">
          <Plus className="w-5 h-5" />
          Добавить адрес
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Сохраненные адреса</h3>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          <Plus className="w-4 h-4" />
          Добавить новый
        </button>
      </div>

      <div className="grid gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
              selectedAddressId === address.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSelect(address)}>
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
                  {selectedAddressId === address.id && <Check className="w-4 h-4 text-blue-500" />}
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

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(address);
                  }}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (address.id) onDelete(address.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressList;
