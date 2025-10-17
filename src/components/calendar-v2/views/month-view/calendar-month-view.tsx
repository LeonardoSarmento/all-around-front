import { motion } from "motion/react";
import { useMemo } from "react";
import {
  staggerContainer,
  transition,
} from "@components/calendar-v2/animations";
import { useCalendar } from "@components/calendar-v2/contexts/calendar-context";

import {
  calculateMonthEventPositions,
  getCalendarCells,
} from "@components/calendar-v2/helpers";

import type { IEvent } from "@components/calendar-v2/interfaces";
import { DayCell } from "@components/calendar-v2/views/month-view/day-cell";
import { WEEKDAYS } from "@components/calendar-v2/constants";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarMonthView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate } = useCalendar();

  const allEvents = [...multiDayEvents, ...singleDayEvents];

  const cells = useMemo(() => getCalendarCells(selectedDate), [selectedDate]);

  const eventPositions = useMemo(
    () =>
      calculateMonthEventPositions(
        multiDayEvents,
        singleDayEvents,
        selectedDate
      ),
    [multiDayEvents, singleDayEvents, selectedDate]
  );

  return (
    <motion.div initial="initial" animate="animate" variants={staggerContainer}>
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day, index) => (
          <motion.div
            key={day}
            className="flex items-center justify-center py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ...transition }}
          >
            <span className="text-xs font-medium text-t-quaternary">{day}</span>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-7 overflow-hidden">
        {cells.map((cell, index) => (
          <DayCell
            key={index}
            cell={cell}
            events={allEvents}
            eventPositions={eventPositions}
          />
        ))}
      </div>
    </motion.div>
  );
}
