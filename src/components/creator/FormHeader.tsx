
import React from 'react';

interface FormHeaderProps {
  referralCode?: string | null;
}

const FormHeader: React.FC<FormHeaderProps> = ({ referralCode }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">Creator Application Form</h2>
    </>
  );
};

export default FormHeader;
