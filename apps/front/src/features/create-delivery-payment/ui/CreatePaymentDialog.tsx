'use client';

import { SubmitHandler } from 'react-hook-form';
import { useCreatePayment } from '../api';
import { useCreatePaymentForm } from '../lib';
import { useState } from 'react';
import { CreatePaymentFormData } from '../model';
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
import { Button } from '@/components/ui/button';
import {
  TransactionStatus,
  TransactionType,
  type CreateTransactionDto,
} from '@/entities/transaction';

export type CreatePaymentDialogProps = React.PropsWithChildren<{
  deliveryIds: number[];
}>;

export function CreatePaymentDialog({
  children,
  deliveryIds,
}: CreatePaymentDialogProps) {
  const createPaymentMutation = useCreatePayment();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreatePaymentForm();
  const onSubmit: SubmitHandler<CreatePaymentFormData> = async (data) => {
    const dto: CreateTransactionDto = {
      ...data,
      type: TransactionType.Income,
      status: TransactionStatus.Completed,
      deliveries: deliveryIds,
    };

    await createPaymentMutation.mutateAsync(dto);
    setDialogIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавление оплаты за доставки</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Сумма<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="5000"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value ? parseFloat(value) : 0);
                      }}
                      value={field.value?.toString() ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Категория<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Перевозка" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Описание<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Описание платежа" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-sm text-muted-foreground">
              Доставок: {deliveryIds.length}
            </div>

            <Button type="submit" disabled={createPaymentMutation.isPending}>
              {createPaymentMutation.isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
