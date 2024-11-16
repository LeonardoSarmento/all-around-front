import Header from '@components/header';
import DataTable from '@components/tables/common/data-table';
import { userColumns } from '@components/tables/users/user-columns';
import { DataTableToolbar } from '@components/tables/users/user-table-toolbar';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@services/constants/tables';
import { useFilters } from '@services/hooks/useFilters';
import { queryOptionsUserTable } from '@services/query/tables/useTableUser';
import { UserFilters } from '@services/types/tables/User';
import { sortByToState, stateToSortBy } from '@services/utils/tableSortMapper';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_auth/users/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) => queryClient.ensureQueryData(queryOptionsUserTable(filters)),
  validateSearch: () => ({}) as UserFilters,
  component: UsersComponent,
});

function UsersComponent() {
  const { filters, setFilters } = useFilters('/_auth/users/');

  const data = Route.useLoaderData();

  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  };
  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => userColumns, []);

  return (
    <>
      <Header title="Usuários" description="Listagem de todos os usuários da plataforma" />
      <DataTable
        data={data?.result ?? []}
        columns={columns}
        toolbar={DataTableToolbar}
        pagination={paginationState}
        paginationOptions={{
          onPaginationChange: (pagination) => {
            setFilters(typeof pagination === 'function' ? pagination(paginationState) : pagination);
          },
          rowCount: data?.rowCount,
        }}
        sorting={sortingState}
        onSortingChange={(updaterOrValue) => {
          const newSortingState = typeof updaterOrValue === 'function' ? updaterOrValue(sortingState) : updaterOrValue;
          return setFilters({ sortBy: stateToSortBy(newSortingState) });
        }}
      />
    </>
  );
}
