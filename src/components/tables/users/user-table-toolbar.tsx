import { useFilters } from '@services/hooks/useFilters';
import { DataTableViewOptions } from '@components/tables/common/data-table-view-options';
import { DebouncedInput } from '@components/tables/common/debouncedInput';
import { roles, selection } from '@services/constants/labels';
import ResetButton from '@components/common/buttons/ResetButton';
import { UserFilters } from '@services/types/tables/User';
import { UserToolbarAction } from './user-toolbar-actions';
import { DataTableToolbarProps } from '@services/types/tables/DataTableComponents';
import { DataTableFacetedFilter } from '../common/data-table-faceted-filter';
import { IsColumnFiltered } from '@services/utils/utils';
import { SelectedIdsFacetedFilter } from '../common/selected-faceted-filters';
export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const { filters, setFilters } = useFilters('/_auth/users/');
  const isFiltered = IsColumnFiltered(filters);
  const fieldMetaId = table.getColumn('id')?.columnDef.meta;
  const fieldMetaName = table.getColumn('name')?.columnDef.meta;
  const fieldMetaEmail = table.getColumn('email')?.columnDef.meta;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn('id')?.getCanFilter() && fieldMetaId?.filterKey !== undefined ? (
          <DebouncedInput
            className="h-8 w-[150px] rounded border shadow lg:w-[150px]"
            onChange={(value) => {
              setFilters({
                [fieldMetaId.filterKey as keyof UserFilters['id']]: value,
              } as Partial<TData>);
            }}
            onClick={(e) => e.stopPropagation()}
            type={fieldMetaId.filterVariant === 'number' ? 'number' : 'text'}
            placeholder="Procure pelo id"
            value={filters[fieldMetaId.filterKey as keyof UserFilters['id']] ?? ''}
          />
        ) : null}
        {table.getColumn('name')?.getCanFilter() && fieldMetaName?.filterKey !== undefined ? (
          <DebouncedInput
            className="h-8 w-[150px] rounded border shadow lg:w-[150px]"
            onChange={(value) => {
              setFilters({
                [fieldMetaName.filterKey as keyof UserFilters]: value,
              } as Partial<TData>);
            }}
            onClick={(e) => e.stopPropagation()}
            type={fieldMetaName.filterVariant === 'number' ? 'number' : 'text'}
            placeholder="Procure pelo nome"
            value={filters[fieldMetaName.filterKey as keyof UserFilters['name']] ?? ''}
          />
        ) : null}
        {table.getColumn('email')?.getCanFilter() && fieldMetaEmail?.filterKey !== undefined ? (
          <DebouncedInput
            className="h-8 w-[150px] rounded border shadow lg:w-[150px]"
            onChange={(value) => {
              setFilters({
                [fieldMetaEmail.filterKey as keyof UserFilters]: value,
              } as Partial<TData>);
            }}
            onClick={(e) => e.stopPropagation()}
            type={fieldMetaEmail.filterVariant === 'number' ? 'number' : 'text'}
            placeholder="Procure pelo email"
            value={filters[fieldMetaEmail.filterKey as keyof UserFilters['email']] ?? ''}
          />
        ) : null}
        {table.getColumn('role') && (
          <DataTableFacetedFilter
            column={table.getColumn('role')}
            title="Perfil"
            options={roles}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <SelectedIdsFacetedFilter
          title="Selecionados"
          filters={filters}
          setFilters={setFilters}
          options={selection}
          currentSelection={filters.selection}
        />
        {isFiltered && <ResetButton routeId="/_auth/users/" selectedIds={filters.selectedIds} />}
      </div>
      <UserToolbarAction />
      <DataTableViewOptions table={table} />
    </div>
  );
}
