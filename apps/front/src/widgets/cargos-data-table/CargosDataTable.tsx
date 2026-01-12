'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { cargoColumns, useSuspenseCargos } from '@/entities/cargo';
import { CreateCargoDialog } from '@/features/create-cargo';
import { DataTable } from '@/shared/ui';
import { Plus } from 'lucide-react';

export function CargosDataTable() {
  const { data: cargos } = useSuspenseCargos();

  return (
    <div>
      <CreateCargoDialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </div>
      </CreateCargoDialog>
      <div className="overflow-x-scroll sm:max-w-70 lg:max-w-full">
        <DataTable columns={cargoColumns} data={cargos} />
      </div>
    </div>
  );
}
