'use client';

import { deliveryColumns, useDeliveries } from '@/entities/delivery';
import { DataTable, EmptyLoading } from '@/shared/ui';

export function DeliveriesDataTable() {
  // TODO: add pagination
  const deliveriesQuery = useDeliveries(1, 50);
  if (deliveriesQuery.isLoading) {
    return <EmptyLoading spinning={true} />;
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <DataTable
          columns={deliveryColumns}
          data={deliveriesQuery.data?.hits ?? []}
        />
      </div>
    </div>
  );
}
