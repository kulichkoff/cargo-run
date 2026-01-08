import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateEmployeeFormData, creeateEmployeeSchema } from '../model';

export const useCreateEmployeeForm = () =>
  useForm<CreateEmployeeFormData>({
    resolver: zodResolver(creeateEmployeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
