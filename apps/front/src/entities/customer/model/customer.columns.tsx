import { ColumnDef } from '@tanstack/react-table';
import { CustomerModel } from './customer.model';
import { getCustomerTypeLocale } from '../lib';

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
];
