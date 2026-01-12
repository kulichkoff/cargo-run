import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCustomerFormData } from '../model';
import axios from 'axios';
import { environment } from '@/env';

export function useCreateCustomerMut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateCustomerFormData) => {
      const response = await axios.post(`${environment.apiUrl}/customers`, dto);
      return await response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
