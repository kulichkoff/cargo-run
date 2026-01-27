'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { deliveryColumns, useDeliveries } from '@/entities/delivery';
import { CreateDeliveryDialog } from '@/features/create-delivery';
import { AssignDriverDialog } from '@/features/delivery-assignment';
import { DataTable, EmptyLoading } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function DeliveriesDataTable() {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null,
  );
  const [assignDriverDialogOpen, setAssignDriverDialogOpen] = useState(false);
  // TODO: add pagination
  const deliveriesQuery = useDeliveries(1, 50);
  if (deliveriesQuery.isLoading) {
    return <EmptyLoading spinning={true} />;
  }
  return (
    <div>
      <CreateDeliveryDialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </div>
      </CreateDeliveryDialog>
      <div className="overflow-x-auto">
        <DataTable
          columns={deliveryColumns}
          data={deliveriesQuery.data?.hits ?? []}
          meta={{
            onAssignDriver: (deliveryId) => {
              setSelectedDeliveryId(deliveryId);
              setAssignDriverDialogOpen(true);
            },
          }}
        />
      </div>

      {selectedDeliveryId && (
        <AssignDriverDialog
          deliveryId={selectedDeliveryId}
          open={assignDriverDialogOpen}
          onOpenChange={setAssignDriverDialogOpen}
        />
      )}
    </div>
  );
}
