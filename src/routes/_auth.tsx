import { AppSidebar } from '@components/app-sidebar';
import { Breadcrumbs } from '@components/BreadcrumbsTSR';
import { Separator } from '@components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@components/ui/sidebar';
import { UserAuthForm } from '@components/UserAuthForm';
import { useAuth } from '@services/hooks/auth';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: AuthComponent,
  loader: () => ({
    crumb: 'Página Inicial',
  }),
});

function IsAuthenticated() {
  const auth = useAuth();
  return auth.isAuthenticated;
}

function AuthenticateComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col content-around items-center justify-center space-y-20">
      <UserAuthForm />
    </div>
  );
}

function AuthComponent() {
  if (!IsAuthenticated()) {
    return <AuthenticateComponent />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
          </header>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
