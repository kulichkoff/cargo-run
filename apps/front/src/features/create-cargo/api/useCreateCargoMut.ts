import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCargoDTO } from "../model/create-cargo.dto";
import { environment } from "@/env";

export function useCreateCargoMut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateCargoDTO) => {
      const response = await fetch(`${environment.apiUrl}/cargos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });
      return await response.json();
    },
    onSuccess: () => {
      // TODO probably, insert a new one is a better idea
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
    },
  })
}
