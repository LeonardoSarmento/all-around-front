import { Button, ButtonProps } from '@components/ui/button';
import { useAuth } from '@services/hooks/auth';
import { roleSchema } from '@services/types/Role';
type RoleButton = ButtonProps;

export function RoleButton({ children, ...props }: RoleButton) {
  const user = useAuth();
  const allowedRoles: string[] = [roleSchema.enum.ADMIN];
  allowedRoles.some((role) => role === user.roleCode);

  return allowedRoles.some((role) => role === user.roleCode) ? <Button {...props}>{children}</Button> : null;
}
