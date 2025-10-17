import { Calendar } from '@components/calendar-v2/calendar';
import { queryOptionsSchedules } from '@services/query/schedules/queryOptionsSchedules';
import { queryOptionsUsers } from '@services/query/user/queryOptionsUsers';
import { CalendarSearchParamsType } from '@services/types/calendar';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/calendar/calendar-v2')({
  validateSearch: () => ({}) as CalendarSearchParamsType,
  loaderDeps: ({ search: filters }) => filters,
  component: RouteComponent,
  loader: async ({ context }) => {
    const users = await context.queryClient.ensureQueryData(queryOptionsUsers());
    const schedules = await context.queryClient.ensureQueryData(queryOptionsSchedules());
    return {
      crumb: 'Calendário V2',
      users,
      schedules,
    };
  },
});

function RouteComponent() {
  return <Calendar />;
}
