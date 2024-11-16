import { UserAuthForm } from '@components/UserAuthForm';
import { useAuth } from '@services/hooks/auth';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarComponent } from '@components/sidebar';

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
    <SidebarComponent>
      <Outlet />
    </SidebarComponent>
  );
}
