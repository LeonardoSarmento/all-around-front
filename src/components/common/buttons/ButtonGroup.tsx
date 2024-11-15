import { RoleButton } from '@components/common/buttons/RoleButton';
import { Button } from '@components/ui/button';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { DialogComponent } from '../dialog';

const type = z.enum(['create', 'edit', 'delete', 'dialog', 'back', 'clear']);
export const ButtonGroupSchema = z.object({
  has: z.array(type),
});

type ButtonGroupType = z.infer<typeof ButtonGroupSchema>;

type FormActionButtonGroup = {
  clear?: () => void;
  buttons: ButtonGroupType['has'];
  buttonProps?: {
    create?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    edit?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    delete?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    dialog?: {
      buttonText?: string;
      mutate?: () => void;
      headerTitle: string;
      description?: string;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>;
    back?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    clear?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  };
} & React.ButtonHTMLAttributes<HTMLDivElement>;

export function ButtonGroup({ clear, buttons, buttonProps = {}, ...props }: FormActionButtonGroup) {
  const { navigate } = useRouter();

  return (
    <div className="flex justify-center gap-3" {...props}>
      {buttons.includes('create') && (
        <RoleButton type="submit" variant="default" {...buttonProps.create}>
          {buttonProps.create?.title ? buttonProps.create.title : 'Criar'}
        </RoleButton>
      )}
      {buttons.includes('edit') && (
        <RoleButton type="submit" variant="secondary" {...buttonProps.edit}>
          {buttonProps.edit?.title ? buttonProps.edit.title : 'Editar'}
        </RoleButton>
      )}
      {buttons.includes('delete') && (
        <RoleButton type="button" variant="destructive" {...buttonProps.delete}>
          {buttonProps.delete?.title ? buttonProps.delete.title : 'Deletar'}
        </RoleButton>
      )}
      {buttons.includes('dialog') && (
        <DialogComponent
          title={buttonProps.dialog ? buttonProps.dialog?.headerTitle : ''}
          description={buttonProps.dialog ? buttonProps.dialog?.description : ''}
          {...buttonProps.dialog}
        />
      )}
      {buttons.includes('back') && (
        <Button onClick={() => navigate({ to: '..' })} variant="outline" type="button" {...buttonProps.back}>
          {buttonProps.back?.title ? buttonProps.back.title : 'Voltar'}
        </Button>
      )}
      {buttons.includes('clear') && (
        <Button variant="ghost" type="button" onClick={clear} {...buttonProps.clear}>
          {buttonProps.clear?.title ? buttonProps.clear.title : 'Limpar'}
        </Button>
      )}
    </div>
  );
}
