import { employeesQueryOptions } from '@/entities/employee';
import { getQueryClient } from '@/shared/lib';
import { EmployeesDataTable } from '@/widgets/employees-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export default async function EmployeesPage() {
  const queryClient = getQueryClient();
  try {
    await queryClient.fetchQuery(employeesQueryOptions);
  } catch (error) {
    if ((error as AxiosError).status === 401) {
      redirect('/login');
    }
  }

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EmployeesDataTable />
      </HydrationBoundary>
    </div>
  );
}
