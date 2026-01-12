import z from 'zod';

export const createCustomerSchema = z.object({
  companyName: z.string().min(3, 'Слишком короткое'),
  companyType: z.string().min(3, 'Слишком короткое'),
  inn: z.string().min(3, 'Слишком короткое'),
  kpp: z.string(),
  ogrn: z.string(),
});

export type CreateCustomerFormData = z.infer<typeof createCustomerSchema>;
