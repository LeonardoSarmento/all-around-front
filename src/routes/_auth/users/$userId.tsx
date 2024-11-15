import { ButtonGroup } from '@components/common/buttons/ButtonGroup'
import DynamicForm from '@components/common/form/DynamicForm'
import Header from '@components/header'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Form } from '@components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roles } from '@services/constants/labels'
import { queryOptionsUser } from '@services/query/user/useFetchUser'
import { useMutateUser } from '@services/query/user/useMutateUser'
import { UserSchema, UserType } from '@services/types/User'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/_auth/users/$userId')({
  loader: ({ context: { queryClient }, params: { userId } }) =>
    queryClient.ensureQueryData(queryOptionsUser(userId)),
  component: EditUser,
})

function EditUser() {
  const userData = Route.useLoaderData()
  const form = useForm<UserType>({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
    defaultValues: userData,
  })

  const { mutate } = useMutateUser()
  const onSubmit = form.handleSubmit((values) => mutate(values))
  function handleReset() {
    form.reset({ name: '', email: '', company: '', role: 'OPERATOR' })
  }
  return (
    <div className="p-10">
      <Header title="Usuário: " user={form.watch('name')} />
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <Card>
            <CardContent className="flex min-h-[450px] flex-col items-center justify-center gap-5 p-4">
              <div className="flex gap-6">
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
              <div className="flex gap-6">
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
                  comboboxOptions={roles}
                  className="w-[255px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <ButtonGroup
                clear={handleReset}
                buttons={['edit', 'back', 'clear']}
              />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}
