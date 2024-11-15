import { roleSchema } from '@services/types/Role';

export const roles = [
  {
    value: roleSchema.Enum.ADMIN,
    label: 'Administrador',
  },
  {
    value: roleSchema.Enum.OPERATOR,
    label: 'Operador',
  },
];
