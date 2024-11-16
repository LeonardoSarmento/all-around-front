import Header from '@components/header';
import { Link, Outlet, createFileRoute, linkOptions } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  component: IndexComponent,
});

const options = [
  linkOptions({
    to: '/',
    label: 'Página Inicial',
    activeOptions: { exact: true },
  }),
  linkOptions({
    to: '/calendar',
    label: 'Calendário',
    activeOptions: { exact: true },
  }),
  linkOptions({
    to: '/components',
    label: 'Componentes',
    activeOptions: { exact: true },
  }),
  linkOptions({
    to: '/charts',
    label: 'Gráficos',
    activeOptions: { exact: true },
  }),
  linkOptions({
    to: '/users',
    label: 'Usuários',
    activeOptions: { exact: true },
  }),
];

function IndexComponent() {
  return (
    <>
      <Header title="Bem vindo," description="Aproveite esse template preparado com muito carinho" />
      <div className="flex flex-wrap divide-x">
        {options.map((option) => {
          return (
            <Link key={option.to} {...option} activeProps={{ className: `font-bold` }} className="p-2">
              {option.label}
            </Link>
          );
        })}
      </div>
      <hr />
      <Outlet />
    </>
  );
}
