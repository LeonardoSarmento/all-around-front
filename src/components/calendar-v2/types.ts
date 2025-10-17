import z from "zod";

export const CalendarViewsSchema = z.enum([
  "day",
  "week",
  "month",
  "year",
  "agenda",
]);

export const CalendarEventColorSchema = z.enum([
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
]);
export type TCalendarView = z.infer<typeof CalendarViewsSchema>;
export type TEventColor = z.infer<typeof CalendarEventColorSchema>;
