	// components/AddressModal.tsx
'use client';

import { AddressInputs, AddressType } from '@/types';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import AddressForm from './AddressForm';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressInputs) => void;
  initialData?: Partial<AddressType>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const AddressModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  mode = 'create',
}: AddressModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl">
          {/* Заголовок модального окна */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? 'Новый адрес доставки' : 'Редактирование адреса'}
            </h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Содержимое формы */}
          <div className="p-6">
            <AddressForm
              onSubmit={onSubmit}
              onCancel={onClose}
              initialData={initialData}
              isLoading={isLoading}
              mode={mode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;