import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/users')({
  loader: () => ({
    crumb: 'Usuários',
  }),
});
