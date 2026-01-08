import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { environment } from '@/env';
import { VehicleModel } from '../model';

export const fetchVehicles = async (): Promise<VehicleModel[]> => {
  const response = await fetch(`${environment.apiUrl}/vehicles`);
  const data = await response.json();
  return data;
};

export const vehiclesQueryOptions = queryOptions({
  queryKey: ['vehicles'],
  queryFn: () => fetchVehicles(),
});

export const useVehicles = () => {
  return useQuery(vehiclesQueryOptions);
};

export const useSuspenseVehicles = () => {
  return useSuspenseQuery(vehiclesQueryOptions);
};
