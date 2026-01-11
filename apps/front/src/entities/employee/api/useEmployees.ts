import { environment } from '@/env';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { EmployeeModel } from '../model';
import axios from 'axios';

const fetchEmployees = async (): Promise<EmployeeModel[]> => {
  const response = await axios.get(`${environment.apiUrl}/employees`);
  return response.data;
};

export const employeesQueryOptions = queryOptions({
  queryKey: ['employees'],
  queryFn: () => fetchEmployees(),
});

export const useEmployees = () => {
  return useQuery(employeesQueryOptions);
};

export const useSuspenseEmployees = () => {
  return useSuspenseQuery(employeesQueryOptions);
};
