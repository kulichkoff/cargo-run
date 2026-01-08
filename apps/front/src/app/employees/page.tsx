import { employeesQueryOptions } from '@/entities/employee';
import { getQueryClient } from '@/shared/lib';
import { EmployeesDataTable } from '@/widgets/employees-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function EmployeesPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(employeesQueryOptions);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EmployeesDataTable />
      </HydrationBoundary>
    </div>
  );
}
