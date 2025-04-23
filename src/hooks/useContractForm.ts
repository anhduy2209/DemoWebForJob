import { ChangeEvent, FormEvent, useState } from 'react';
import { FormData } from '../types/form';
import { FormErrors } from '../types/types';
import { validateField } from '../utils/validation';

const getCurrentDate = () => new Date().toISOString().split('T')[0];

const useContractForm = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    contractNumber: '',
    contractDate: '',
    contractValue: '',
    contractDescription: '',
  });

  

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const newErrors: FormErrors = {};
  
    // Ep kiểu một cách chính xác cho key để tránh lỗi TypeScript
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const value = formData[key];
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    }
  };
  
  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useContractForm;
