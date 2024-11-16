import * as React from 'react';
import { type LucideIcon } from 'lucide-react';
import { NavMain } from '@components/sidebar/nav-main';
import { NavProjects } from '@components/sidebar/nav-projects';
import { NavSecondary } from '@components/sidebar/nav-secondary';
import { NavUser } from '@components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, LinkOptions } from '@tanstack/react-router';
import { Icons } from '@components/icons/icon';

type NavOptions = {
  title: string;
  url: LinkOptions['to'];
  icon?: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);
};
type OuterLink = {
  title: string;
  url: string;
  icon?: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);
};

type SidebarOptions = {
  title: string;
  url: LinkOptions['to'];
  icon: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);
  isActive?: boolean;
  items?: NavOptions[];
};

export type SidebarMenuOptions = {
  user: { name: string; email: string; avatar: string };
  navMain: SidebarOptions[];
  navSecondary: OuterLink[];
  projects: OuterLink[];
};

const data: SidebarMenuOptions = {
  user: {
    name: 'Leonardo',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Calendário',
      url: '/calendar',
      icon: Icons.calendar,
      isActive: true,
    },
    {
      title: 'Componentes',
      url: '/components',
      icon: Icons.component,
      isActive: true,
    },
    {
      title: 'Gráficos',
      url: '/charts',
      icon: Icons.charts,
      isActive: true,
      items: [
        {
          title: 'Barras',
          url: '/charts/bar',
        },
        {
          title: 'Linhas',
          url: '/charts/line',
        },
        // {
        //   title: 'Pizza',
        //   url: '/',
        // },
        // {
        //   title: 'Radar',
        //   url: '/',
        // },
        // {
        //   title: 'Radial',
        //   url: '/',
        // },
      ],
    },
    {
      title: 'Usuários',
      url: '/users',
      icon: Icons.users,
      isActive: true,
      items: [
        {
          title: 'Criar',
          url: '/users/create',
        },
        {
          title: 'Listagem',
          url: '/users',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Github',
      url: 'https://github.com/LeonardoSarmento',
      icon: Icons.github,
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/leonardo-araujo-sarmento',
      icon: Icons.linkedIn,
    },
    {
      title: 'Instagram',
      url: 'https://instagram.com/leonardo.a.sarmento',
      icon: Icons.instagram,
    },
  ],
  projects: [
    {
      title: 'Portfolio',
      url: 'https://leosarmento.com/',
      icon: Icons.contactRound,
    },
    {
      title: 'Router',
      url: 'https://routing.leosarmento.com/',
      icon: Icons.scanFace,
    },
    {
      title: 'Tabela',
      url: 'https://tables.leosarmento.com/',
      icon: Icons.table,
    },
    {
      title: 'Internacionalização',
      url: 'https://i18n.leosarmento.com/',
      icon: Icons.languages,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Icons.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Template Project</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
