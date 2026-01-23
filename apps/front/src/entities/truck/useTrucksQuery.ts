import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { environment } from '@/env';
import { TruckModel } from './truck.model';

async function fetchTrucks(): Promise<TruckModel[]> {
  const { data } = await axios.get(`${environment.apiUrl}/trucks`);
  return data.map((truck: TruckModel) => ({
    ...truck,
    createdAt: new Date(truck.createdAt),
    updatedAt: new Date(truck.updatedAt),
  }));
}

export const useTrucksQuery = () => {
  return useQuery({
    queryKey: ['trucks'],
    queryFn: fetchTrucks,
  });
};
