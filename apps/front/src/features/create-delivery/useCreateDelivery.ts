import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clientAxios } from "@/shared/lib";
import { CreateDeliveryFormData } from "./CreateDeliveryDialog";
import { toast } from "sonner";

export function useCreateDelivery() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateDeliveryFormData) => {
      const response = await clientAxios.post('/deliveries', dto);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deliveries'] });
      toast.success('Доставка успешно создана');
    },
    onError: () => {
      toast.error('Не удалось создать доставку');
    },
  });
}
