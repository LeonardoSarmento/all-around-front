import { ButtonGroup } from '@components/common/buttons/ButtonGroup';
import DynamicForm from '@components/common/form/DynamicForm';
import Header from '@components/header';
import { Card, CardContent, CardFooter } from '@components/ui/card';
import { Form } from '@components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { roles } from '@services/constants/labels';
import { queryOptionsUser } from '@services/query/user/useFetchUser';
import { useMutateUser } from '@services/query/user/useMutateUser';
import { UserSchema, UserType } from '@services/types/User';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/_auth/users/$userId')({
  loader: async ({ context: { queryClient }, params: { userId } }) => {
    const data = await queryClient.ensureQueryData(queryOptionsUser(+userId));
    return {
      data,
      crumb: data.name,
    };
  },
  component: EditUser,
});

function EditUser() {
  const { data } = Route.useLoaderData();
  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
    defaultValues: data,
  });

  const { mutate } = useMutateUser();
  const onSubmit = form.handleSubmit((values) => mutate(values));
  function handleReset() {
    form.reset({ name: '', email: '', company: '', role: 'OPERATOR' });
  }
  return (
    <>
      <Header title="Usuário: " user={form.watch('name')} />
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Card>
            <CardContent className="flex min-h-[450px] flex-col items-center justify-center gap-3 py-2">
              <div className="flex gap-3 max-lg:flex-col">
                <DynamicForm
                  control={form.control}
                  type="input"
                  name="name"
                  label="Nome"
                  placeholder="Nome"
                  className="w-[255px]"
                />
                <DynamicForm
                  control={form.control}
                  type="input"
                  name="company"
                  label="Empresa"
                  placeholder="Empresa"
                  className="w-[255px]"
                />
              </div>
              <div className="flex gap-3 max-lg:flex-col">
                <DynamicForm
                  control={form.control}
                  type="input"
                  name="email"
                  label="E-mail"
                  placeholder="Email"
                  className="w-[255px]"
                />
                <DynamicForm
                  control={form.control}
                  type="combobox"
                  label="Perfil"
                  name="role"
                  placeholder="Perfil"
                  comboboxoptions={roles}
                  className="w-[255px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <ButtonGroup clear={handleReset} buttons={['edit', 'back', 'clear']} />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  );
}
