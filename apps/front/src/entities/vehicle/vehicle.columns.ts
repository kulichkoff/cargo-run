import type { ColumnDef } from '@tanstack/react-table';
import type { VehicleModel } from './vehicle.model';

export const vehicleColumns: ColumnDef<VehicleModel>[] = [
  {
    accessorKey: 'plateNumber',
    header: 'Номер',
  },
  {
    accessorKey: 'make',
    header: 'Марка',
  },
  {
    accessorKey: 'model',
    header: 'Модель',
    enableHiding: true,
  },
  {
    accessorKey: 'manufactureYear',
    header: 'Год выпуска',
    enableHiding: true,
  },
  {
    accessorKey: 'vin',
    header: 'VIN',
    enableHiding: true,
  },
];
