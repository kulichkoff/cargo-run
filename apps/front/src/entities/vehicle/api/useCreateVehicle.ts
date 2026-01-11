import { useMutation, useQueryClient } from '@tanstack/react-query';
import { environment } from '@/env';
import { CreateVehicleDTO } from '../model';
import axios from 'axios';

export function useCreateVehicleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateVehicleDTO) => {
      const response = await axios.post(`${environment.apiUrl}/vehicles`, dto);
      return await response.data();
    },
    onSuccess: () => {
      // TODO probably, insert a new one is a better idea
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}
