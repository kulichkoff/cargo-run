import z from 'zod';

const numericRegex = /^\d+$/g;

export const createCargoSchema = z.object({
  employeeId: z.string().regex(numericRegex, 'Некорректный ввод'),
  vehicleId: z.string().regex(numericRegex, 'Некорректный ввод'),
  customerId: z.string().regex(numericRegex, 'Некорректный ввод'),
  startDate: z.date('Обязательное поле'),
  deadlineDate: z.date('Обязательное поле'),
  price: z.string(),
  addressSequence: z.string(),
});

export type CreateCargoFormData = z.infer<typeof createCargoSchema>;
