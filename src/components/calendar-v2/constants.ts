import {
  CalendarEventColorSchema,
  type TEventColor,
} from "@components/calendar-v2/types";
import z from "zod";

export const COLORS: TEventColor[] = CalendarEventColorSchema.options;

export const MONTHS = [
  { value: "janeiro", label: "janeiro" },
  { value: "fevereiro", label: "fevereiro" },
  { value: "março", label: "março" },
  { value: "abril", label: "abril" },
  { value: "maio", label: "maio" },
  { value: "junho", label: "junho" },
  { value: "julho", label: "julho" },
  { value: "agosto", label: "agosto" },
  { value: "setembro", label: "setembro" },
  { value: "outubro", label: "outubro" },
  { value: "novembro", label: "novembro" },
  { value: "dezembro", label: "dezembro" },
];

export const WeekdaySchema = z.enum([
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
  "Dom",
]);
export const WEEKDAYS = WeekdaySchema.options;
