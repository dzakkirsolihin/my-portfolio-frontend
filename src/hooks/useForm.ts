import { useState } from 'react';

function useForm<T extends Record<string, any>>(initial: T) {
  const [form, setForm] = useState<T>(initial);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  return { form, setForm, handleChange };
}

export default useForm; 