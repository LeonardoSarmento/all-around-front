import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/charts')({
  loader: () => ({
    crumb: 'Gráficos',
  }),
});
