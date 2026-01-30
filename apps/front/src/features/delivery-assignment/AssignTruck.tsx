import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useState } from 'react';
import { useAssignTruck } from './useAssignTruck';
import { useTrucksQuery } from '@/entities/truck';

export type AssignTruckDialogProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  deliveryId: number;
}>;

export function AssignTruckDialog({
  children,
  open,
  onOpenChange,
  deliveryId,
}: AssignTruckDialogProps) {
  const [truckId, setTruckId] = useState<number | null>(null);
  const assignTruckMut = useAssignTruck();
  const trucksQuery = useTrucksQuery();

  const onSubmit = async () => {
    if (truckId !== null) {
      await assignTruckMut.mutateAsync({ deliveryId, truckId });
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={open ?? false} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Назначить грузовик</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2"></div>
          <Label>Грузовик</Label>
          <Select
            value={truckId?.toString() ?? ''}
            onValueChange={(value) => setTruckId(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите грузовик" />
            </SelectTrigger>
            <SelectContent>
              {trucksQuery.data?.map((truck) => (
                <SelectItem key={truck.id} value={truck.id.toString()}>
                  {`${truck.make ? truck.make + ' ' : ''} ${truck.model ? truck.model : ''} ${truck.plateNumber}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            onClick={() => onSubmit()}
            disabled={!truckId || assignTruckMut.isPending}
          >
            Назначить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
