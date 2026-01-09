import { environment } from '@/env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CargoModel } from '../model';

export function useUpdateCargo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...patch }: Partial<CargoModel>) => {
      const response = await fetch(`${environment.apiUrl}/cargos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
    },
  });
}
