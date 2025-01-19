import { Button, ButtonProps } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RoleButton } from '../buttons/RoleButton';
import { DeleteIcon } from '@components/icons';
import React from 'react';

type DialogType = {
  title: string;
  description?: string;
  buttonText?: string;
  mutate?: () => void;
  buttonType?: 'rowAction' | 'button';
} & ButtonProps;

export const DialogComponent = React.forwardRef<HTMLButtonElement, DialogType>(
  ({ title, buttonText, mutate, buttonType = 'button', ...props }, ref) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <RoleButton {...props} ref={ref} variant={buttonType === 'rowAction' ? 'outline' : 'destructive'} size="sm">
            {buttonType === 'rowAction' ? <DeleteIcon /> : buttonText ? buttonText : 'Deletar'}
          </RoleButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Após excluir os registros selecionados, não é possível recuperar esses registros.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <RoleButton type="button" onClick={mutate} variant="destructive">
                Deletar
              </RoleButton>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
