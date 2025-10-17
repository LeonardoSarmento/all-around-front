import { useCalendar } from "@components/calendar-v2/contexts/calendar-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import { Button } from "@components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { cn } from "@lib/utils";
import { useFilters } from "@services/hooks/useFilters";

export function UserSelect() {
  const { users, filterEventsBySelectedUser } = useCalendar();
  const { filters, setFilters } = useFilters("/_auth/calendar/calendar-v2");

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            `h-9 justify-between text-sm ${
              !filters.userId && "text-muted-foreground font-normal"
            }`
          )}
        >
          {filters.userId
            ? users.find((item) => item.id === filters.userId)?.name
            : "Selecione uma opção"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Procure aqui" className="h-9" />
          <CommandList>
            <CommandEmpty>Opção não encontrada</CommandEmpty>
            <CommandGroup>
              {users.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    setFilters({ ...filters, userId: item.id });
                    filterEventsBySelectedUser(item.id);
                  }}
                >
                  {item.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      item.id === filters.userId ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
