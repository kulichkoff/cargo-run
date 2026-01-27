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
import { useDriversQuery } from '@/entities/driver';
import { useState } from 'react';
import { useAssignDriver } from './useAssign';

export type AssignDriverDialogProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  deliveryId: number;
}>;

export function AssignDriverDialog({
  children,
  open,
  onOpenChange,
  deliveryId,
}: AssignDriverDialogProps) {
  const [driverId, setDriverId] = useState<number | null>(null);
  const assignDriverMut = useAssignDriver();
  const driversQuery = useDriversQuery();

  const onSubmit = async () => {
    if (driverId !== null) {
      await assignDriverMut.mutateAsync({ deliveryId, driverId });
      onOpenChange?.(false);
    }
  };

  return (
    <Dialog open={open ?? false} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Назначить водителя</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2"></div>
          <Label>Водитель</Label>
          <Select
            value={driverId?.toString() ?? ''}
            onValueChange={(value) => setDriverId(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите водителя" />
            </SelectTrigger>
            <SelectContent>
              {driversQuery.data?.map((driver) => (
                <SelectItem key={driver.id} value={driver.id.toString()}>
                  {driver.firstName} {driver.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            onClick={() => onSubmit()}
            disabled={!driverId || assignDriverMut.isPending}
          >
            Назначить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
