import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { UserFilters } from '@services/types/tables/User';
import { fetchUsers } from '@/fake-api/users';

// async function fetchUsers(): Promise<UserRequest> {
//   const { data } = await api.get(`/persons/search/table${window.location.search}`);
//   return data;
// }

export const queryOptionsUserTable = (filters: UserFilters) => {
  return queryOptions({
    queryKey: ['user-table', filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  });
};
