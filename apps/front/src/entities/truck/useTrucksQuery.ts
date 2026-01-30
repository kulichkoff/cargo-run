import { useQuery } from '@tanstack/react-query';
import { TruckModel } from './truck.model';
import { clientAxios } from '@/shared/lib';

async function fetchTrucks(): Promise<TruckModel[]> {
  const { data } = await clientAxios.get('/trucks');
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
