import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePickUpDelivery } from './usePickUpDelivery';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { dateToCalendar } from '@/shared/lib/transform/date';
import { Calendar } from '@/components/ui/calendar';

export type PickUpDeliveryDialogProps = React.PropsWithChildren<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  deliveryId: number;
}>;

export function PickUpDeliveryDialog({
  children,
  open,
  onOpenChange,
  deliveryId,
}: PickUpDeliveryDialogProps) {
  const [pickedUpAt, setPickedUpAt] = useState<Date | null>(new Date());
  const pickUpDeliveryMut = usePickUpDelivery();

  const onSubmit = async () => {
    await pickUpDeliveryMut.mutateAsync({
      deliveryId,
      pickedUpAt: pickedUpAt ?? new Date(),
    });
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Время погрузки</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2"></div>
          <Label>Время погрузки</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                data-empty={!pickedUpAt}
                variant="outline"
                className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
              >
                <CalendarIcon />
                {pickedUpAt ? (
                  dateToCalendar(pickedUpAt)
                ) : (
                  <span>Выберите дату</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                required
                selected={pickedUpAt ?? undefined}
                onSelect={setPickedUpAt}
              />
            </PopoverContent>
          </Popover>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={pickUpDeliveryMut.isPending || !pickedUpAt}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
