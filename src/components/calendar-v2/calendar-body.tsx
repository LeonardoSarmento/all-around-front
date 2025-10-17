import { isSameDay, parseISO } from "date-fns";
import { motion } from "motion/react";
import { fadeIn, transition } from "@components/calendar-v2/animations";
import { useCalendar } from "@components/calendar-v2/contexts/calendar-context";
import { AgendaEvents } from "@components/calendar-v2/views/agenda-view/agenda-events";
import { CalendarMonthView } from "@components/calendar-v2/views/month-view/calendar-month-view";
import { CalendarDayView } from "@components/calendar-v2/views/week-and-day-view/calendar-day-view";
import { CalendarWeekView } from "@components/calendar-v2/views/week-and-day-view/calendar-week-view";
import { CalendarYearView } from "@components/calendar-v2/views/year-view/calendar-year-view";

export function CalendarBody() {
  const { view, events } = useCalendar();

  const singleDayEvents = events.filter((event) => {
    const startDate = parseISO(event.start);
    const endDate = parseISO(event.end);
    return isSameDay(startDate, endDate);
  });

  const multiDayEvents = events.filter((event) => {
    const startDate = parseISO(event.start);
    const endDate = parseISO(event.end);
    return !isSameDay(startDate, endDate);
  });

  return (
    <div className="w-full h-full overflow-scroll relative">
      <motion.div
        key={view}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        transition={transition}
      >
        {view === "month" && (
          <CalendarMonthView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {view === "week" && (
          <CalendarWeekView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {view === "day" && (
          <CalendarDayView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {view === "year" && (
          <CalendarYearView
            singleDayEvents={singleDayEvents}
            multiDayEvents={multiDayEvents}
          />
        )}
        {view === "agenda" && (
          <motion.div
            key="agenda"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeIn}
            transition={transition}
          >
            <AgendaEvents />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
