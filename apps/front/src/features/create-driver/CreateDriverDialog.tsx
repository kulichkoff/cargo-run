import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateDriver } from './useCreateDriver';
import { useState } from 'react';
import { useCreateDriverForm } from './useCreateDriverForm';
import { SubmitHandler } from 'react-hook-form';
import { CreateDriverFormData } from './create-driver.schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export type CreateDriverDialogProps = React.PropsWithChildren;

export function CreateDriverDialog({ children }: CreateDriverDialogProps) {
  const createDriverMutation = useCreateDriver();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const form = useCreateDriverForm();
  const onSubmit: SubmitHandler<CreateDriverFormData> = async (data) => {
    await createDriverMutation.mutateAsync(data);
    setDialogIsOpen(false);
    form.reset();
  };
  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавление нового водителя</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
