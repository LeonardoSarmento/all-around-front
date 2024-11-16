import { addDays, format, parseISO } from 'date-fns';

import React from 'react';
import AddEvent from '../component/add-event';
import EventModal from '../component/event/eventmodal';
import ListAllEvents from '../component/event/listallevents';
import { Event } from '../types/event';

interface RenderDaysInMonthProps {
  currentDate: Date;
  events: Event[];
  startWeek: Date;
  daysOfWeek: string[];
}

export const renderDaysInMonth = ({ currentDate, events, startWeek }: RenderDaysInMonthProps) => {
  const days: React.ReactNode[] = [];
  let day = startWeek;

  // Today's date
  const todayDate = format(new Date(), 'd');
  const todayMonth = format(new Date(), 'M');
  const todayYear = format(new Date(), 'yyyy');

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (format(day, 'M') === format(currentDate, 'M')) {
        const isToday =
          format(day, 'd') === todayDate && format(day, 'M') === todayMonth && format(day, 'yyyy') === todayYear;

        // Filter events for the specific day
        const eventsForDay = events.filter((event) => {
          const startDate = format(parseISO(event.startdate), 'yyyy-MM-dd');
          const endDate = format(parseISO(event.enddate), 'yyyy-MM-dd');
          const formattedDay = format(day, 'yyyy-MM-dd');

          if (startDate === endDate) {
            return startDate === formattedDay;
          } else {
            return formattedDay >= startDate && formattedDay <= endDate;
          }
        });

        days.push(
          <div
            key={day.toString()}
            className={`group relative flex h-[80px] flex-col rounded border p-1 sm:h-[130px] sm:p-2 ${
              isToday ? 'text-blue-600' : 'text-foreground'
            }`}
          >
            {/* Day number */}
            <div
              className={`mb-1 flex h-5 w-5 items-center justify-center text-xs font-semibold sm:h-6 sm:w-6 sm:text-sm ${
                isToday
                  ? 'flex aspect-square w-6 items-center justify-center rounded-full bg-black text-white'
                  : 'text-foreground'
              }`}
            >
              {format(day, 'd')}
            </div>

            {/* Events list */}
            <div className="flex-grow overflow-hidden">
              {eventsForDay.length === 0 && <AddEvent variant="secondary" currentDate={day} />}
              {eventsForDay.length === 1 && (
                <>
                  <EventModal eventdetails={eventsForDay[0]} />
                  <AddEvent variant="secondary" currentDate={day} />
                </>
              )}
              {eventsForDay.length > 1 && (
                <>
                  <EventModal eventdetails={eventsForDay[0]} />
                  {eventsForDay.length > 1 && <ListAllEvents view="day" date={day} eventsForDay={eventsForDay} />}
                </>
              )}
            </div>
          </div>,
        );
      }
      day = addDays(day, 1);
    }
  }
  return days;
};
