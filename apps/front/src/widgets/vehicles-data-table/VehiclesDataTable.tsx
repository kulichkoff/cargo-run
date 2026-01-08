'use client';

import { useSuspenseVehicles, vehicleColumns } from '@/entities/vehicle';
import { DataTable } from '@/shared/ui';

export function VehiclesDataTable() {
  const { data: vehicles } = useSuspenseVehicles();

  return <DataTable columns={vehicleColumns} data={vehicles} />;
}
