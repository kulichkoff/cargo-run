'use client';

import { Button } from '@/components/ui/button';
import { useSuspenseVehicles, vehicleColumns } from '@/entities/vehicle';
import { useCreateVehicleMutation } from '@/entities/vehicle/api/useCreateVehicle';
import { DataTable } from '@/shared/ui';
import { Plus } from 'lucide-react';

export function VehiclesDataTable() {
  const { data: vehicles } = useSuspenseVehicles();
  const createVehicleMutation = useCreateVehicleMutation();

  return (
    <div>
      <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
        <Button
          size="sm"
          disabled={createVehicleMutation.isPending}
          onClick={() => {
            createVehicleMutation.mutate({
              plateNumber: 'W777OW134',
            });
          }}
        >
          <Plus />
          Добавить
        </Button>
      </div>
      <DataTable columns={vehicleColumns} data={vehicles} />
    </div>
  );
}
