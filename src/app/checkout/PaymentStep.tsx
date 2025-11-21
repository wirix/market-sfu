// components/checkout/PaymentStep.tsx
'use client';

import { CreditCard, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface PaymentStepProps {
  onNextStep: () => void;
  onPrevStep: () => void;
}

const PaymentStep = ({ onNextStep, onPrevStep }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches ? matches[0] : '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value.replace(/\D/g, '').substring(0, 3));
  };

  const isCardFormValid = () => {
    if (paymentMethod === 'cash') return true;

    return (
      cardNumber.replace(/\s/g, '').length === 16 &&
      expiryDate.length === 5 &&
      cvv.length === 3 &&
      cardholderName.length > 2
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <CreditCard className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Способ оплаты</h2>
          <p className="text-gray-600">Выберите удобный способ оплаты</p>
        </div>
      </div>

      {/* Выбор способа оплаты */}
      <div className="space-y-4 mb-6">
        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value as 'card')}
            className="text-blue-600 focus:ring-blue-500"
          />
          <CreditCard className="w-5 h-5 text-gray-600" />
          <div className="flex-1">
            <div className="font-medium text-gray-900">Банковская карта</div>
            <div className="text-sm text-gray-500">Visa, Mastercard, Mir</div>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-5 bg-blue-600 rounded-sm"></div>
            <div className="w-8 h-5 bg-red-600 rounded-sm"></div>
            <div className="w-8 h-5 bg-orange-600 rounded-sm"></div>
          </div>
        </label>

        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300 transition-colors">
          <input
            type="radio"
            name="payment"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
            className="text-blue-600 focus:ring-blue-500"
          />
          <div className="w-5 h-5 flex items-center justify-center text-lg">💵</div>
          <div>
            <div className="font-medium text-gray-900">Наличными при получении</div>
            <div className="text-sm text-gray-500">Оплата курьеру</div>
          </div>
        </label>
      </div>

      {/* Форма для карты */}
      {paymentMethod === 'card' && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Безопасная оплата</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Номер карты</label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Срок действия
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="ММ/ГГ"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  maxLength={3}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя владельца карты
              </label>
              <input
                type="text"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value.toUpperCase())}
                placeholder="IVAN IVANOV"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase"
              />
            </div>
          </div>
        </div>
      )}

      {/* Кнопки навигации */}
      <div className="flex gap-3">
        <button
          onClick={onPrevStep}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Назад
        </button>

        <div className="flex-1" />

        <button
          onClick={onNextStep}
          disabled={paymentMethod === 'card' && !isCardFormValid()}
          className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2">
          Продолжить к подтверждению
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
