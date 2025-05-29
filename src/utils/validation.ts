
export const validateNumberInput = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const value = e.target.value;
  if (value === '' || validateNumberInput(value)) {
    return;
  } else {
    e.preventDefault();
  }
};

export const formatNumberInput = (value: string): string => {
  // Remove all non-digit characters
  return value.replace(/\D/g, '');
};
