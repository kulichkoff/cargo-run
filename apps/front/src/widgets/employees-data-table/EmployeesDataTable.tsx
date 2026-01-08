'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { employeeColumns, useSuspenseEmployees } from '@/entities/employee';
import { CreateEmployeeDialog } from '@/features/create-employee';
import { DataTable } from '@/shared/ui';

export function EmployeesDataTable() {
  const { data: employees } = useSuspenseEmployees();

  return (
    <div>
      <CreateEmployeeDialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </div>
      </CreateEmployeeDialog>
      <DataTable columns={employeeColumns} data={employees} />
    </div>
  );
}
