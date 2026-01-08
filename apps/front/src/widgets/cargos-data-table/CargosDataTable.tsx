'use client';

import {
  cargoColumns,
  CargoDetailed,
  useSuspenseCargos,
} from '@/entities/cargo';
import { useSuspenseEmployees } from '@/entities/employee';
import { useSuspenseVehicles } from '@/entities/vehicle';
import { DataTable } from '@/shared/ui';

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
      <DataTable columns={cargoColumns} data={cargos} />
    </div>
  );
}
