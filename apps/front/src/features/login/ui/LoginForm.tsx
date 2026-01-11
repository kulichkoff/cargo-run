'use client';

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';

export const loginFormSchema = z.object({
  username: z.string('Необходимо заполнить'),
  password: z.string('Необходимо заполнить'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: 'admin',
      password: 'topsecret',
    },
  });
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    axios.post('/api/auth/login', data).then(({ data }) => {
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit">Войти</Button>
      </form>
    </Form>
  );
}
