import { environment } from '@/env';
import { EmployeeModel } from '../employee.model';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

export const fetchEmployees = async (): Promise<EmployeeModel[]> => {
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
