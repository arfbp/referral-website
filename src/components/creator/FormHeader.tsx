
import React from 'react';

interface FormHeaderProps {
  referralCode?: string | null;
}

const FormHeader: React.FC<FormHeaderProps> = ({ referralCode }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">Creator Application Form</h2>
      {referralCode && (
        <div className="p-3 bg-green-100/20 border border-green-200 rounded-lg text-white mb-6">
          <p className="text-sm">You were referred by: <span className="font-medium">{referralCode}</span></p>
        </div>
      )}
    </>
  );
};

export default FormHeader;
