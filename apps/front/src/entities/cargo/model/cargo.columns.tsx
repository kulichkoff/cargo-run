import { ColumnDef } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  getPaymentStatusLabels,
  PaymentStatus,
  PaymentStatusIterable,
} from '@/entities/payment';
import { CargoDetailed } from './cargo.model';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useUpdateCargo } from '../api';

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
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const cargo = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const paymentStatusMut = useUpdateCargo();

      const paymentStatusLabels = getPaymentStatusLabels();
      const paymentStatuses = PaymentStatusIterable;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Установить статус оплаты
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {paymentStatuses.map((status, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      disabled={cargo.paymentStatus === status}
                      onClick={() =>
                        paymentStatusMut.mutate({
                          id: cargo.id,
                          paymentStatus: status,
                        })
                      }
                    >
                      {paymentStatusLabels[status]}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Просмотреть водителя</DropdownMenuItem>
            <DropdownMenuItem disabled>Просмотреть машину</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
