import { clientAxios } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAssignTruck() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      deliveryId,
      truckId,
    }: {
      deliveryId: number;
      truckId: number;
    }) => {
      const response = await clientAxios.put(
        `/deliveries/${deliveryId}/truck`,
        { truckId },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });
}
