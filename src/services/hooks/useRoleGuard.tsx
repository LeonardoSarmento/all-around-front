import { roleSchema } from '@services/types/Role';
import { PropsWithChildren } from 'react';
import { useAuth } from './auth';

export function RoleGuard({ children }: PropsWithChildren) {
  const user = useAuth();
  const allowedRoles: string[] = [roleSchema.Enum.ADMIN];

  return allowedRoles.some((role) => role === user.roleCode) ? <>{children}</> : null;
}
