'use client';

import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
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
import { useCreateVehicleMutation } from '@/entities/vehicle';
import { useCreateVehicleForm } from '../lib';
import { CreateVehicleFormData } from '../model';

export type CreateVehicleDialogProps = React.PropsWithChildren;

/**
 * Expects to have <DialogTrigger /> node nested in children
 * to enable dialog open
 */
export function CreateVehicleDialog({ children }: CreateVehicleDialogProps) {
  const createVehicleMutation = useCreateVehicleMutation();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreateVehicleForm();
  const onSubmit: SubmitHandler<CreateVehicleFormData> = (data) => {
    createVehicleMutation.mutate({
      ...data,
      manufactureYear: parseInt(data.manufactureYear || '') || undefined,
    });
    setDialogIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавление нового транспорта</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
    </Dialog>
  );
}
