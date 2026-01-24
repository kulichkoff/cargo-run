import { ColumnDef } from '@tanstack/react-table';
import { CustomerModel } from './customer.model';
import { getCustomerTypeLocale } from '../lib';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export const customersColumns: ColumnDef<CustomerModel>[] = [
  {
    id: 'name',
    accessorFn: ({ companyName, companyType }) =>
      `${getCustomerTypeLocale(companyType)} «${companyName}»`,
    header: 'Название',
  },
  {
    id: 'inn-kpp',
    accessorFn: ({ inn, kpp }) => inn + (kpp ? '/' + kpp : ''),
    header: 'ИНН/КПП',
  },
  {
    accessorKey: 'ogrn',
    header: 'ОГРН',
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      //const customer = row.original;
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
            <DropdownMenuItem disabled>Редактировать</DropdownMenuItem>
            <DropdownMenuItem disabled>Удалить</DropdownMenuItem>
            <DropdownMenuItem disabled>Просмотреть заказы</DropdownMenuItem>
            <DropdownMenuItem disabled>Финансовые операции</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
