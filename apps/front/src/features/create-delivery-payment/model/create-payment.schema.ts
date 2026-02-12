import z from 'zod';

export const createPaymentSchema = z.object({
  amount: z.coerce.number().positive('Сумма должна быть положительной'),
  description: z.string().min(3, 'Описание слишком короткое'),
  category: z.string().min(2, 'Категория обязательна'),
});

export type CreatePaymentFormData = z.infer<typeof createPaymentSchema>;
