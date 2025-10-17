'use client';

import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@components/calendar-v2/hooks';
import type { IEvent, IUser } from '@components/calendar-v2/interfaces';
import type { TCalendarView, TEventColor } from '@components/calendar-v2/types';
import { useFilters } from '@services/hooks/useFilters';

interface ICalendarContext {
  selectedDate: Date;
  view: TCalendarView;
  setView: (view: TCalendarView) => void;
  agendaModeGroupBy: 'date' | 'color';
  setAgendaModeGroupBy: (groupBy: 'date' | 'color') => void;
  use24HourFormat: boolean;
  toggleTimeFormat: () => void;
  setSelectedDate: (date: Date | undefined) => void;
  selectedUserId: IUser['id'] | 'all';
  setSelectedUserId: (userId: IUser['id'] | 'all') => void;
  badgeVariant: 'dot' | 'colored';
  setBadgeVariant: (variant: 'dot' | 'colored') => void;
  selectedColors: TEventColor[];
  filterEventsBySelectedColors: (colors: TEventColor) => void;
  filterEventsBySelectedUser: (userId: IUser['id'] | 'all') => void;
  users: IUser[];
  events: IEvent[];
  addEvent: (event: IEvent) => void;
  updateEvent: (event: IEvent) => void;
  removeEvent: (eventId: string) => void;
  clearFilter: () => void;
}

interface CalendarSettings {
  badgeVariant: 'dot' | 'colored';
  view: TCalendarView;
  use24HourFormat: boolean;
  agendaModeGroupBy: 'date' | 'color';
}

const DEFAULT_SETTINGS: CalendarSettings = {
  badgeVariant: 'colored',
  view: 'day',
  use24HourFormat: true,
  agendaModeGroupBy: 'date',
};

const CalendarContext = createContext({} as ICalendarContext);

export function CalendarProvider({
  children,
  users,
  events,
  badge = 'colored',
  view = 'day',
}: {
  children: React.ReactNode;
  users: IUser[];
  events: IEvent[];
  view?: TCalendarView;
  badge?: 'dot' | 'colored';
}) {
  const { filters, setFilters } = useFilters('/_auth/calendar/calendar-v2');
  const [settings, setSettings] = useLocalStorage<CalendarSettings>('calendar-settings', {
    ...DEFAULT_SETTINGS,
    badgeVariant: badge,
    view: filters.view ?? view,
  });

  // settings
  const [badgeVariant, setBadgeVariantState] = useState(settings.badgeVariant);
  const [currentView, setCurrentViewState] = useState(settings.view);
  const [use24HourFormat, setUse24HourFormatState] = useState(settings.use24HourFormat);
  const [agendaModeGroupBy, setAgendaModeGroupByState] = useState(settings.agendaModeGroupBy);

  // selection and filters
  const [selectedDate, setSelectedDate] = useState(filters.selectedDate ? new Date(filters.selectedDate) : new Date());
  const [selectedUserId, setSelectedUserId] = useState<IUser['id'] | 'all'>(filters.userId || 'all');
  const [selectedColors, setSelectedColors] = useState<TEventColor[]>([]);

  // events state
  const [allEvents, setAllEvents] = useState<IEvent[]>(events || []);
  const [filteredEvents, setFilteredEvents] = useState<IEvent[]>(events || []);

  // 🔁 Sync events prop changes
  useEffect(() => {
    setAllEvents(events);
    setFilteredEvents(events);
  }, [events]);

  // ---- Settings helpers ----
  const updateSettings = (newPartialSettings: Partial<CalendarSettings>) => {
    setSettings({ ...settings, ...newPartialSettings });
  };

  const setBadgeVariant = (variant: 'dot' | 'colored') => {
    setBadgeVariantState(variant);
    updateSettings({ badgeVariant: variant });
  };

  const setView = (newView: TCalendarView) => {
    setCurrentViewState(newView);
    updateSettings({ view: newView });
    setFilters({ ...filters, view: newView });
  };

  const toggleTimeFormat = () => {
    setUse24HourFormatState((prev) => {
      const newValue = !prev;
      updateSettings({ use24HourFormat: newValue });
      return newValue;
    });
  };

  const setAgendaModeGroupBy = (groupBy: 'date' | 'color') => {
    setAgendaModeGroupByState(groupBy);
    updateSettings({ agendaModeGroupBy: groupBy });
  };

  // ---- Event filters ----
  const filterEventsBySelectedColors = (color: TEventColor) => {
    const isColorSelected = selectedColors.includes(color);
    const newColors = isColorSelected ? selectedColors.filter((c) => c !== color) : [...selectedColors, color];

    const filtered =
      newColors.length > 0 ? allEvents.filter((event) => newColors.includes(event.color ?? 'blue')) : allEvents;

    setSelectedColors(newColors);
    setFilteredEvents(filtered);
  };

  const filterEventsBySelectedUser = (userId: IUser['id'] | 'all') => {
    setSelectedUserId(userId);
    setFilters({ ...filters, userId: userId });
    setFilteredEvents(userId === 'all' ? allEvents : allEvents.filter((e) => e.user.id === userId));
  };

  const clearFilter = () => {
    setFilteredEvents(allEvents);
    setSelectedColors([]);
    setSelectedUserId('all');
    setFilters({ ...filters, userId: 'all' });
  };

  // ---- Event mutations ----
  const addEvent = (event: IEvent) => {
    setAllEvents((prev) => [...prev, event]);
    setFilteredEvents((prev) => [...prev, event]);
  };

  const updateEvent = (event: IEvent) => {
    const updated = {
      ...event,
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
    };
    setAllEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
    setFilteredEvents((prev) => prev.map((e) => (e.id === event.id ? updated : e)));
  };

  const removeEvent = (eventId: string) => {
    setAllEvents((prev) => prev.filter((e) => e.id !== eventId));
    setFilteredEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setFilters({ ...filters, selectedDate: date });
    }
  };

  // ✅ Memoize context value
  const value = useMemo<ICalendarContext>(
    () => ({
      selectedDate,
      setSelectedDate: handleSelectDate,
      selectedUserId,
      setSelectedUserId,
      badgeVariant,
      setBadgeVariant,
      users,
      selectedColors,
      filterEventsBySelectedColors,
      filterEventsBySelectedUser,
      events: filteredEvents,
      view: currentView,
      use24HourFormat,
      toggleTimeFormat,
      setView,
      agendaModeGroupBy,
      setAgendaModeGroupBy,
      addEvent,
      updateEvent,
      removeEvent,
      clearFilter,
    }),
    [
      selectedDate,
      selectedUserId,
      badgeVariant,
      users,
      selectedColors,
      filteredEvents,
      currentView,
      use24HourFormat,
      agendaModeGroupBy,
    ],
  );

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar(): ICalendarContext {
  const context = useContext(CalendarContext);
  if (!context) throw new Error('useCalendar must be used within a CalendarProvider.');
  return context;
}
