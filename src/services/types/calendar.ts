import {
  CalendarEventColorSchema,
  CalendarViewsSchema,
} from "@components/calendar-v2/types";
import z from "zod";

export const CalendarSearchParamsSchema = z.object({
  userId: z.string().uuid().optional(),
  selectedDate: z.date().optional(),
  view: CalendarViewsSchema.optional(),
  eventColor: CalendarEventColorSchema.optional(),
});

export type CalendarSearchParamsType = z.infer<
  typeof CalendarSearchParamsSchema
>;
