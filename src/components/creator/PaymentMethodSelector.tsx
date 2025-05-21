
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  otherPayment: string;
  onMethodChange: (value: string) => void;
  onOtherPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  otherPayment,
  onMethodChange,
  onOtherPaymentChange
}) => {
  return (
    <RadioGroup 
      value={selectedMethod}
      onValueChange={onMethodChange}
      className="space-y-2"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Gopay" id="gopay" />
          <Label htmlFor="gopay" className="text-white">Gopay</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Ovo" id="ovo" />
          <Label htmlFor="ovo" className="text-white">Ovo</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="DANA" id="dana" />
          <Label htmlFor="dana" className="text-white">DANA</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ShopeePay" id="shopeepay" />
          <Label htmlFor="shopeepay" className="text-white">ShopeePay</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="BRI" id="bri" />
          <Label htmlFor="bri" className="text-white">BRI</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="BCA" id="bca" />
          <Label htmlFor="bca" className="text-white">BCA</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="BNI" id="bni" />
          <Label htmlFor="bni" className="text-white">BNI</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Mandiri" id="mandiri" />
          <Label htmlFor="mandiri" className="text-white">Mandiri</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Other" id="other_payment" />
          <Label htmlFor="other_payment" className="text-white">Other</Label>
        </div>
      </div>

      {selectedMethod === "Other" && (
        <Input 
          id="otherPayment"
          name="otherPayment"
          placeholder="Specify payment method"
          className="rounded-lg mt-2"
          value={otherPayment}
          onChange={onOtherPaymentChange}
        />
      )}
    </RadioGroup>
  );
};

export default PaymentMethodSelector;
