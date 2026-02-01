'use client';

import { Button } from '@/components/ui/button';
import { useDriversQuery } from '@/entities/driver';
import { driversColumns } from '@/entities/driver/columns';
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
        <Button size="sm">
          <Plus />
          Добавить
        </Button>
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={driversColumns} data={driversQuery.data ?? []} />
      </div>
    </div>
  );
}
