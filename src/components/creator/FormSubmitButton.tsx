
import React from 'react';
import { Button } from '@/components/ui/button';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <Button 
      type="submit" 
      className="w-full rounded-lg btn-primary"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
};

export default FormSubmitButton;
