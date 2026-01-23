import axios from 'axios';
import { DriverModel } from './driver.model';
import { environment } from '@/env';
import { useQuery } from '@tanstack/react-query';

async function fetchDrivers(): Promise<DriverModel[]> {
  const { data } = await axios.get(`${environment.apiUrl}/drivers`);
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
