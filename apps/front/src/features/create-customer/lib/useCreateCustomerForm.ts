import { useForm } from 'react-hook-form';
import { CreateCustomerFormData, createCustomerSchema } from '../model';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateCustomerForm = () =>
  useForm<CreateCustomerFormData>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      companyName: '',
      companyType: '',
      inn: '',
      kpp: '',
      ogrn: '',
    },
  });
