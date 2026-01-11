import { environment } from '@/env';
import { getFetcher, getQueryClient } from '@/shared/lib';
import { VehiclesDataTable } from '@/widgets/vehicles-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export default async function VehiclesPage() {
  const fetcher = await getFetcher();
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ['vehicles'],
      queryFn: async () => {
        return (await fetcher.get(`${environment.apiUrl}/vehicles`)).data;
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
        <VehiclesDataTable />
      </HydrationBoundary>
    </div>
  );
}
