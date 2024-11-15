import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { UserType } from '@services/types/User';
import { fakeUserData } from '@/fake-api/users';

function fetchUser(id: UserType['id']): UserType {
  // const { data } = await api.get(`/persons/unique`, { params: { id } });
  const data = fakeUserData.filter((user) => user.id === id)[0];
  return { ...data, role: data.role[0] };
}

export const queryOptionsUser = (id: UserType['id']) => {
  return queryOptions({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    placeholderData: keepPreviousData,
  });
};
