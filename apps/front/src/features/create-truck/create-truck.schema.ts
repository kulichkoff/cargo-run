import z from 'zod';

export const CreateTruckSchema = z.object({
  plateNumber: z
    .string()
    .min(3, 'Слишком короткое')
    .regex(
      /^[АВЕКМНОРСТУХавекмнорстух]{1}\d{3}[АВЕКМНОРСТУХавекмнорстух]{2}\d{2,3}$/gim,
      'Неверный формат номера',
    )
    .toUpperCase(),
  make: z.string().min(3, 'Слишком короткое'),
  model: z.string().min(3, 'Слишком короткое').optional(),
  vin: z.string().min(3, 'Слишком короткое').optional(),
  year: z.coerce
    .number()
    .min(1900, 'Год выпуска не может быть меньше 1900')
    .max(
      new Date().getFullYear(),
      'Год выпуска не может быть больше текущего года',
    )
    .optional(),
});

export type CreateTruckFormData = z.infer<typeof CreateTruckSchema>;
