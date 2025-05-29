
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PaymentMethodSelector from './PaymentMethodSelector';
import { formatNumberInput } from '@/utils/validation';

interface PaymentFieldsProps {
  formData: {
    paymentMethod: string;
    paymentAccount: string;
    accountName: string;
    otherPayment: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMethodChange: (value: string) => void;
}

const PaymentFields: React.FC<PaymentFieldsProps> = ({ formData, onChange, onMethodChange }) => {
  const isEwallet = ['Gopay', 'Ovo', 'DANA', 'ShopeePay'].includes(formData.paymentMethod);
  
  const handlePaymentAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberInput(e.target.value);
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name: 'paymentAccount',
        value: formattedValue
      }
    };
    onChange(syntheticEvent);
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="text-white">Rekening/Ewallet</Label>
        <PaymentMethodSelector
          selectedMethod={formData.paymentMethod}
          otherPayment={formData.otherPayment}
          onMethodChange={onMethodChange}
          onOtherPaymentChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="paymentAccount" className="text-white">
          Nomor Rekening / Ewallet
        </Label>
        <Input 
          id="paymentAccount"
          name="paymentAccount"
          placeholder={isEwallet ? "e.g. 081234567890" : "e.g. 1234567890"}
          required
          className="rounded-lg"
          value={formData.paymentAccount}
          onChange={handlePaymentAccountChange}
        />
      </div>

      {!isEwallet && formData.paymentMethod && formData.paymentMethod !== 'Other' && (
        <div className="space-y-2">
          <Label htmlFor="accountName" className="text-white">Atas Nama Rekening</Label>
          <Input 
            id="accountName"
            name="accountName"
            placeholder="e.g. John Doe"
            required
            className="rounded-lg"
            value={formData.accountName}
            onChange={onChange}
          />
        </div>
      )}
    </>
  );
};

export default PaymentFields;
