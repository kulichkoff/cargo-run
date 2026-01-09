import z from 'zod';

export const createVehicleSchema = z.object({
  plateNumber: z.string().min(7, 'Слишком короткий номер'),
  // TODO instead of filtering, use this I think
  // const schema = z.object({
  //   name: z.string().optional().transform(v =>
  //     v?.trim() === "" ? undefined : v
  //   ),
  // });

  make: z.string().optional(),
  model: z.string().optional(),
  // TODO think about number type here
  manufactureYear: z.string().optional(),
  vin: z.string().optional(),
});

export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>;
