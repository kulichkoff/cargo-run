'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  cargoColumns,
  CargoDetailed,
  useSuspenseCargos,
} from '@/entities/cargo';
import { useSuspenseEmployees } from '@/entities/employee';
import { useSuspenseVehicles } from '@/entities/vehicle';
import { CreateCargoDialog } from '@/features/create-cargo';
import { DataTable } from '@/shared/ui';
import { Plus } from 'lucide-react';

const useSuspenceCargosDetailed = () => {
  const { data: cargos } = useSuspenseCargos();
  const { data: employees } = useSuspenseEmployees();
  const { data: vehicles } = useSuspenseVehicles();

  const cargosMapped = cargos.map<CargoDetailed>((cargo) => {
    const employee = employees.find((e) => e.id === cargo.employeeId)!;
    const vehicle = vehicles.find((v) => v.id === cargo.vehicleId)!;

    return {
      ...cargo,
      employee,
      vehicle,
    } satisfies CargoDetailed;
  });

  return { data: cargosMapped };
};

export function CargosDataTable() {
  const { data: cargos } = useSuspenceCargosDetailed();

  return (
    <div>
      <CreateCargoDialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </div>
      </CreateCargoDialog>
      <div className="overflow-x-scroll sm:max-w-70 lg:max-w-full">
        <DataTable columns={cargoColumns} data={cargos} />
      </div>
    </div>
  );
}
