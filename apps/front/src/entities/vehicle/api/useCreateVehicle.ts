import { useMutation, useQueryClient } from '@tanstack/react-query';
import { environment } from '@/env';
import { CreateVehicleDTO } from '../model';

export function useCreateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createVehicleDTO: CreateVehicleDTO) => {
      const response = await fetch(`${environment.apiUrl}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createVehicleDTO),
      });
      return await response.json();
    },
    onSuccess: () => {
      // TODO probably, insert a new one is a better idea
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}
