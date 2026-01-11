import { environment } from '@/env';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateEmployeeDTO } from '../model';
import axios from 'axios';

export function useCreateEmployeeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateEmployeeDTO) => {
      const response = await axios.post(`${environment.apiUrl}/employees`, dto);
      return await response.data();
    },
    onSuccess: () => {
      // TODO probably, insert a new one is a better idea
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}
