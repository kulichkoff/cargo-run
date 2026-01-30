import { clientAxios } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCompleteDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ deliveryId }: { deliveryId: number }) => {
      const response = await clientAxios.put(
        `/deliveries/${deliveryId}/deliver`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });
}
