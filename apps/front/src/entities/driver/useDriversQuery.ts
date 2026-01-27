import { DriverModel } from './driver.model';
import { useQuery } from '@tanstack/react-query';
import { clientAxios } from '@/shared/lib';

async function fetchDrivers(): Promise<DriverModel[]> {
  const { data } = await clientAxios.get('/drivers');
  return data.map((driver: DriverModel) => ({
    ...driver,
    createdAt: new Date(driver.createdAt),
    updatedAt: new Date(driver.updatedAt),
  }));
}

export const useDriversQuery = () => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: fetchDrivers,
  });
};
