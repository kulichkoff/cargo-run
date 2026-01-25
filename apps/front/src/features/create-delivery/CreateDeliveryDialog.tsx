'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCustomerTypeLocale, useCustomersQuery } from '@/entities/customer';
import { dateToCalendar } from '@/shared/lib/transform/date';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { useCreateDelivery } from './useCreateDelivery';

export type CreateDeliveryDialogProps = React.PropsWithChildren;

export const CreateDeliverySchema = z.object({
  customerId: z.coerce.number().int().positive('Необходимо выбрать клиента'),
  deliveryDeadline: z.date(),
  pickupAddress: z.string().min(1, 'Необходимо заполнить адрес выдачи'),
  deliveryAddress: z.string().min(1, 'Необходимо заполнить адрес доставки'),
  cargo: z.array(
    z.object({
      description: z.string().min(1, 'Необходимо заполнить название груза'),
      volumeM3: z.coerce
        .number()
        .positive('Объем груза должен быть больше 0')
        .optional(),
      weightKg: z.coerce
        .number()
        .positive('Вес груза должен быть больше 0')
        .optional(),
    }),
  ),
});

export type CreateDeliveryFormData = z.infer<typeof CreateDeliverySchema>;

export function useCreateDeliveryForm() {
  return useForm({
    resolver: zodResolver(CreateDeliverySchema),
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      cargo: [],
    },
  });
}

export function CreateDeliveryDialog({ children }: CreateDeliveryDialogProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const form = useCreateDeliveryForm();
  const createDeliveryMutation = useCreateDelivery();
  const onSubmit: SubmitHandler<CreateDeliveryFormData> = async (data) => {
    await createDeliveryMutation.mutateAsync(data);
    form.reset();
    setDialogIsOpen(false);
  };

  const customersQuery = useCustomersQuery();

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавление новой доставки</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Клиент</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={(field.value as number)?.toString() ?? ''}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите клиента" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customersQuery.data?.map((customer) => (
                        <SelectItem
                          key={customer.id}
                          value={customer.id.toString()}
                        >
                          {`${getCustomerTypeLocale(customer.companyType)} «${customer.companyName}»`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес загрузки</FormLabel>
                  <FormControl>
                    <Input placeholder="Адрес загрузки" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Адрес доставки</FormLabel>
                  <FormControl>
                    <Input placeholder="Адрес доставки" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deliveryDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Срок доставки</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          data-empty={!field.value}
                          variant="outline"
                          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                        >
                          <CalendarIcon />
                          {field.value ? (
                            dateToCalendar(field.value)
                          ) : (
                            <span>Выберите дату</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={createDeliveryMutation.isPending}>
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
