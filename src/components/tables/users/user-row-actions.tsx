import { RoleButton } from '@components/common/buttons/RoleButton';
import { DialogComponent } from '@components/common/dialog';
import { EditIcon } from '@components/icons';
import { DataTableRowActionsProps } from '@services/types/tables/DataTableComponents';
import { UserTable } from '@services/types/tables/User';
import { useRouter } from '@tanstack/react-router';
export function UserButtonAction<TData>({ row }: DataTableRowActionsProps<TData>) {
  const user = UserTable.parse(row.original);
  const router = useRouter();
  return (
    <div className="flex justify-center gap-3">
      <RoleButton
        onClick={() =>
          router.navigate({
            to: '/users/$userId',
            params: { userId: `${user.id}` },
          })
        }
        variant="outline"
      >
        <EditIcon />
      </RoleButton>
      <DialogComponent buttonType="rowAction" title={`Deseja remover o usuário ${user.name}?`} />
    </div>
  );
}
