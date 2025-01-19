import { Breadcrumbs } from '@components/BreadcrumbsTSR';
import { Separator } from '@components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@components/ui/sidebar';
import { PropsWithChildren } from 'react';
import { AppSidebar } from './app-sidebar';

export function SidebarComponent({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex w-full flex-1 flex-col gap-4 pt-0 lg:p-4">
          <header className="flex shrink-0 items-center gap-2 pt-4 max-lg:p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumbs />
            </div>
          </header>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
