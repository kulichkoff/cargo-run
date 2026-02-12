import { useForm } from 'react-hook-form';
import { createPaymentSchema } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreatePaymentForm = () =>
  useForm({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {
      amount: 0,
      description: 'Оплата за перевозку',
      category: 'Перевозка',
    },
  });
