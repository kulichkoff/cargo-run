import { ColumnDef } from '@tanstack/react-table';
import { DeliveryModel, DeliveryStatus } from './delivery.model';
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

export const deliveryColumns: ColumnDef<DeliveryModel>[] = [
  {
    id: 'driver',
    accessorFn: ({ driver }) =>
      driver ? `${driver?.lastName} ${driver?.firstName[0].toUpperCase()}.` : '-',
    header: 'Водитель',
  },
  {
    id: 'truck',
    accessorFn: ({ truck }) => truck ? `${truck?.make} ${truck?.plateNumber}` : '-',
    header: 'Машина',
  },
  {
    id: 'customer',
    accessorFn: ({ customer }) => customer ? customer?.companyName : '-',
    header: 'Заказчик',
  },
  {
    id: 'pickupAddress',
    accessorKey: 'pickupAddress',
    header: 'Пункт выдачи',
  },
  {
    id: 'deliveryAddress',
    accessorKey: 'deliveryAddress',
    header: 'Пункт доставки',
  },
  {
    id: 'pickupTime',
    accessorKey: 'pickupTime',
    header: 'Время выдачи',
  },
  {
    id: 'deliveryDeadline',
    accessorKey: 'deliveryDeadline',
    header: 'Срок доставки',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ row }) => {
      switch (row.original.status) {
        case DeliveryStatus.Created:
          return 'Создан';
        case DeliveryStatus.PickedUp:
          return 'Выдан';
        case DeliveryStatus.Delivered:
          return 'Доставлен';
        case DeliveryStatus.Canceled:
          return 'Отменен';
      }
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
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
            <DropdownMenuItem>Назначить водителя</DropdownMenuItem>
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
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
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
