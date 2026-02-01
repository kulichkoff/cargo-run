'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { useDriversQuery } from '@/entities/driver';
import { driversColumns } from '@/entities/driver/columns';
import { CreateDriverDialog } from '@/features/create-driver/CreateDriverDialog';
import { DataTable, EmptyLoading } from '@/shared/ui';
import { Plus } from 'lucide-react';

export function DriversDataTable() {
  const driversQuery = useDriversQuery();
  if (driversQuery.isLoading) {
    return <EmptyLoading spinning={true} />;
  }
  return (
    <div>
      <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
        <CreateDriverDialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </CreateDriverDialog>
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={driversColumns} data={driversQuery.data ?? []} />
      </div>
    </div>
  );
}
