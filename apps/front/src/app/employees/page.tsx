import { environment } from '@/env';
import { getFetcher, getQueryClient } from '@/shared/lib';
import { EmployeesDataTable } from '@/widgets/employees-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export default async function EmployeesPage() {
  const fetcher = await getFetcher();
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ['employees'],
      queryFn: async () => {
        return (await fetcher.get(`${environment.apiUrl}/employees`)).data;
      },
    });
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
