'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useSuspenseVehicles, vehicleColumns } from '@/entities/vehicle';
import { useCreateVehicleMutation } from '@/entities/vehicle/api/useCreateVehicle';
import { DataTable } from '@/shared/ui';
import { Plus } from 'lucide-react';
import z from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const vehicleSchema = z.object({
  plateNumber: z.string().min(7, 'Слишком короткий номер'),
  make: z.string().optional(),
  model: z.string().optional(),
  // TODO think about numbre type here
  manufactureYear: z.string().optional(),
  vin: z.string().optional(),
});
type VehicleFormData = z.infer<typeof vehicleSchema>;

export function VehiclesDataTable() {
  const { data: vehicles } = useSuspenseVehicles();
  const createVehicleMutation = useCreateVehicleMutation();
  const form = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      plateNumber: '',
      make: '',
      model: '',
      manufactureYear: '',
      vin: '',
    },
  });
  const onSubmit: SubmitHandler<VehicleFormData> = (data) => {
    createVehicleMutation.mutate({
      ...data,
      manufactureYear: parseInt(data.manufactureYear || '') || undefined,
    });
    form.reset();
  };

  return (
    <div>
      <Dialog>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger asChild>
            <Button size="sm" disabled={createVehicleMutation.isPending}>
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Создание нового транспорта</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="plateNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Гос. номер<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="А123АА123" {...field} />
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
                        <Input placeholder="1G1RC5D59H1234567" {...field} />
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
                        <Input placeholder="ГАЗЕЛЬ" {...field} />
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
                        <Input placeholder="ГАЗ-3302" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="manufactureYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Год выпуска</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2012" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Сохранить</Button>
              </form>
            </Form>
          </DialogContent>
        </div>
      </Dialog>
      <DataTable columns={vehicleColumns} data={vehicles} />
    </div>
  );
}
