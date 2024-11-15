import { ErrorComponent } from '@components/ErrorComponent';
import { NotFoundComponent } from '@components/NotFoundComponent';
import { type AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { Toaster } from 'sonner';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex h-dvh w-screen flex-col">
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Outlet />
      </div>
      <Toaster richColors closeButton />
      <Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
        <TanStackRouterDevtools position="bottom-left" />
      </Suspense>
    </>
  );
}
