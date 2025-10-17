import { CalendarBody } from '@components/calendar-v2/calendar-body';
import { CalendarProvider } from '@components/calendar-v2/contexts/calendar-context';
import { DndProvider } from '@components/calendar-v2/contexts/dnd-context';
import { CalendarHeader } from '@components/calendar-v2/header/calendar-header';
import { useQuery } from '@tanstack/react-query';
import { queryOptionsUsers } from '@services/query/user/queryOptionsUsers';
import { queryOptionsSchedules } from '@services/query/schedules/queryOptionsSchedules';

export function Calendar() {
  const { data: users } = useQuery({
    ...queryOptionsUsers(),
  });

  const { data: schedules } = useQuery({
    ...queryOptionsSchedules(),
  });

  return (
    <CalendarProvider events={schedules ?? []} users={users ?? []} view="month">
      <DndProvider showConfirmation={false}>
        <div className="w-full rounded-xl border">
          <CalendarHeader />
          <CalendarBody />
        </div>
      </DndProvider>
    </CalendarProvider>
  );
}
