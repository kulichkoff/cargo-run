import z from 'zod';

export const creeateEmployeeSchema = z.object({
  firstName: z.string('Обязательное поле'),
  lastName: z.string('Обязательное поле'),
});

export type CreateEmployeeFormData = z.infer<typeof creeateEmployeeSchema>;
