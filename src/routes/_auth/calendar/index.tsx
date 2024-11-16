import { createFileRoute } from '@tanstack/react-router';
import Header from '@components/header';
import FullCalender from '@components/calendar';
import { newevents } from '@/fake-api/calendar';
import { calendarConfig } from '@components/calendar/calender-config';

export const Route = createFileRoute('/_auth/calendar/')({
  component: CalendarComponent,
});

function CalendarComponent() {
  return (
    <>
      <Header title="Calendário" />
      <FullCalender events={newevents} config={calendarConfig} />
    </>
  );
}
