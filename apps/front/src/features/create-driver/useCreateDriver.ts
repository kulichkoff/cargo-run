import { CreateDriverFormData } from './create-driver.schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientAxios } from '@/shared/lib';

export function useCreateDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateDriverFormData) => {
      const response = await clientAxios.post('/drivers', dto);
      return await response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
    },
  });
}
