import { createFileRoute } from '@tanstack/react-router';
import Header from '@components/header';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DynamicForm from '@components/common/form/DynamicForm';
import {
  DynamicSchemaTestingComponent,
  DynamicSchemaTestingComponentType,
} from '@services/types/common/DynamicFormType';
import { Form } from '@components/ui/form';
import { toast } from 'sonner';
import { Button } from '@components/ui/button';

export const Route = createFileRoute('/_auth/components/')({
  component: ComponentsComponent,
});

function ComponentsComponent() {
  const form = useForm<DynamicSchemaTestingComponentType>({
    resolver: zodResolver(DynamicSchemaTestingComponent),
    mode: 'onChange',
    defaultValues: {
      checkbox: [],
      input: '',
      password: '',
      multiSelect: [],
      textarea: '',
    },
  });

  const onSubmit = form.handleSubmit(() => {
    toast.success('Testado com sucesso', {
      description: 'Todos componentes estão prontos para uso!',
    });
  });

  return (
    <>
      <Header
        title="Componentes"
        description="Lista de componentes criados de forma dinâmica utilizando apenas o DynamicForm, possuindo tipagem e validação."
      />
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-4">
              <DynamicForm
                control={form.control}
                name="input"
                label="Componente Input"
                placeholder="E-mail"
                type="input"
              />
              <DynamicForm
                control={form.control}
                name="password"
                label="Componente Password"
                placeholder="Senha"
                type="password"
              />
              <DynamicForm
                control={form.control}
                name="checkbox"
                type="checkbox"
                label="Componente checkbox"
                checkboxOptions={[
                  { id: 'opcao1', label: 'Opção 1' },
                  { id: 'opcao2', label: 'Opção 2' },
                  { id: 'opcao3', label: 'Opção 3' },
                ]}
              />
              <DynamicForm
                control={form.control}
                name="combobox"
                type="combobox"
                label="Componente Combobox"
                comboboxOptions={[
                  { value: 'opcao1', label: 'Opção 1' },
                  { value: 'opcao2', label: 'Opção 2' },
                  { value: 'opcao3', label: 'Opção 3' },
                ]}
              />
              <DynamicForm
                control={form.control}
                name="radio"
                type="radio"
                label="Componente Radio"
                radioOptions={[
                  { id: 'all', label: 'Opção 1' },
                  { id: 'mentions', label: 'Opção 2' },
                  { id: 'none', label: 'Opção 3' },
                ]}
              />
              <DynamicForm control={form.control} name="switch" type="switch" label="Componente switch" />
              <DynamicForm
                control={form.control}
                label="Componente Select"
                name="select"
                type="select"
                selectOptions={['opção 1', 'opção 2', 'opção 3', 'opção 4']}
              />
              <DynamicForm
                control={form.control}
                name="multiSelect"
                type="multi-select"
                label="Componente Multi Select"
                multiSelectOptions={[
                  { id: 'opcao1', name: 'Opção 1' },
                  { id: 'opcao2', name: 'Opção 2' },
                  { id: 'opcao3', name: 'Opção 3' },
                ]}
              />
              <DynamicForm
                control={form.control}
                label="Componente Textarea"
                name="textarea"
                type="textarea"
                placeholder="Escreva sobre seu conteúdo"
              />
              <DynamicForm control={form.control} name="fileUpload" type="file-upload" />
            </div>
            <Button type="submit">Acessar</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
