import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { getEvents } from '@components/calendar-v2/requests';
import { IEvent } from '@components/calendar-v2/interfaces';

async function fetchSchedules(): Promise<IEvent[]> {
  const data = await getEvents();
  return data;
}

export const queryOptionsSchedules = () => {
  return queryOptions({
    queryKey: ['schedules'],
    queryFn: () => fetchSchedules(),
    placeholderData: keepPreviousData,
  });
};
