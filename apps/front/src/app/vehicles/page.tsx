import { vehiclesQueryOptions } from '@/entities/vehicle';
import { getQueryClient } from '@/shared/lib';
import { VehiclesDataTable } from '@/widgets/vehicles-data-table';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default function VehiclesPage() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(vehiclesQueryOptions);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <VehiclesDataTable />
      </HydrationBoundary>
    </div>
  );
}
