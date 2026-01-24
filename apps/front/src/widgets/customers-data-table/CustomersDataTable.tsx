'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { customersColumns } from '@/entities/customer/model/customer.columns';
import { CreateCustomerDialog } from '@/features/create-customer';
import { DataTable, EmptyLoading } from '@/shared/ui';
import { useCustomersQuery } from '@/entities/customer';
import { Plus } from 'lucide-react';

export function CustomersDataTable() {
  const customersQuery = useCustomersQuery();
  if (customersQuery.isLoading) {
    return <EmptyLoading spinning={true} />;
  }
  return (
    <div>
      <CreateCustomerDialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </div>
      </CreateCustomerDialog>
      <div className="overflow-x-auto">
        <DataTable
          columns={customersColumns}
          data={customersQuery.data ?? []}
        />
      </div>
    </div>
  );
}
