import {
  addDays,
  format,
  isSameDay,
  parseISO,
  startOfWeek,
  set,
  addMinutes,
} from "date-fns";
import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fadeIn,
  staggerContainer,
  transition,
} from "@components/calendar-v2/animations";
import { useCalendar } from "@components/calendar-v2/contexts/calendar-context";
import { AddEditEventDialog } from "@components/calendar-v2/dialogs/add-edit-event-dialog";
import { DroppableArea } from "@components/calendar-v2/dnd/droppable-area";
import { groupEvents } from "@components/calendar-v2/helpers";
import type { IEvent } from "@components/calendar-v2/interfaces";
import { CalendarTimeline } from "@components/calendar-v2/views/week-and-day-view/calendar-time-line";
import { RenderGroupedEvents } from "@components/calendar-v2/views/week-and-day-view/render-grouped-events";
import { WeekViewMultiDayEventsRow } from "@components/calendar-v2/views/week-and-day-view/week-view-multi-day-events-row";
import { Button } from "@/components/ui/button";
import {
  useTimeRangeSelection,
  useDisclosure,
  SlotIdentifier,
} from "@components/calendar-v2/hooks";
import { cn } from "@lib/utils";
import { useEffect, useState, useRef } from "react";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarWeekView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, setSelectedDate, use24HourFormat, setView } =
    useCalendar();
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const [rangeToCreate, setRangeToCreate] = useState<{
    start: SlotIdentifier;
    end: SlotIdentifier;
  } | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedSlots, handleMouseDown, handleMouseEnter, handleMouseUp } =
    useTimeRangeSelection();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleMouseUpWrapper = () => {
    const range = handleMouseUp();
    if (range) {
      setRangeToCreate(range);
      onOpen();
    }
  };

  // auto scroll while dragging
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      if (!scrollAreaRef.current) return;
      const scrollArea = scrollAreaRef.current;
      const rect = scrollArea.getBoundingClientRect();
      const scrollSpeed = 15;
      const scrollContainer =
        scrollArea.querySelector("[data-radix-scroll-area-viewport]") ||
        scrollArea;
      if (e.clientY < rect.top + 60) scrollContainer.scrollTop -= scrollSpeed;
      if (e.clientY > rect.bottom - 60)
        scrollContainer.scrollTop += scrollSpeed;
    };
    document.addEventListener("dragover", handleDragOver);
    return () => document.removeEventListener("dragover", handleDragOver);
  }, []);

  let start: Date | undefined;
  let end: Date | undefined;

  if (rangeToCreate?.start && rangeToCreate?.end) {
    start = set(rangeToCreate.start.day!, {
      hours: rangeToCreate.start.hour,
      minutes: rangeToCreate.start.minute,
      seconds: 0,
    });
    end = addMinutes(
      set(rangeToCreate.end.day!, {
        hours: rangeToCreate.end.hour,
        minutes: rangeToCreate.end.minute,
        seconds: 0,
      }),
      30
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      transition={transition}
    >
      {/* Mobile warning */}
      <motion.div
        className="flex flex-col items-center justify-center border-b p-4 text-sm sm:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <p>Weekly view is not recommended on smaller devices.</p>
        <p>Please switch to a desktop device or use the daily view instead.</p>
      </motion.div>

      <motion.div className="flex-col sm:flex" variants={staggerContainer}>
        <div>
          <WeekViewMultiDayEventsRow
            selectedDate={selectedDate}
            multiDayEvents={multiDayEvents}
          />

          {/* Week header */}
          <motion.div
            className="relative z-20 flex border-b"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
          >
            <div className="w-18"></div>
            <div className="grid flex-1 grid-cols-7 my-1 px-1 border-l">
              {weekDays.map((day, index) => (
                <motion.span
                  key={index}
                  className="py-1 sm:py-2 cursor-pointer hover:bg-muted hover:rounded-lg capitalize text-center text-xs font-medium text-t-quaternary"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ...transition }}
                  onDoubleClick={() => {
                    setSelectedDate(day);
                    setView("day");
                  }}
                >
                  <span className="flex sm:hidden items-center justify-center gap-x-2">
                    {format(day, "EEE").charAt(0)}
                    <Button className="size-5">{format(day, "d")}</Button>
                  </span>
                  <span className="hidden sm:flex items-center justify-center gap-x-2">
                    {format(day, "EE")}{" "}
                    <Button className="size-5">{format(day, "d")}</Button>
                  </span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <ScrollArea className="h-[900px]" type="always" ref={scrollAreaRef}>
          <div className="flex">
            {/* Hours column */}
            <motion.div className="relative w-18" variants={staggerContainer}>
              {hours.map((hour, index) => (
                <motion.div
                  key={hour}
                  className="relative"
                  style={{ height: "96px" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02, ...transition }}
                >
                  <div className="absolute -top-3 right-2 flex h-6 items-center">
                    {index !== 0 && (
                      <span className="text-xs text-t-quaternary">
                        {format(
                          new Date().setHours(hour, 0, 0, 0),
                          use24HourFormat ? "HH:00" : "h a"
                        )}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Week grid */}
            <motion.div
              className="relative flex-1 border-l"
              variants={staggerContainer}
            >
              <div className="grid grid-cols-7 divide-x">
                {weekDays.map((day, dayIndex) => {
                  const dayEvents = singleDayEvents.filter(
                    (event) =>
                      isSameDay(parseISO(event.start), day) ||
                      isSameDay(parseISO(event.end), day)
                  );
                  const groupedEvents = groupEvents(dayEvents);

                  return (
                    <motion.div
                      key={dayIndex}
                      className="relative"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: dayIndex * 0.1, ...transition }}
                    >
                      {hours.map((hour, index) => (
                        <motion.div
                          key={hour}
                          className="relative"
                          style={{ height: "96px" }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.01, ...transition }}
                        >
                          {index !== 0 && (
                            <div className="pointer-events-none absolute inset-x-0 top-0 border-b" />
                          )}

                          {/* 00 min slot */}
                          <DroppableArea
                            date={day}
                            hour={hour}
                            minute={0}
                            className="absolute inset-x-0 top-0 h-[48px]"
                          >
                            <AddEditEventDialog
                              startDate={day}
                              startTime={{ hour, minute: 0 }}
                            >
                              <div
                                className={cn(
                                  "absolute inset-0 cursor-pointer transition-colors hover:bg-secondary z-10 pointer-events-auto",
                                  selectedSlots.some(
                                    (slot) =>
                                      slot.hour === hour &&
                                      slot.minute === 0 &&
                                      slot.day.toDateString() ===
                                        day.toDateString()
                                  ) && "bg-secondary/60"
                                )}
                                onMouseDown={() =>
                                  handleMouseDown({ day, hour, minute: 0 })
                                }
                                onMouseEnter={() =>
                                  handleMouseEnter({ day, hour, minute: 0 })
                                }
                                onMouseUp={handleMouseUpWrapper}
                              />
                            </AddEditEventDialog>
                          </DroppableArea>

                          <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary" />

                          {/* 30 min slot */}
                          <DroppableArea
                            date={day}
                            hour={hour}
                            minute={30}
                            className="absolute inset-x-0 bottom-0 h-[48px]"
                          >
                            <AddEditEventDialog
                              startDate={day}
                              startTime={{ hour, minute: 30 }}
                            >
                              <div
                                className={cn(
                                  "absolute inset-0 cursor-pointer transition-colors hover:bg-secondary z-10 pointer-events-auto",
                                  selectedSlots.some(
                                    (slot) =>
                                      slot.hour === hour &&
                                      slot.minute === 30 &&
                                      slot.day.toDateString() ===
                                        day.toDateString()
                                  ) && "bg-secondary/60"
                                )}
                                onMouseDown={() =>
                                  handleMouseDown({ day, hour, minute: 30 })
                                }
                                onMouseEnter={() =>
                                  handleMouseEnter({ day, hour, minute: 30 })
                                }
                                onMouseUp={handleMouseUpWrapper}
                              />
                            </AddEditEventDialog>
                          </DroppableArea>
                        </motion.div>
                      ))}

                      <RenderGroupedEvents
                        groupedEvents={groupedEvents}
                        day={day}
                      />
                    </motion.div>
                  );
                })}
              </div>

              <CalendarTimeline />
            </motion.div>
          </div>
        </ScrollArea>
      </motion.div>

      {/* Add/Edit Event Dialog */}
      {rangeToCreate && (
        <AddEditEventDialog
          startDate={start}
          endDate={end}
          isOpen={isOpen}
          onClose={onClose}
        >
          <div />
        </AddEditEventDialog>
      )}
    </motion.div>
  );
}
