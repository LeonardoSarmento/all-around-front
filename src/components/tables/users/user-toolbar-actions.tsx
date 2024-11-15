import { RoleButton } from '@components/common/buttons/RoleButton';
import { DialogComponent } from '@components/common/dialog';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { DataTableToolbarActionsProps } from '@services/types/tables/DataTableComponents';
import { useRouter } from '@tanstack/react-router';
export function UserToolbarAction({ className, ...props }: DataTableToolbarActionsProps) {
  const router = useRouter();
  return (
    <div className={cn('mx-2 flex justify-center gap-3', className)} {...props}>
      <RoleButton onClick={() => router.navigate({ to: '/users/create' })} variant="default">
        Criar
      </RoleButton>
      <DialogComponent title="Deseja remover os registros de usuários?" />
      <Button
        onClick={() =>
          router.navigate({
            to: '/',
          })
        }
        variant="outline"
      >
        Voltar
      </Button>
    </div>
  );
}
