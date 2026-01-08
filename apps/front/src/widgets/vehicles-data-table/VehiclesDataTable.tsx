'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { DataTable } from '@/shared/ui';
import { useSuspenseVehicles, vehicleColumns } from '@/entities/vehicle';
import { CreateVehicleDialog } from '@/features/create-vehicle';

export function VehiclesDataTable() {
  const { data: vehicles } = useSuspenseVehicles();

  return (
    <div>
      <CreateVehicleDialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </div>
      </CreateVehicleDialog>
      <DataTable columns={vehicleColumns} data={vehicles} />
    </div>
  );
}
