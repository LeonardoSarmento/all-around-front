import Header from '@components/header';
import DataTable from '@components/tables/common/data-table';
import { userColumns } from '@components/tables/users/user-columns';
import { DataTableToolbarUsers } from '@components/tables/users/user-table-toolbar';
import { queryOptionsUserTable } from '@services/query/tables/useTableUser';
import { UserFilters } from '@services/types/tables/User';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useMemo } from 'react';

export const Route = createFileRoute('/_auth/users/')({
  loaderDeps: ({ search: filters }) => filters,
  loader: ({ context: { queryClient }, deps: filters }) => queryClient.ensureQueryData(queryOptionsUserTable(filters)),
  validateSearch: () => ({}) as UserFilters,
  component: UsersComponent,
});

function UsersComponent() {
  const data = Route.useLoaderData();
  const columns = useMemo(() => userColumns, []);
  const { navigate } = useRouter();
  
  return (
    <>
      <Header title="Usuários" description="Listagem de todos os usuários da plataforma" />
      <DataTable
        data={data}
        columns={columns}
        toolbar={DataTableToolbarUsers}
        routeId={Route.id}
        navigateOnDoubleClick={(id) => navigate({ to: '/users/$userId', params: { userId: id.toString() } })}
      />
    </>
  );
}
