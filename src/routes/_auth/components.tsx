import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/components')({
  loader: () => ({
    crumb: 'Componentes',
  }),
});
