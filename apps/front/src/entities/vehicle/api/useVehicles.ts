import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import type { VehicleModel } from '../vehicle.model';

export const fetchVehicles = async (): Promise<VehicleModel[]> => {
  // TODO switch to environment variables
  const response = await fetch('http://localhost:3333/vehicles');
  const data = await response.json();
  console.log('data', data);
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
