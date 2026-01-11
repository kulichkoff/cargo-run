import { environment } from '@/env';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { CargoModel } from '../model';
import axios from 'axios';

const fetchCargos = async (): Promise<CargoModel[]> => {
  const response = await axios.get(`${environment.apiUrl}/cargos`);
  const data: CargoModel[] = response.data;
  return data.map((cargo) => ({
    ...cargo,
    deadlineDate: new Date(cargo.deadlineDate),
    startDate: new Date(cargo.startDate),
  }));
};

export const cargosQueryOptions = queryOptions({
  queryKey: ['cargos'],
  queryFn: () => fetchCargos(),
});

export const useCargos = () => {
  return useQuery(cargosQueryOptions);
};

export const useSuspenseCargos = () => {
  return useSuspenseQuery(cargosQueryOptions);
};
