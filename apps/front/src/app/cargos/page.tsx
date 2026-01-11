import { cargosQueryOptions } from '@/entities/cargo';
import { employeesQueryOptions } from '@/entities/employee';
import { vehiclesQueryOptions } from '@/entities/vehicle';
import { getQueryClient } from '@/shared/lib';
import { CargosDataTable } from '@/widgets/cargos-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { redirect } from 'next/navigation';

export default async function CargosPage() {
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchQuery(employeesQueryOptions);
    await queryClient.prefetchQuery(vehiclesQueryOptions);
    await queryClient.prefetchQuery(cargosQueryOptions);
  } catch (error) {
    if ((error as AxiosError).status === 401) {
      redirect('/login');
    }
  }

  return (
    <div className="max-w-5xl sm:px-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CargosDataTable />
      </HydrationBoundary>
    </div>
  );
}
