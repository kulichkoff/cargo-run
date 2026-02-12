'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import {
  deliveryColumns,
  DeliveryStatus,
  useDeliveries,
} from '@/entities/delivery';
import { useCompleteDelivery } from '@/features/complete-delivery';
import { CreateDeliveryDialog } from '@/features/create-delivery';
import {
  AssignDriverDialog,
  AssignTruckDialog,
} from '@/features/delivery-assignment';
import { PickUpDeliveryDialog } from '@/features/pickup-delivery';
import { DataTable, EmptyLoading } from '@/shared/ui';
import { Plus } from 'lucide-react';
import { useState } from 'react';

export function DeliveriesDataTable() {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null,
  );
  const [assignDriverDialogOpen, setAssignDriverDialogOpen] = useState(false);
  const [assignTruckDialogOpen, setAssignTruckDialogOpen] = useState(false);
  const [pickUpDeliveryDialogOpen, setPickUpDeliveryDialogOpen] =
    useState(false);
  // TODO: add pagination
  const deliveriesQuery = useDeliveries(1, 50);

  const completeDeliveryMut = useCompleteDelivery();

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
          onRowsSelectionChange={(rows) => {
            const deliveries = deliveriesQuery.data?.hits;
            console.log(
              'selected deliveries',
              Object.keys(rows).map((idx) => deliveries?.[+idx]),
            );
          }}
          meta={{
            onAssignDriver: (deliveryId) => {
              setSelectedDeliveryId(deliveryId);
              setAssignDriverDialogOpen(true);
            },
            onAssignTruck: (deliveryId) => {
              setSelectedDeliveryId(deliveryId);
              setAssignTruckDialogOpen(true);
            },
            onSetStatus: (deliveryId, status) => {
              setSelectedDeliveryId(deliveryId);
              if (status === DeliveryStatus.PickedUp) {
                setPickUpDeliveryDialogOpen(true);
              } else if (status === DeliveryStatus.Delivered) {
                completeDeliveryMut.mutate({ deliveryId });
              }
            },
          }}
        />
      </div>

      {selectedDeliveryId && (
        <>
          <AssignDriverDialog
            deliveryId={selectedDeliveryId}
            open={assignDriverDialogOpen}
            onOpenChange={setAssignDriverDialogOpen}
          />
          <AssignTruckDialog
            deliveryId={selectedDeliveryId}
            open={assignTruckDialogOpen}
            onOpenChange={setAssignTruckDialogOpen}
          />
          <PickUpDeliveryDialog
            deliveryId={selectedDeliveryId}
            open={pickUpDeliveryDialogOpen}
            onOpenChange={setPickUpDeliveryDialogOpen}
          />
        </>
      )}
    </div>
  );
}
