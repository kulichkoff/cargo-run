import z from 'zod';

export const createCargoSchema = z.object({
  employeeId: z.string(),
  vehicleId: z.string(),
  startDate: z.date(),
  deadlineDate: z.date(),
  price: z.string(),
  paymentStatus: z.int(),
  addressSequence: z.string(),
});

export type CreateCargoFormData = z.infer<typeof createCargoSchema>;
