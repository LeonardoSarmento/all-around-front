import type { TEventColor } from "@components/calendar-v2/types";

export interface IUser {
  id: string;
  name: string;
  avatar: string | null;
}

export interface IEvent {
  id: string;
  start: string;
  end: string;
  title: string;
  color: TEventColor;
  description: string;
  user: IUser;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
