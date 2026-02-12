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
import { CreatePaymentDialog } from '@/features/create-delivery-payment';
import { DataTable, EmptyLoading } from '@/shared/ui';
import { Plus, BanknoteArrowDown } from 'lucide-react';
import { useState } from 'react';
import { PaginationState } from '@tanstack/react-table';

export function DeliveriesDataTable() {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null,
  );
  const [selectedDeliveryIds, setSelectedDeliveryIds] = useState<number[]>([]);
  const [assignDriverDialogOpen, setAssignDriverDialogOpen] = useState(false);
  const [assignTruckDialogOpen, setAssignTruckDialogOpen] = useState(false);
  const [pickUpDeliveryDialogOpen, setPickUpDeliveryDialogOpen] =
    useState(false);

  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 50 });
  const deliveriesQuery = useDeliveries(pagination.pageIndex + 1, pagination.pageSize);

  const completeDeliveryMut = useCompleteDelivery();

  if (deliveriesQuery.isLoading) {
    return <EmptyLoading spinning={true} />;
  }
  return (
    <div>
      <div className="pb-3 flex flex-row w-full gap-3 items-center justify-between">
        <div className="flex gap-2 items-center">
          {selectedDeliveryIds.length > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                Выбрано: {selectedDeliveryIds.length}
              </span>
              <CreatePaymentDialog deliveryIds={selectedDeliveryIds}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <BanknoteArrowDown />
                    Создать платеж
                  </Button>
                </DialogTrigger>
              </CreatePaymentDialog>
            </>
          )}
        </div>
        <CreateDeliveryDialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
        </CreateDeliveryDialog>
      </div>
      <div className="overflow-x-auto">
        <DataTable
          columns={deliveryColumns}
          data={deliveriesQuery.data?.hits ?? []}
          onRowsSelectionChange={(rows) => {
            console.log('rows', rows);
            const deliveries = deliveriesQuery.data?.hits;
            const selectedDeliveries = Object.keys(rows).map(
              (idx) => deliveries?.[+idx],
            );
            const deliveryIds = selectedDeliveries
              .filter((d) => d?.id)
              .map((d) => d!.id);
            setSelectedDeliveryIds(deliveryIds);
          }}
          rowCount={deliveriesQuery.data?.total ?? -1}
          manualPagination
          pagination={pagination}
          onPaginationChange={setPagination}
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
