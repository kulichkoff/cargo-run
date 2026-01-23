'use client';

import { SubmitHandler, useWatch } from 'react-hook-form';
import { useCreateCustomerMut } from '../api';
import { useCreateCustomerForm } from '../lib';
import { useState } from 'react';
import { CreateCustomerFormData } from '../model';
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
import { CompanyType, getCustomerTypeLocale } from '@/entities/customer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type CreateCustomerDialogProps = React.PropsWithChildren;

export function CreateCustomerDialog({ children }: CreateCustomerDialogProps) {
  const createCustomerMutation = useCreateCustomerMut();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreateCustomerForm();
  const onSubmit: SubmitHandler<CreateCustomerFormData> = (data) => {
    createCustomerMutation.mutate(data);
    setDialogIsOpen(false);
    form.reset();
  };

  const customerTypes = Object.values(CompanyType);

  const customerTypeValue = useWatch({
    control: form.control,
    name: 'companyType',
  });

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Добавление нового клиента</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Название компании<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Рога и Копыта" {...field} />
                  </FormControl>
                  <FormDescription>Без кавычек, ООО или ИП</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Тип компании<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="ИП" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customerTypes.map((typeKey) => (
                        <SelectItem key={typeKey} value={typeKey}>
                          {getCustomerTypeLocale(typeKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ИНН<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ИНН" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {customerTypeValue !== CompanyType.Individual && (
              <FormField
                control={form.control}
                name="kpp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      КПП<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="КПП" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="ogrn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ОГРН<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="ОГРН" {...field} />
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
