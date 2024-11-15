import * as React from 'react';
import { cn } from '@lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@components/ui/navigation-menu';
import { Link, LinkOptions, useLocation } from '@tanstack/react-router';
import { UserMenu } from './UserMenu';

function IsActivePath({ to }: { to: LinkOptions['to'] }) {
  const { pathname } = useLocation();
  return pathname?.startsWith(`${import.meta.env.BASE_URL}${to}`) ? 'font-extrabold' : 'font-medium';
}
export function NavigationMenuGroup() {
  return (
    <div className="flex flex-col-reverse items-center justify-center gap-4 rounded-lg p-2 md:flex-row md:justify-between">
      <h3 className="mx-5 scroll-m-20 text-3xl font-extralight uppercase tracking-tight transition-all duration-300 first:mt-0 hover:scale-110">
        <Link to="/">Template Project</Link>
      </h3>
      <NavigationMenu className="flex text-center right-16">
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                '',
                IsActivePath({ to: '/' }),
              )}
            >
              HOME
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {/* <ul className="flex flex-col w-96 gap-2 p-4"> */}
                {CONTROLPTIONS.map((option) => (
                  <ListItem key={option.title} to={option.to} title={option.title} children={option.description} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                '',
                IsActivePath({ to: '/users' }),
              )}
            >
              USUÁRIO
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {ENGINEERINGOPTIONS.map((option) => (
                  <ListItem key={option.title} to={option.to} title={option.title} children={option.description} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <UserMenu />
    </div>
  );
}

export type ListItemType = {
  className?: string;
  title: string;
  children?: React.ReactNode;
  icon?: JSX.Element;
} & LinkOptions;
const ListItem = ({ className, title, children, ...props }: ListItemType) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        className={cn(
          'block select-none justify-start space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent',
          className,
        )}
        activeOptions={{ exact: true }}
        activeProps={{ className: 'bg-accent' }}
        {...props}
      >
        {({ isActive }) => {
          return (
            <div className="flex flex-col justify-start">
              <div className={cn('text-xs leading-none', isActive ? 'font-bold' : 'font-medium')}>{title}</div>
              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
            </div>
          );
        }}
      </Link>
    </NavigationMenuLink>
  );
};
ListItem.displayName = 'ListItem';

const CONTROLPTIONS: { title: string; to: LinkOptions['to']; description: string }[] = [
  {
    title: 'Página Inicial',
    description: 'Descrição da página de ínicio.',
    to: '/',
  },
];
const ENGINEERINGOPTIONS: { title: string; to: LinkOptions['to']; description: string }[] = [
  {
    title: 'Listagem',
    description: 'Gerencie os usuários cadastrados.',
    to: '/users',
  },
  {
    title: 'Criar',
    description: 'Crie os novos usuários por aqui.',
    to: '/users/create',
  },
];
