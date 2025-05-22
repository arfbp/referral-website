
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PaymentMethodSelector from './PaymentMethodSelector';

interface PaymentFieldsProps {
  formData: {
    paymentMethod: string;
    paymentAccount: string;
    otherPayment: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMethodChange: (value: string) => void;
}

const PaymentFields: React.FC<PaymentFieldsProps> = ({ formData, onChange, onMethodChange }) => {
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
        <Label htmlFor="paymentAccount" className="text-white">Rekening/Ewallet dan atas nama (xxx-a/n)</Label>
        <Input 
          id="paymentAccount"
          name="paymentAccount"
          placeholder="e.g. 1234567890 a/n John Doe"
          required
          className="rounded-lg"
          value={formData.paymentAccount}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default PaymentFields;
