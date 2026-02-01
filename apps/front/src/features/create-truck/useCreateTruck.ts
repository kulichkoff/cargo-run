import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateTruckFormData } from './create-truck.schema';
import { clientAxios } from '@/shared/lib';

export function useCreateTruck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateTruckFormData) => {
      const response = await clientAxios.post('/trucks', dto);
      return await response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trucks'] });
    },
  });
}
