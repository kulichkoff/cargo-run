import { cargosQueryOptions } from '@/entities/cargo';
import { employeesQueryOptions } from '@/entities/employee';
import { vehiclesQueryOptions } from '@/entities/vehicle';
import { getQueryClient } from '@/shared/lib';
import { CargosDataTable } from '@/widgets/cargos-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function CargosPage() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(employeesQueryOptions);
  void queryClient.prefetchQuery(vehiclesQueryOptions);
  void queryClient.prefetchQuery(cargosQueryOptions);

  return (
    <div className='max-w-5xl sm:px-6'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CargosDataTable />
      </HydrationBoundary>
    </div>
  );
}
