import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './ui/form';
import { Button } from './ui/button';
import DynamicForm from './common/form/DynamicForm';
import { LoginSchema, LoginType } from '@services/types/Login';
import { useMutateLogin } from '@services/query/auth/useMutateLogin';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ ...props }: UserAuthFormProps) {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate } = useMutateLogin();
  const onSubmit = form.handleSubmit((values) => mutate(values));

  return (
    <div {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="flex min-w-[300px] flex-col gap-y-1 sm:min-w-[350px]">
            <DynamicForm
              control={form.control}
              name="email"
              placeholder="E-mail"
              type="input"
              description="Apenas escreva um email válido e acesse tudo que temos disponível :)"
            />
            <DynamicForm control={form.control} name="password" placeholder="Senha" type="password" />
            <Button type="submit">Acessar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
