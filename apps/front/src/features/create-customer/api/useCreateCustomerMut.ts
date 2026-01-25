import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCustomerFormData } from '../model';
import { clientAxios } from '@/shared/lib';

export function useCreateCustomerMut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateCustomerFormData) => {
      const response = await clientAxios.post('/customers', dto);
      return await response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });
}
