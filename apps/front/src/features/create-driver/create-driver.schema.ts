import z from 'zod';

export const CreateDriverSchema = z.object({
  firstName: z.string().min(3, 'Слишком короткое'),
  lastName: z.string().min(3, 'Слишком короткое'),
});

export type CreateDriverFormData = z.infer<typeof CreateDriverSchema>;
