import { ColumnDef } from '@tanstack/react-table';
import { DriverModel } from './driver.model';

export const driversColumns: ColumnDef<DriverModel>[] = [
  {
    accessorKey: 'firstName',
    header: 'Имя',
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
  },
];
