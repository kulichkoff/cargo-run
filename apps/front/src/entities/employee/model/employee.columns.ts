import { ColumnDef } from '@tanstack/react-table';
import { EmployeeModel } from './employee.model';

export const employeeColumns: ColumnDef<EmployeeModel>[] = [
  {
    accessorKey: 'firstName',
    header: 'Имя',
  },
  {
    accessorKey: 'lastName',
    header: 'Фамилия',
  },
];
