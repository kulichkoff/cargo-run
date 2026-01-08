import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateVehicleFormData, createVehicleSchema } from '../model';

export const useCreateVehicleForm = () =>
  useForm<CreateVehicleFormData>({
    resolver: zodResolver(createVehicleSchema),
    defaultValues: {
      plateNumber: '',
      make: '',
      model: '',
      manufactureYear: '',
      vin: '',
    },
  });
