import { UserAuthForm } from '@components/UserAuthForm';
import { useAuth } from '@services/hooks/auth';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarComponent } from '@components/sidebar';
import { H1 } from '@components/common/typography/h1';
import { H3 } from '@components/common/typography/h3';
import { H4 } from '@components/common/typography/h4';
import { Icons } from '@components/icons/icon';

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
      <div className="flex flex-col items-center justify-center gap-3">
        <H1>Template project</H1>
        <H3>
          Um template para projetos React utilizando Tanstack Router, Tanstack Query, Shadcn/UI, React Hook Form e Zod
        </H3>
        <H4>
          Tudo disponível para você, já com Sidebar, Gráficos, Tabelas gerenciadas pela URL e componentes com tipagem e
          validação.
        </H4>
      </div>
      <UserAuthForm />
      <div className="flex min-h-20 flex-col items-center gap-3">
        <H4>Leonardo Sarmento</H4>
        <div className="flex gap-x-5">
          <a href="https://linkedin.com/leonardo-araujo-sarmento" target="_blank" rel="noopener noreferrer">
            <Icons.linkedIn />
          </a>
          <a href="https://github.com/LeonardoSarmento" target="_blank" rel="noopener noreferrer">
            <Icons.github />
          </a>
        </div>
      </div>
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
