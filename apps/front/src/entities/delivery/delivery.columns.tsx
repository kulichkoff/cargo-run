import { ColumnDef, RowData } from '@tanstack/react-table';
import {
  DeliveryModel,
  DeliveryStatus,
  getDeliveryStatusColorClass,
  getDeliveryStatusLocale,
} from './delivery.model';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dateToCalendar } from '@/shared/lib/transform/date';
import { Badge } from '@/components/ui/badge';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    onAssignDriver: (deliveryId: number) => void;
  }
}

export const deliveryColumns: ColumnDef<DeliveryModel>[] = [
  {
    id: 'driver',
    accessorFn: ({ driver }) =>
      driver
        ? `${driver?.lastName} ${driver?.firstName[0].toUpperCase()}.`
        : '-',
    header: 'Водитель',
  },
  {
    id: 'truck',
    accessorFn: ({ truck }) =>
      truck ? `${truck?.make} ${truck?.plateNumber}` : '-',
    header: 'Машина',
  },
  {
    id: 'customer',
    accessorFn: ({ customer }) => (customer ? customer?.companyName : '-'),
    header: 'Заказчик',
  },
  {
    id: 'pickupTime',
    accessorFn: ({ pickupTime }) =>
      pickupTime ? dateToCalendar(pickupTime) : '-',
    header: 'Время выдачи',
  },
  {
    id: 'pickupAddress',
    accessorKey: 'pickupAddress',
    header: 'Пункт выдачи',
  },
  {
    id: 'deliveryDeadline',
    accessorFn: ({ deliveryDeadline }) =>
      deliveryDeadline ? dateToCalendar(deliveryDeadline) : '-',
    header: 'Срок доставки',
  },
  {
    id: 'deliveryAddress',
    accessorKey: 'deliveryAddress',
    header: 'Пункт доставки',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      return (
        <Badge className={getDeliveryStatusColorClass(row.original.status)}>
          {getDeliveryStatusLocale(row.original.status)}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const delivery = row.original;
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
            <DropdownMenuItem
              onClick={() => table.options.meta?.onAssignDriver?.(delivery.id)}
            >
              Назначить водителя
            </DropdownMenuItem>
            <DropdownMenuItem>Назначить машину</DropdownMenuItem>
            <DropdownMenuItem>Установить заказчика</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Установить статус</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {Object.values(DeliveryStatus).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    disabled={delivery.status === status}
                  >
                    {getDeliveryStatusLocale(status)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Прикрепить документы</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Просмотреть водителя</DropdownMenuItem>
            <DropdownMenuItem disabled>Просмотреть машину</DropdownMenuItem>
            <DropdownMenuItem disabled>Просмотреть заказчика</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
