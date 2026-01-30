import { clientAxios } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAssignDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      deliveryId,
      driverId,
    }: {
      deliveryId: number;
      driverId: number;
    }) => {
      const response = await clientAxios.put(
        `/deliveries/${deliveryId}/driver`,
        { driverId },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });
}
