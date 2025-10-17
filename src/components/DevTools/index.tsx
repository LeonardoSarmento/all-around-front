import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';

export function DevTools() {
  return (
    <Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
    </Suspense>
  );
}
