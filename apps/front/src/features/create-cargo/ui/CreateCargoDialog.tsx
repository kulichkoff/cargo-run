'use client';

import { useState } from 'react';
import { parseRoute, useCreateCargoForm } from '../lib';
import { SubmitHandler, useWatch } from 'react-hook-form';
import { CreateCargoFormData } from '../model';
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

export type CreateCargoDialogProps = React.PropsWithChildren;

/**
 * Expects to have <DialogTrigger /> node nested in children
 * to enable dialog open
 */
export function CreateCargoDialog({ children }: CreateCargoDialogProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useCreateCargoForm();
  const onSubmit: SubmitHandler<CreateCargoFormData> = (data) => {
    console.log('data', data);
    // setDialogIsOpen(false);
    // form.reset();
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

            <Button type="submit">Сохранить</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
