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
    <>
      <div className={'grid min-w-[450px] gap-6'} {...props}>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <DynamicForm
                  control={form.control}
                  name="email"
                  placeholder="E-mail"
                  type="input"
                />
                <DynamicForm
                  control={form.control}
                  name="password"
                  placeholder="Senha"
                  type="password"
                />
              </div>
              <Button type="submit">
                Acessar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
