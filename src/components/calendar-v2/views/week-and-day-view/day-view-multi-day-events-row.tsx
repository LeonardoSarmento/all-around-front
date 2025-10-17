import {
  differenceInDays,
  endOfDay,
  isWithinInterval,
  parseISO,
  startOfDay,
} from "date-fns";
import type { IEvent } from "@components/calendar-v2/interfaces";
import { MonthEventBadge } from "@components/calendar-v2/views/month-view/month-event-badge";

interface IProps {
  selectedDate: Date;
  multiDayEvents: IEvent[];
}

export function DayViewMultiDayEventsRow({
  selectedDate,
  multiDayEvents,
}: IProps) {
  const dayStart = startOfDay(selectedDate);
  const dayEnd = endOfDay(selectedDate);

  const multiDayEventsInDay = multiDayEvents
    .filter((event) => {
      const eventStart = parseISO(event.start);
      const eventEnd = parseISO(event.end);

      return (
        isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
        isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
        (eventStart <= dayStart && eventEnd >= dayEnd)
      );
    })
    .sort((a, b) => {
      const durationA = differenceInDays(parseISO(a.end), parseISO(a.start));
      const durationB = differenceInDays(parseISO(b.end), parseISO(b.start));
      return durationB - durationA;
    });

  if (multiDayEventsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-18"></div>
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayEventsInDay.map((event) => {
          const eventStart = startOfDay(parseISO(event.start));
          const eventEnd = startOfDay(parseISO(event.end));
          const currentDate = startOfDay(selectedDate);

          const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
          const eventCurrentDay = differenceInDays(currentDate, eventStart) + 1;

          return (
            <MonthEventBadge
              key={event.id}
              event={event}
              cellDate={selectedDate}
              eventCurrentDay={eventCurrentDay}
              eventTotalDays={eventTotalDays}
            />
          );
        })}
      </div>
    </div>
  );
}
