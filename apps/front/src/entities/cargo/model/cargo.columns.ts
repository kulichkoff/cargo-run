import { ColumnDef } from '@tanstack/react-table';

import { PaymentStatus } from '@/entities/payment';
import { CargoDetailed } from './cargo.model';

export const cargoColumns: ColumnDef<CargoDetailed>[] = [
  {
    id: 'employee',
    accessorFn: ({ employee }) =>
      `${employee.lastName} ${employee.firstName[0].toUpperCase()}.`,
    header: 'Водитель',
  },
  {
    id: 'vehicle',
    accessorFn: ({ vehicle }) =>
      `${vehicle.make ? vehicle.make + ' ' : ''}${vehicle.plateNumber}`,
    header: 'Машина',
  },
  {
    id: 'startDate',
    accessorFn: (row) => row.startDate.toLocaleDateString(),
    header: 'Начало',
  },
  {
    id: 'deadlineDate',
    accessorFn: (row) => row.deadlineDate.toLocaleDateString(),
    header: 'Срок',
  },
  {
    id: 'addressSequence',
    accessorFn: (row) => row.addressSequence.join(' — '),
    header: 'Маршрут',
  },
  {
    accessorKey: 'price',
    header: 'Цена',
  },
  {
    id: 'paymentStatus',
    accessorFn: (row) => {
      switch (row.paymentStatus) {
        case PaymentStatus.Canceled:
          return 'Отменен';
        case PaymentStatus.Failed:
          return 'Ошибка';
        case PaymentStatus.Pending:
          return 'В процессе';
        case PaymentStatus.Paid:
          return 'Оплачено';
      }
    },
    header: 'Статус оплаты',
  },
];
