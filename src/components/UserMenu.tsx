import { LogOut, MonitorCog, Moon, Settings, Sun } from 'lucide-react';
import { Button, ButtonProps } from '@components/ui/button';
import { useTheme } from './providers/theme/Theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useMutateLogout } from '@services/query/auth/useMutateLogout';

type UserMenuBtn = ButtonProps & React.RefAttributes<HTMLButtonElement>;

export function UserMenu({ ...props }: UserMenuBtn) {
  const { setTheme } = useTheme();
  const { mutate } = useMutateLogout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button {...props} variant="outline" size="icon" className="h-8 w-8 rounded-full">
          <Settings className="h-8 w-8 text-primary" />
          <span className="sr-only">Configuração</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="relative left-2 min-w-full">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Administrador</p>
            <p className="text-xs leading-none text-muted-foreground">admin@alianca.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Tema</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="min-w-fit">
              <DropdownMenuItem onClick={() => setTheme('light')} className="flex items-center justify-between gap-3">
                Claro
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('dark')} className="flex items-center justify-between gap-3">
                Escuro
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme('system')} className="flex items-center justify-between gap-3">
                Sistema
                <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem className="flex cursor-pointer items-center" onClick={() => mutate()}>
          <LogOut />
          <p className="text-xs leading-none text-muted-foreground">Sair</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
