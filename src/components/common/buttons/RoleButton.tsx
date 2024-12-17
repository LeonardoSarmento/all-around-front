import React from 'react';
import { Button, ButtonProps } from '@components/ui/button';
import { RoleGuard } from '@services/hooks/useRoleGuard';

type RoleButtonProps = ButtonProps;

export const RoleButton = React.forwardRef<HTMLButtonElement, RoleButtonProps>(({ children, ...props }, ref) => {
  return (
    <RoleGuard>
      <Button {...props} ref={ref}>
        {children}
      </Button>
    </RoleGuard>
  );
});

RoleButton.displayName = 'RoleButton';
