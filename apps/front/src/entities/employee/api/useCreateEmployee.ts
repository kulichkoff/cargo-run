import { environment } from '@/env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateEmployeeDTO } from '../model';

export function useCreateEmployeeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (createVehicleDTO: CreateEmployeeDTO) => {
      const response = await fetch(`${environment.apiUrl}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createVehicleDTO),
      });
      return await response.json();
    },
    onSuccess: () => {
      // TODO probably, insert a new one is a better idea
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}
