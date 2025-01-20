import { LayoutPages, NavigationMenuOptionsType } from '@components/LayoutPages';
import { Outlet, createFileRoute, linkOptions } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/')({
  component: IndexComponent,
});

const options: NavigationMenuOptionsType[] = [
  {
    title: 'Página Inicial',
    description: 'Acesse a página inicial do sistema',
    options: linkOptions({ to: '/', activeOptions: { exact: true } }),
  },
  {
    title: 'Calendário',
    description: 'Acesse o Calendário',
    options: linkOptions({ to: '/calendar', activeOptions: { exact: true } }),
  },
  {
    title: 'Componentes',
    description: 'Acesse os componentes de formulários',
    options: linkOptions({ to: '/components', activeOptions: { exact: true } }),
  },
  {
    title: 'Gráficos',
    description: 'Acesse a página de gráficos do sistema',
    options: linkOptions({ to: '/charts', activeOptions: { exact: true } }),
  },
];

function IndexComponent() {
  return (
    <>
      <LayoutPages
        headerTitle="Bem vindo,"
        descriptionTitle="Aproveite esse template preparado com muito carinho"
        navigationOptions={options}
      />
      <Outlet />
    </>
  );
}
