import { useQuery } from '@tanstack/react-query';
import { environment } from '@/env';
import { CustomerModel } from '../model';
import { clientAxios } from '@/shared/lib';

async function fetchCustomers(): Promise<CustomerModel[]> {
  const { data } = await clientAxios.get(`${environment.apiUrl}/customers`);
  return data.map((customer: CustomerModel) => ({
    ...customer,
    createdAt: new Date(customer.createdAt),
    updatedAt: new Date(customer.updatedAt),
  }));
}

export const useCustomersQuery = () => {
  return useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};
