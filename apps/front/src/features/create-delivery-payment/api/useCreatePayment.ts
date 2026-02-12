import { clientAxios } from "@/shared/lib";
import { useMutation } from "@tanstack/react-query";
import { CreateTransactionDto } from "@/entities/transaction/model";

export function useCreatePayment() {
  return useMutation({
    mutationFn: async (dto: CreateTransactionDto) => {
      const response = await clientAxios.post('/transactions', dto);
      return response.data;
    },
  });
}
