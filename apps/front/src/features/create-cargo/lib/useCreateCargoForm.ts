import { useForm } from 'react-hook-form';
import { CreateCargoFormData, createCargoSchema } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateCargoForm = () =>
  useForm<CreateCargoFormData>({
    resolver: zodResolver(createCargoSchema),
    defaultValues: {
      addressSequence: '',
      price: '',
      startDate: new Date(),
      deadlineDate: new Date(),
    },
  });
