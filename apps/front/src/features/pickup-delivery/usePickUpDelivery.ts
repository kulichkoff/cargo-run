import { clientAxios } from '@/shared/lib';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePickUpDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      deliveryId,
      pickedUpAt,
    }: {
      deliveryId: number;
      pickedUpAt: Date;
    }) => {
      const response = await clientAxios.put(
        `/deliveries/${deliveryId}/pickup`,
        { pickedUpAt },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
    },
  });
}
