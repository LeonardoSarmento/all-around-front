import { ColumnDef } from '@tanstack/react-table';
import { UserButtonAction } from './user-row-actions';
import { DataTableColumnHeader } from '../common/data-table-column-header';
import { UserTableType } from '@services/types/tables/User';
import { roles } from '@services/constants/labels';
import { GetDataTableColumnHeaderName } from '@services/utils/headerName';
import { Checkbox } from '@components/ui/checkbox';

export const userColumns: ColumnDef<UserTableType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title={GetDataTableColumnHeaderName({ column })} />,
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
    meta: { filterKey: 'id', name: 'Id' },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title={GetDataTableColumnHeaderName({ column })} />,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-2">
          <span className="truncate font-medium">{row.getValue('name')}</span>
        </div>
      );
    },
    meta: { filterKey: 'name', name: 'Nome' },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumnHeader column={column} title={GetDataTableColumnHeaderName({ column })} />,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-2">
          <span className="truncate font-medium">{row.getValue('email')}</span>
        </div>
      );
    },
    meta: { filterKey: 'email', name: 'Email' },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title={GetDataTableColumnHeaderName({ column })} />,
    cell: ({ row }) => {
      const rolesArray = row.getValue('role') as string[];
      const role = roles.find((roles) => rolesArray.includes(roles.value));

      if (!role) {
        return null;
      }
      return (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-nowrap">{role.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string[];
      return value.some((v: string) => rowValue.includes(v));
    },
    meta: { name: 'Perfil' },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UserButtonAction row={row} />,
  },
];
