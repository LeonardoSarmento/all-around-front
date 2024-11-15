import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import api from '@services/api/axios';
import { UserType } from '@services/types/User';

async function fetchUser(id: UserType['id']): Promise<UserType> {
  const { data } = await api.get(`/persons/unique`, { params: { id } });
  return data;
}

export const queryOptionsUser = (id: UserType['id']) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    placeholderData: keepPreviousData,
  });
};
