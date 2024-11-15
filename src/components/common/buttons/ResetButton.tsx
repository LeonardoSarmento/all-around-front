import { Button } from '@components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useNavigate } from '@tanstack/react-router';
import { HTMLAttributes } from 'react';

type ResetButtonType = {
  filters: { pageIndex?: number; pageSize?: number };
} & HTMLAttributes<HTMLButtonElement>;
export default function ResetButton({ filters, ...props }: ResetButtonType) {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      onClick={() =>
        navigate({
          to: '.',
          search: { pageIndex: filters.pageIndex, pageSize: filters.pageSize },
        })
      }
      className="h-8 px-2 lg:px-3"
      {...props}
    >
      Resetar
      <Cross2Icon className="ml-2 h-4 w-4" />
    </Button>
  );
}
