'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { useTrucksQuery } from '@/entities/truck';
import { trucksColumns } from '@/entities/truck/columns';
import { CreateTruckDialog } from '@/features/create-truck';
import { DataTable, EmptyLoading } from '@/shared/ui';
import { Plus } from 'lucide-react';

export function TrucksDataTable() {
  const trucksQuery = useTrucksQuery();
  if (trucksQuery.isLoading) {
    return <EmptyLoading spinning={true} />;
  }
  return (
    <div>
      <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
        <CreateTruckDialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </CreateTruckDialog>
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={trucksColumns} data={trucksQuery.data ?? []} />
      </div>
    </div>
  );
}
