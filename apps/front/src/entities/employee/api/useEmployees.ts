import { environment } from '@/env';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { EmployeeModel } from '../model';

const fetchEmployees = async (): Promise<EmployeeModel[]> => {
  const response = await fetch(`${environment.apiUrl}/employees`);
  const data = await response.json();
  return data;
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
