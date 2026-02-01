import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useCreateTruck } from './useCreateTruck';
import { useCreateTruckForm } from './useCreateTruckForm';
import { SubmitHandler } from 'react-hook-form';
import { CreateTruckFormData } from './create-truck.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export type CreateTruckDialogProps = React.PropsWithChildren;

export function CreateTruckDialog({ children }: CreateTruckDialogProps) {
  const createTruckMutation = useCreateTruck();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreateTruckForm();
  const onSubmit: SubmitHandler<CreateTruckFormData> = async (data) => {
    await createTruckMutation.mutateAsync(data);
    setDialogIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление нового грузовика</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="plateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер машины</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Марка</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Модель</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Год выпуска</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value?.toString() ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Добавить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
