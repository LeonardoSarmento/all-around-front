import { ErrorComponent } from '@components/ErrorComponent';
import { NotFoundComponent } from '@components/NotFoundComponent';
import { type AuthContext } from '@services/hooks/auth';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, ScrollRestoration, createRootRouteWithContext } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { DevTools } from '@components/DevTools';

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
      <div>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Outlet />
      </div>
      <Toaster richColors closeButton />
      <DevTools />
    </>
  );
}
