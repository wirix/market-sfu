// components/AddressForm.tsx (обновленная версия)
'use client';

import { AddressInputs, addressSchema, AddressType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, User, Mail, Phone, Home, Navigation, AlertCircle, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { validationUtils } from '@/lib/validation';

interface AddressFormProps {
  onSubmit: (data: AddressInputs) => void;
  onCancel?: () => void;
  initialData?: Partial<AddressType>;
  isLoading?: boolean;
  mode?: 'create' | 'edit';
}

const countries = [
  'Россия',
  'Казахстан',
  'Беларусь',
  'Украина',
  'США',
  'Германия',
  'Франция',
  'Великобритания',
  'Китай',
  'Япония',
];

const AddressForm = ({ 
  onSubmit, 
  onCancel, 
  initialData, 
  isLoading = false, 
  mode = 'create' 
}: AddressFormProps) => {
  const [realTimeValidation, setRealTimeValidation] = useState<Record<string, boolean>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    trigger,
    setValue,
  } = useForm<AddressInputs>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const watchedFields = watch();

  // Реал-тайм валидация при изменении полей
  useEffect(() => {
    const validateField = async (fieldName: keyof AddressInputs) => {
      const isValid = await trigger(fieldName);
      setRealTimeValidation(prev => ({
        ...prev,
        [fieldName]: isValid,
      }));
    };

    Object.keys(watchedFields).forEach(field => {
      if (watchedFields[field as keyof AddressInputs]) {
        validateField(field as keyof AddressInputs);
      }
    });
  }, [watchedFields, trigger]);

  // Обработчики для форматирования в реальном времени
  const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
    // Удаляем цифры и специальные символы
    const cleaned = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-']/g, '');
    setValue(field, cleaned, { shouldValidate: true });
  };

  const handlePhoneChange = (value: string) => {
    // Удаляем всё кроме цифр, пробелов, скобок и дефисов
    const cleaned = value.replace(/[^\d\s\-\(\)\+]/g, '');
    setValue('phone', cleaned, { shouldValidate: true });
  };

  const handleCityChange = (value: string) => {
    // Удаляем цифры и недопустимые символы
    const cleaned = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s\-\.]/g, '');
    setValue('city', cleaned, { shouldValidate: true });
  };

  const handlePostalCodeChange = (value: string) => {
    // Разрешаем только буквы, цифры, пробелы и дефисы
    const cleaned = value.replace(/[^a-zA-Z0-9\s\-]/g, '');
    setValue('postalCode', cleaned.toUpperCase(), { shouldValidate: true });
  };

  const getFieldStatus = (fieldName: keyof AddressInputs) => {
    const value = watchedFields[fieldName];
    if (!value) return 'empty';
    if (errors[fieldName]) return 'error';
    if (realTimeValidation[fieldName]) return 'valid';
    return 'typing';
  };

  const renderStatusIcon = (fieldName: keyof AddressInputs) => {
    const status = getFieldStatus(fieldName);
    
    switch (status) {
      case 'valid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <MapPin className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Добавить адрес доставки' : 'Редактировать адрес'}
          </h2>
          <p className="text-sm text-gray-600">Заполните информацию для доставки</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Личная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Имя *
            </label>
            <div className="relative">
              <input
                type="text"
                id="firstName"
                {...register('firstName')}
                onChange={(e) => handleNameChange('firstName', e.target.value)}
                className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.firstName
                    ? 'border-red-300 focus:ring-red-500'
                    : getFieldStatus('firstName') === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Иван"
                maxLength={50}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {renderStatusIcon('firstName')}
              </div>
            </div>
            {errors.firstName ? (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.firstName.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">Только буквы, дефисы и апострофы</p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Фамилия *
            </label>
            <div className="relative">
              <input
                type="text"
                id="lastName"
                {...register('lastName')}
                onChange={(e) => handleNameChange('lastName', e.target.value)}
                className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.lastName
                    ? 'border-red-300 focus:ring-red-500'
                    : getFieldStatus('lastName') === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Иванов"
                maxLength={50}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {renderStatusIcon('lastName')}
              </div>
            </div>
            {errors.lastName ? (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.lastName.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">Только буквы, дефисы и апострофы</p>
            )}
          </div>
        </div>

        {/* Контактная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500'
                    : getFieldStatus('email') === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="your@email.com"
                maxLength={100}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {renderStatusIcon('email')}
              </div>
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              Телефон *
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.phone
                    ? 'border-red-300 focus:ring-red-500'
                    : getFieldStatus('phone') === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="+7 (999) 999-99-99"
                maxLength={15}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {renderStatusIcon('phone')}
              </div>
            </div>
            {errors.phone ? (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">Минимум 10 цифр</p>
            )}
          </div>
        </div>

        {/* Адресная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Navigation className="w-4 h-4" />
              Страна *
            </label>
            <select
              id="country"
              {...register('country')}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                errors.country
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            >
              <option value="">Выберите страну</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.country.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="city" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Home className="w-4 h-4" />
              Город *
            </label>
            <div className="relative">
              <input
                type="text"
                id="city"
                {...register('city')}
                onChange={(e) => handleCityChange(e.target.value)}
                className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.city
                    ? 'border-red-300 focus:ring-red-500'
                    : getFieldStatus('city') === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Москва"
                maxLength={50}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {renderStatusIcon('city')}
              </div>
            </div>
            {errors.city ? (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">Только буквы, пробелы, точки и дефисы</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="street" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4" />
            Улица и дом *
          </label>
          <div className="relative">
            <input
              type="text"
              id="street"
              {...register('street')}
              className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                errors.street
                  ? 'border-red-300 focus:ring-red-500'
                  : getFieldStatus('street') === 'valid'
                  ? 'border-green-300 focus:ring-green-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="ул. Примерная, д. 123"
              maxLength={100}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {renderStatusIcon('street')}
            </div>
          </div>
          {errors.street ? (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.street.message}
            </p>
          ) : (
            <p className="mt-1 text-xs text-gray-500">Можно использовать буквы, цифры и знаки препинания</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="apartment" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Home className="w-4 h-4" />
              Квартира/Офис
            </label>
            <input
              type="text"
              id="apartment"
              {...register('apartment')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="№ квартиры или офиса"
              maxLength={20}
            />
            <p className="mt-1 text-xs text-gray-500">Необязательно</p>
          </div>

          <div>
            <label htmlFor="postalCode" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              Почтовый индекс *
            </label>
            <div className="relative">
              <input
                type="text"
                id="postalCode"
                {...register('postalCode')}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.postalCode
                    ? 'border-red-300 focus:ring-red-500'
                    : getFieldStatus('postalCode') === 'valid'
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="123456"
                maxLength={10}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {renderStatusIcon('postalCode')}
              </div>
            </div>
            {errors.postalCode ? (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.postalCode.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">Буквы и цифры, минимум 5 символов</p>
            )}
          </div>
        </div>

        {/* Индикатор прогресса */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Заполнение формы</span>
            <span className="text-sm text-gray-500">
              {Object.values(realTimeValidation).filter(Boolean).length} / 8
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(Object.values(realTimeValidation).filter(Boolean).length / 8) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Сохранение...</span>
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                <span>{mode === 'create' ? 'Сохранить адрес' : 'Обновить адрес'}</span>
              </>
            )}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              Отмена
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddressForm;