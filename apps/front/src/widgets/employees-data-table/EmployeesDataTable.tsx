'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
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
import {
  employeeColumns,
  useCreateEmployeeMutation,
  useSuspenseEmployees,
} from '@/entities/employee';
import { DataTable } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const employeeSchema = z.object({
  firstName: z.string('Обязательное поле'),
  lastName: z.string('Обязательное поле'),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export function EmployeesDataTable() {
  const { data: employees } = useSuspenseEmployees();
  const createEmployeeMutation = useCreateEmployeeMutation();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });
  const onSubmit: SubmitHandler<EmployeeFormData> = (data) => {
    createEmployeeMutation.mutate(data);
    setDialogIsOpen(false);
    form.reset();
  };

  return (
    <div>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <div className="pb-3 flex flex-row w-full gap-3 items-center justify-end">
          <DialogTrigger>
            <Button size="sm" disabled={createEmployeeMutation.isPending}>
              <Plus />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Добавление нового сотрудника</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
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
        </div>
      </Dialog>
      <DataTable columns={employeeColumns} data={employees} />
    </div>
  );
}
