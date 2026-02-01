import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTruckSchema } from './create-truck.schema';
import { useForm } from 'react-hook-form';

export function useCreateTruckForm() {
  return useForm({
    resolver: zodResolver(CreateTruckSchema),
    defaultValues: {
      plateNumber: '',
      make: '',
      model: '',
    },
  });
}
