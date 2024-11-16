import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/calendar')({
  loader: () => ({
    crumb: 'Calendário',
  }),
});
