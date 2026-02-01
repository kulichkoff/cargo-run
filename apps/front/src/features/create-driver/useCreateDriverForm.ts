import { useForm } from 'react-hook-form';
import { CreateDriverFormData } from './create-driver.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateDriverSchema } from './create-driver.schema';

export function useCreateDriverForm() {
  return useForm<CreateDriverFormData>({
    resolver: zodResolver(CreateDriverSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
}
