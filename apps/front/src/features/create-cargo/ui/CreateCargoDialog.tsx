'use client';

import { useState } from 'react';
import { parseRoute, useCreateCargoForm } from '../lib';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { CreateCargoDTO, CreateCargoFormData } from '../model';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEmployees } from '@/entities/employee';
import { useVehicles } from '@/entities/vehicle';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { PaymentStatus } from '@/entities/payment';
import { useCreateCargoMut } from '../api';

export type CreateCargoDialogProps = React.PropsWithChildren;

/**
 * Expects to have <DialogTrigger /> node nested in children
 * to enable dialog open
 */
export function CreateCargoDialog({ children }: CreateCargoDialogProps) {
  const createCargoMut = useCreateCargoMut();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const { data: employees, isPending: employeesPending } = useEmployees();
  const { data: vehicles, isPending: vehiclesPending } = useVehicles();

  const form = useCreateCargoForm();
  const onSubmit: SubmitHandler<CreateCargoFormData> = (data) => {
    const dto: CreateCargoDTO = {
      ...data,
      addressSequence: parseRoute(addressSequenceValue),
      vehicleId: +data.vehicleId,
      employeeId: +data.employeeId,
      paymentStatus: PaymentStatus.Pending,
      price: parseFloat(data.price),
    };
    createCargoMut.mutate(dto);
    setDialogIsOpen(false);
    form.reset();
  };
  const addressSequenceValue = useWatch({
    control: form.control,
    name: 'addressSequence',
  });

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}

      <DialogContent className="sm:max-w-110">
        <DialogHeader>
          <DialogTitle>Добавление перевозки</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="addressSequence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Маршрут<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Волгоград; Москва; Саратов"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {addressSequenceValue.length > 1
                      ? parseRoute(addressSequenceValue).join(' — ')
                      : 'Заполняется через точку с запятой'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Цена<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1234567.89" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Водитель<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={field.disabled || employeesPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Иванов И." />
                      </SelectTrigger>
                    </FormControl>
                    {!employeesPending && (
                      <SelectContent>
                        {employees!.map((employee) => (
                          <SelectItem
                            key={employee.id}
                            value={employee.id.toString()}
                          >{`${employee.lastName} ${employee.firstName}`}</SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Машина<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={field.disabled || vehiclesPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="МАЗ М012КВ134" />
                      </SelectTrigger>
                    </FormControl>
                    {!vehiclesPending && (
                      <SelectContent>
                        {vehicles!.map((vehicle) => (
                          <SelectItem
                            key={vehicle.id}
                            value={vehicle.id.toString()}
                          >{`${vehicle.make ? vehicle.make + ' ' : ''}${vehicle.plateNumber}`}</SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              {/* TODO move date pickers to separate component */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>
                      Начало<span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                          >
                            <CalendarIcon />
                            <span>
                              {' '}
                              {field.value
                                ? field.value.toLocaleDateString()
                                : 'Выберите дату'}
                            </span>
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadlineDate"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>
                      Срок<span className="text-red-500">*</span>
                    </FormLabel>
                    <Popover>
                      <FormControl>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            data-empty={!field.value}
                            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                          >
                            <CalendarIcon />
                            <span>
                              {' '}
                              {field.value
                                ? field.value.toLocaleDateString()
                                : 'Выберите дату'}
                            </span>
                          </Button>
                        </PopoverTrigger>
                      </FormControl>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Сохранить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
