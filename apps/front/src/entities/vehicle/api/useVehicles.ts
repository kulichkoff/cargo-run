import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { environment } from '@/env';
import { VehicleModel } from '../model';
import axios from 'axios';

export const fetchVehicles = async (): Promise<VehicleModel[]> => {
  const respose = await axios.get(`${environment.apiUrl}/vehicles`);
  return respose.data;
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
