import { ColumnDef } from '@tanstack/react-table';
import { TruckModel } from './truck.model';

export const trucksColumns: ColumnDef<TruckModel>[] = [
  {
    accessorKey: 'plateNumber',
    header: 'Номер',
  },
  {
    id: 'model',
    accessorFn: ({ make, model }) => `${make ?? ''} ${model ?? ''}`,
    header: 'Модель',
  },
  {
    accessorKey: 'vin',
    header: 'VIN-номер',
  },
  {
    accessorKey: 'year',
    header: 'Год выпуска',
  },
];
