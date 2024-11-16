import { Button } from '@components/ui/button';
import EventModal, { ColorScheme } from '../component/event/eventmodal';
import { Event } from '../types/event';
import {
  addDays,
  areIntervalsOverlapping,
  differenceInMinutes,
  format,
  getISOWeek,
  isSameDay,
  isToday,
  startOfWeek,
} from 'date-fns';

export const calendarEvents: CalendarEvent[] = [
  {
    title: 'Meditation Session',
    from: new Date('November 11, 2024 02:33:00'),
    to: new Date('November 11, 2024 03:30:00'),
    category: 'blue',
  },
  {
    title: 'Code Review',
    from: new Date('November 11, 2024 04:00:00'),
    to: new Date('November 11, 2024 05:30:00'),
    category: 'yellow',
  },
  {
    title: 'Breakfast Break',
    from: new Date('November 11, 2024 06:30:00'),
    to: new Date('November 11, 2024 07:30:00'),
    category: 'green',
  },
  {
    title: 'Early Bird Workout',
    description: '#1 of 3',
    from: new Date('November 12, 2024 00:00:00'),
    to: new Date('November 12, 2024 01:30:00'),
    category: 'blue',
  },
  {
    title: 'Product Development Workshop',
    from: new Date('November 12, 2024 01:00:00'),
    to: new Date('November 12, 2024 05:00:00'),
    category: 'purple',
  },
  {
    title: 'Early Bird Workout',
    description: '#2 of 3',
    from: new Date('November 13, 2024 00:00:00'),
    to: new Date('November 13, 2024 01:30:00'),
    category: 'blue',
  },
  {
    title: 'Early Bird Workout',
    description: '#3 of 3',
    from: new Date('November 14, 2024 00:00:00'),
    to: new Date('November 14, 2024 01:30:00'),
    category: 'blue',
  },
  {
    title: 'Investor Presentation',
    from: new Date('November 15, 2024 06:30:00'),
    to: new Date('November 15, 2024 08:30:00'),
    category: 'yellow',
  },
  {
    title: 'Team Breakfast',
    from: new Date('November 15, 2024 08:00:00'),
    to: new Date('November 15, 2024 09:00:00'),
    category: 'green',
  },
];

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
}

export function WeekView({ currentDate, events }: WeekViewProps) {
  console.log('--->>> events: ', events);
  const weekNumber = getISOWeek(currentDate);
  const firstWeekDay = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(firstWeekDay, i));

  // const mappedEvents: CalendarEvent[] = events.map(({eventname: title, description, startdate, starttime, enddate, endtime, ...rest}) => ({
  //     title,
  //     description,
  //     from: new Date(`${startdate} ${starttime}`),
  //     to: new Date(`${enddate} ${endtime}`),
  //     category: (rest.colorSchema === 'default' ? 'yellow' : (
  //         rest.colorSchema === 'red' ? 'purple' : rest.colorSchema
  //     ))

  // }));
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="relative z-20 mb-4">
        <div className="grid grid-cols-8 gap-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`week-view-top-header-${i}`} className="text-center text-xs font-semibold"></div>
          ))}
        </div>
        {(allDayEvents ?? []).length && <AllDayEventsView events={allDayEvents} />}
      </div>
      <div dir="ltr" className="relative h-[600px] overflow-hidden">
        <div
          data-radix-scroll-area-viewport=""
          className="h-full w-full rounded-[inherit]"
          style={{ overflow: 'hidden scroll' }}
        >
          <div style={{ minWidth: '100%', display: 'table' }}>
            <div className="relative mb-2">
              <div className="grid grid-cols-8 gap-0">
                <button
                  className="sticky left-0 top-0 z-30 bg-background"
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls="radix-:r3j6:"
                  data-state="closed"
                >
                  <div className="sticky left-0 top-0 flex h-12 items-center justify-center border-b border-r border-border bg-background">
                    <span className="bg-background text-xs font-semibold text-muted-foreground">Week {weekNumber}</span>
                  </div>

                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={`hours-${i}`}
                      className="h-16 cursor-pointer border-r border-border pr-2 text-center text-sm text-muted-foreground"
                    >
                      {i < 10 ? `0${i}` : i}:00
                    </div>
                  ))}
                </button>
                <div className="relative z-10 col-span-7">
                  <div className="grid grid-cols-7 gap-0">
                    {weekDays.map((weekDay, i) => (
                      <DayView key={`week-day-${i}`} events={calendarEvents} day={weekDay} />
                    ))}
                    <div className="absolute right-0 top-0 h-full w-px bg-border"></div>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute left-[12.5%] right-0 z-40 h-px bg-primary"
                style={{ display: 'none' }}
              >
                <span className="absolute left-0 -translate-x-full -translate-y-1/2 transform rounded bg-primary px-1 text-xs text-primary-foreground"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const allDayEvents: AllDayEventViewProps['event'][] = [
  {
    title: 'Ads Campaign Nr1',
    description: 'AdSense + FB, Target Audience: SMB2-Delta1',
  },
  {
    title: 'Ads Campaign Nr2',
    description: 'AdSense + FB, Target Audience: SMB2-Delta2',
  },
  {
    title: 'Ads Campaign Nr3',
    description: 'AdSense + FB, Target Audience: SMB2-Delta3',
  },
  {
    title: 'Ads Campaign Nr4',
    description: 'AdSense + FB, Target Audience: SMB2-Delta4',
  },
];

export interface AllDayEventViewProps {
  event: {
    title: string;
    description?: string;
  };
  isLast?: boolean;
}

export function AllDayEventView({ event: { title, description }, isLast = false }: AllDayEventViewProps) {
  return (
    <div className="min-h-[24px] px-1">
      <button
        className={`min-h-[24px] cursor-pointer rounded border-x-0 bg-yellow-200 px-2 py-1 text-xs text-yellow-800 transition-colors duration-200 hover:bg-opacity-40 dark:bg-yellow-800 dark:text-yellow-200 dark:hover:bg-opacity-40 ${
          isLast ? 'border-r-4 border-r-black/70 dark:border-r-white/50' : ''
        }`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:r3iq:"
        data-state="closed"
      >
        <div className="truncate font-semibold">{title}</div>
        <div className="truncate">{description}</div>
      </button>
    </div>
  );
}

export interface AllDayEventsViewProps {
  events: AllDayEventViewProps['event'][];
}

export function AllDayEventsView({ events = [] }: AllDayEventsViewProps) {
  return (
    <div className="relative items-center flex gap-0">
      <div className="bottom-2 left-0 top-0 min-w-[12.5%] flex z-10 items-center justify-center">
        <div className="truncate whitespace-nowrap text-xs font-semibold">Full-Day Events ({events.length})</div>
      </div>
      <div className="mb-1 flex flex-wrap gap-0" style={{ opacity: 1, willChange: 'opacity', transform: 'none' }}>
        {events.map((event, i) => (
          <AllDayEventView key={`all-day-event-${i}`} event={event} isLast={events.length === i + 1} />
        ))}
        {Array.from({ length: 7 - events.length }).map((_, i) => (
          <div key={`all-day-event-placeholder-${i}`} className="min-h-[24px] px-1"></div>
        ))}
      </div>
    </div>
  );
}

export const Categories: { [key: string]: { class: string } } = {
  blue: {
    class: `bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 border-l-blue-600 dark:border-l-blue-400`,
  },
  green: {
    class: `bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 border-l-green-600 dark:border-l-green-400`,
  },
  yellow: {
    class: `bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 border-l-yellow-600 dark:border-l-yellow-400`,
  },
  purple: {
    class: `bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 border-l-purple-600 dark:border-l-purple-400`,
  },
};

export type CategoryTypes = keyof typeof Categories;

export interface CalendarEvent {
  title: string;
  description?: string;
  from: Date;
  to: Date;
  category?: CategoryTypes;
}

export interface DayViewEventProps {
  event: CalendarEvent;
  width?: number;
  // Offset (in width units) from the left (0 based)
  widthOffsetIndex?: number;
  onClick?: () => void; // Optional onClick prop
}

export function DayViewEvent({
  event: { title, description, from, to, category = 'blue' },
  width = 100,
  widthOffsetIndex = 1,
  onClick,
}: DayViewEventProps) {
  const hourCellHeight = 64;
  const hour = from.getHours();
  const minutes = from.getMinutes();
  const minsInHour = 60;
  const inHours = (hour * minsInHour + minutes) / minsInHour;
  const top = inHours * hourCellHeight;
  const durationInMinutes = differenceInMinutes(to, from);
  const durationInHours = durationInMinutes / 60;
  const height = Math.round(durationInHours * hourCellHeight);
  const categoryStyles = Categories[category].class;
  const left = width === 100 ? 0 : widthOffsetIndex * width;

  return (
    <Button
      className={`absolute mb-1 flex h-10 w-full cursor-pointer flex-col items-start justify-start overflow-hidden rounded border-l-4 border-opacity-70 p-1 text-[8px] transition-colors duration-200 sm:text-xs ${categoryStyles} will-change-transform hover:bg-opacity-85 dark:hover:bg-opacity-40`}
      type="button"
      variant={'ghost'}
      onClick={onClick}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        left: `${left}%`,
        width: `${width}%`,
      }}
    >
      <div className="w-full max-w-md truncate">
        <h2 className="truncate text-left font-semibold">{title}</h2>
      </div>
      {description && (
        <div className="hidden w-full max-w-md truncate sm:block">
          <p className="truncate text-left font-light">{description}</p>
        </div>
      )}
      <div className="text-xs">
        {format(from, 'HH:mm')} - {format(to, 'HH:mm')}
      </div>
    </Button>
  );
}

export interface DayViewProps {
  events: CalendarEvent[];
  day: Date;
}

export function DayView({ events = [], day }: DayViewProps) {
  const dayAsString = format(day, 'E');
  const dayInTheMonth = format(day, 'd');
  const dayEvents = events.filter((event) => isSameDay(event.from, day));
  const eventsWithOverlap = dayEvents.map((event) => {
    const overlapingEvents =
      dayEvents.filter((evt) =>
        areIntervalsOverlapping({ start: evt.from, end: evt.to }, { start: event.from, end: event.to }),
      ) || [];
    return { event, overlapingEvents };
  }, {});
  const isTodaysDate = isToday(day);

  return (
    <div className="relative">
      <div className="sticky top-0 z-20 flex h-12 items-center justify-center border-b border-border bg-background">
        <div className="text-center">
          <div className="text-xs font-semibold">{dayAsString}</div>
          <div
            className={`${
              isTodaysDate ? 'bg-primary text-primary-foreground' : ''
            } mx-auto flex h-6 w-6 items-center justify-center rounded-full text-sm`}
          >
            {dayInTheMonth}
          </div>
        </div>
      </div>
      <div className="relative h-[calc(100%-3rem)]">
        {/* Render Hours Cells */}
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={`day-${dayInTheMonth}-${i}`}
            className={`h-16 ${i > 0 ? 'border-t border-border' : ''} ${i == 24 - 1 ? 'border-b' : ''}`}
          ></div>
        ))}
        {/* Render Events */}
        {eventsWithOverlap.map(({ event, overlapingEvents }, i) => (
          <EventModal
            key={`event-modal-${i}`}
            trigger={
              <DayViewEvent
                key={`day-${dayInTheMonth}-event-${i}`}
                event={event}
                width={overlapingEvents.length === 0 ? 100 : Math.round(100 / overlapingEvents.length)}
                widthOffsetIndex={overlapingEvents.findIndex(
                  ({ title, description, from, to }) =>
                    title === event.title &&
                    description === event.description &&
                    from === event.from &&
                    to === event.to,
                )}
              />
            }
            eventdetails={{
              eventname: event.title,
              description: event.description!,
              // startdate: '',
              // starttime: '',
              // enddate: '',
              // endtime: '',
              colorScheme: (event.category === 'purple'
                ? 'red'
                : event.category === 'yellow'
                  ? 'default'
                  : event.category) as ColorScheme,
            }}
          />
        ))}
      </div>
      {/* Day's Vertical Separator Line */}
      <div className="absolute right-0 top-12 h-[calc(100%-3rem)] w-px bg-border"></div>
    </div>
  );
}
