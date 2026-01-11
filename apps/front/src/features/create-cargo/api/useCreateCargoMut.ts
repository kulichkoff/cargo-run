import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateCargoDTO } from '../model/create-cargo.dto';
import { environment } from '@/env';
import axios from 'axios';

export function useCreateCargoMut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateCargoDTO) => {
      const response = await axios.post(`${environment.apiUrl}/cargos`, dto);
      return await response.data();
    },
    onSuccess: () => {
      // TODO probably, insert a new one is a better idea
      queryClient.invalidateQueries({ queryKey: ['cargos'] });
    },
  });
}
