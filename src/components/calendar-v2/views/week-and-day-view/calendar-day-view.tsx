import { addMinutes, format, isWithinInterval, parseISO, set } from "date-fns";
import { Calendar as CalendarIcon, Clock, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalendar } from "@components/calendar-v2/contexts/calendar-context";

import { AddEditEventDialog } from "@components/calendar-v2/dialogs/add-edit-event-dialog";
import { DroppableArea } from "@components/calendar-v2/dnd/droppable-area";
import { groupEvents } from "@components/calendar-v2/helpers";
import type { IEvent } from "@components/calendar-v2/interfaces";
import { CalendarTimeline } from "@components/calendar-v2/views/week-and-day-view/calendar-time-line";
import { DayViewMultiDayEventsRow } from "@components/calendar-v2/views/week-and-day-view/day-view-multi-day-events-row";
import { RenderGroupedEvents } from "@components/calendar-v2/views/week-and-day-view/render-grouped-events";
import { Button } from "@/components/ui/button";
import {
  SlotIdentifier,
  useDisclosure,
  useTimeRangeSelection,
} from "@components/calendar-v2/hooks";
import { cn } from "@lib/utils";

interface IProps {
  singleDayEvents: IEvent[];
  multiDayEvents: IEvent[];
}

export function CalendarDayView({ singleDayEvents, multiDayEvents }: IProps) {
  const { selectedDate, setSelectedDate, users, use24HourFormat } =
    useCalendar();

  const [rangeToCreate, setRangeToCreate] = useState<{
    start: SlotIdentifier;
    end: SlotIdentifier;
  } | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMouseUpWrapper = () => {
    const range = handleMouseUp();
    if (range) {
      setRangeToCreate(range);
      onOpen();
    }
  };

  const {
    isSelecting,
    selectedSlots,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = useTimeRangeSelection();

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

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
    return () => {
      document.removeEventListener("dragover", handleDragOver);
    };
  }, []);

  const getCurrentEvents = (events: IEvent[]) => {
    const now = new Date();
    return events.filter((event) =>
      isWithinInterval(now, {
        start: parseISO(event.start),
        end: parseISO(event.end),
      })
    );
  };

  const currentEvents = getCurrentEvents(singleDayEvents);

  const dayEvents = singleDayEvents.filter((event) => {
    const eventDate = parseISO(event.start);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const groupedEvents = groupEvents(dayEvents);

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
    <div className="flex">
      <div className="flex flex-1 flex-col">
        <div>
          <DayViewMultiDayEventsRow
            selectedDate={selectedDate}
            multiDayEvents={multiDayEvents}
          />

          {/* Day header */}
          <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <span className="flex-1 border-l flex justify-center gap-x-2 items-center py-2 capitalize text-center text-xs font-medium text-t-quaternary">
              {format(selectedDate, "EE")}{" "}
              <Button className="size-5">{format(selectedDate, "d")}</Button>
            </span>
          </div>
        </div>

        <ScrollArea className="h-[900px]" type="always" ref={scrollAreaRef}>
          <div className="flex">
            {/* Hours column */}
            <div className="relative w-18">
              {hours.map((hour, index) => (
                <div key={hour} className="relative" style={{ height: "96px" }}>
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
                </div>
              ))}
            </div>

            {/* Day grid */}
            <div
              className="relative flex-1 border-l select-none"
              onMouseUp={handleMouseUpWrapper}
              onMouseLeave={isSelecting ? handleMouseUpWrapper : undefined}
            >
              <div className="relative">
                {hours.map((hour, index) => (
                  <div
                    key={hour}
                    className="relative"
                    style={{ height: "96px" }}
                  >
                    {index !== 0 && (
                      <div className="pointer-events-none absolute inset-x-0 top-0 border-b" />
                    )}

                    {/* Bloco 00 min */}
                    <DroppableArea
                      date={selectedDate}
                      hour={hour}
                      minute={0}
                      className="absolute inset-x-0 top-0 h-[48px]"
                    >
                      <AddEditEventDialog
                        startDate={selectedDate}
                        startTime={{ hour, minute: 0 }}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 cursor-pointer transition-colors hover:bg-secondary",
                            selectedSlots.some(
                              (slot) =>
                                slot.hour === hour &&
                                slot.minute === 0 &&
                                slot.day.toDateString() ===
                                  selectedDate.toDateString()
                            ) && "bg-secondary/60"
                          )}
                          onMouseDown={() =>
                            handleMouseDown({
                              day: selectedDate,
                              hour,
                              minute: 0,
                            })
                          }
                          onMouseEnter={() =>
                            handleMouseEnter({
                              day: selectedDate,
                              hour,
                              minute: 0,
                            })
                          }
                        />
                      </AddEditEventDialog>
                    </DroppableArea>

                    {/* Linha tracejada central */}
                    <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed border-b-tertiary" />

                    {/* Bloco 30 min */}
                    <DroppableArea
                      date={selectedDate}
                      hour={hour}
                      minute={30}
                      className="absolute inset-x-0 bottom-0 h-[48px]"
                    >
                      <AddEditEventDialog
                        startDate={selectedDate}
                        startTime={{ hour, minute: 30 }}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 cursor-pointer transition-colors hover:bg-secondary",
                            selectedSlots.some(
                              (slot) =>
                                slot.hour === hour &&
                                slot.minute === 30 &&
                                slot.day.toDateString() ===
                                  selectedDate.toDateString()
                            ) && "bg-secondary/60"
                          )}
                          onMouseDown={() =>
                            handleMouseDown({
                              day: selectedDate,
                              hour,
                              minute: 30,
                            })
                          }
                          onMouseEnter={() =>
                            handleMouseEnter({
                              day: selectedDate,
                              hour,
                              minute: 30,
                            })
                          }
                        />
                      </AddEditEventDialog>
                    </DroppableArea>
                  </div>
                ))}

                {/* Render events */}
                <RenderGroupedEvents
                  groupedEvents={groupedEvents}
                  day={selectedDate}
                />
              </div>

              <CalendarTimeline />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Sidebar com calendário e eventos atuais */}
      <div className="hidden w-72 divide-y border-l md:block">
        <Calendar
          className="mx-auto w-fit"
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          defaultMonth={new Date(selectedDate)}
        />

        <div className="flex-1 space-y-3">
          {currentEvents.length > 0 ? (
            <div className="flex items-start gap-2 px-4 pt-4">
              <span className="relative mt-[5px] flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex size-2.5 rounded-full bg-green-600"></span>
              </span>
              <p className="text-sm font-semibold text-t-secondary">
                Acontecendo agora
              </p>
            </div>
          ) : (
            <p className="p-4 text-center text-sm italic text-t-tertiary">
              Nenhum evento acontecendo agora
            </p>
          )}

          {currentEvents.length > 0 && (
            <ScrollArea className="h-[422px] px-4" type="always">
              <div className="space-y-6 pb-4">
                {currentEvents.map((event) => {
                  const user = users.find((user) => user.id === event.user.id);
                  return (
                    <div key={event.id} className="space-y-1.5">
                      <p className="line-clamp-2 text-sm font-semibold">
                        {event.title}
                      </p>
                      {user && (
                        <div className="flex items-center gap-1.5">
                          <User className="size-4 text-t-quinary" />
                          <span className="text-sm text-t-tertiary">
                            {user.name}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="size-4 text-t-quinary" />
                        <span className="text-sm text-t-tertiary capitalize">
                          {format(new Date(event.start), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4 text-t-quinary" />
                        <span className="text-sm text-t-tertiary">
                          {format(
                            parseISO(event.start),
                            use24HourFormat ? "HH:mm" : "hh:mm a"
                          )}{" "}
                          -{" "}
                          {format(
                            parseISO(event.end),
                            use24HourFormat ? "HH:mm" : "hh:mm a"
                          )}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>

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
    </div>
  );
}
