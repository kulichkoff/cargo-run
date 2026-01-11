import { vehiclesQueryOptions } from '@/entities/vehicle';
import { getQueryClient } from '@/shared/lib';
import { VehiclesDataTable } from '@/widgets/vehicles-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export default async function VehiclesPage() {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery(vehiclesQueryOptions);
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
