import axios from 'axios';
import { CustomerModel } from '../model';
import { environment } from '@/env';
import { queryOptions } from '@tanstack/react-query';

const fetchCustomers = async (): Promise<CustomerModel[]> => {
  const respone = await axios.get(`${environment.apiUrl}/customers`);
  return respone.data;
};

export const customersQueryOptions = queryOptions({
  queryKey: ['customers'],
  queryFn: () => fetchCustomers(),
});
