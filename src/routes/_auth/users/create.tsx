import { ButtonGroup } from '@components/common/buttons/ButtonGroup'
import DynamicForm from '@components/common/form/DynamicForm'
import Header from '@components/header'
import { Card, CardContent, CardFooter } from '@components/ui/card'
import { Form } from '@components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roles } from '@services/constants/labels'
import { useMutateCreateUser } from '@services/query/user/useMutateCreateUser'
import { CreateUserSchema, CreateUserType } from '@services/types/User'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/_auth/users/create')({
  component: CreateUser,
})

function CreateUser() {
  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      email: '',
      role: 'OPERATOR',
      PasswordSchema: {
        password: '12qwaszx',
        confirmPassword: '12qwaszx'
      }
    },
  })

  const { mutate } = useMutateCreateUser()
  const onSubmit = form.handleSubmit((values) => mutate(values))
  function handleReset() {
    form.reset({ name: '', email: '', company: '', role: 'OPERATOR' })
  }
  return (
    <>
      <Header title="Novo Usuário: " user={form.watch('name')} />
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
              <DynamicForm
                control={form.control}
                type="password"
                name="PasswordSchema.password"
                label="Senha"
                placeholder="Senha"
                className="w-[255px]"
              />
            </CardContent>
            <CardFooter className="flex justify-center">
              <ButtonGroup
                clear={handleReset}
                buttons={['create', 'back', 'clear']}
              />
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  )
}
