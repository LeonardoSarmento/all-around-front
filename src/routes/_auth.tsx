import { NavigationMenuGroup } from '@components/NavigationMenu';
import { UserAuthForm } from '@components/UserAuthForm';
import { useAuth } from '@services/hooks/auth';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth')({
  component: () => {
    if (IsAuthenticated()) {
      return <AuthComponent />;
    }
    return (
      <div className="flex h-dvh flex-col p-3">
        <NavigationMenuGroup />
        <div className="mx-6 p-6">
          <Outlet />
        </div>
      </div>
    );
  },
});

function IsAuthenticated() {
  const auth = useAuth();
  return auth.isAuthenticated;
}

function AuthComponent() {
  return (
    <div className="flex min-h-screen w-full flex-col content-around items-center justify-center space-y-20">
      <UserAuthForm />
    </div>
  );
}
