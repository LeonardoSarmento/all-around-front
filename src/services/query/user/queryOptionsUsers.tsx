import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getUsers } from '@components/calendar-v2/requests';
import { IUser } from '@components/calendar-v2/interfaces';

async function fetchUsers(): Promise<IUser[]> {
  const data = await getUsers();
  return data;
}

export const queryOptionsUsers = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    placeholderData: keepPreviousData,
  });
};
