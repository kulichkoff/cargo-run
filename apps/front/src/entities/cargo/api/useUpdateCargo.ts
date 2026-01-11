import { environment } from '@/env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CargoModel } from '../model';
import axios from 'axios';

export function useUpdateCargo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...patch }: Partial<CargoModel>) => {
      const response = await axios.patch(
        `${environment.apiUrl}/cargos/${id}`,
        patch,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
    },
  });
}
