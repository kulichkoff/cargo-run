import { PaymentStatus } from "@/entities/payment";
import { environment } from "@/env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CargoModel } from "../model";

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({cargoId, paymentStatus}: {cargoId: number, paymentStatus: PaymentStatus}) => {
      const response = await fetch(`${environment.apiUrl}/cargos/${cargoId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentStatus,
        } satisfies Partial<CargoModel>),
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
    },
  })
}
