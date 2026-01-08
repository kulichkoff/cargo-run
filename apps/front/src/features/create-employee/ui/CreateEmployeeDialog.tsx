'use client';

import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
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
import { useCreateEmployeeMutation } from '@/entities/employee';
import { useCreateEmployeeForm } from '../lib';
import { CreateEmployeeFormData } from '../model';

export type CreateEmployeeDialogProps = React.PropsWithChildren;

/**
 * Expects to have <DialogTrigger /> node nested in children
 * to enable dialog open
 */
export function CreateEmployeeDialog({ children }: CreateEmployeeDialogProps) {
  const createEmployeeMutation = useCreateEmployeeMutation();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreateEmployeeForm();
  const onSubmit: SubmitHandler<CreateEmployeeFormData> = (data) => {
    createEmployeeMutation.mutate(data);
    setDialogIsOpen(false);
    form.reset();
  };
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавление нового сотрудника</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Фамилия<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Петров" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Имя<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Иван" {...field} />
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
