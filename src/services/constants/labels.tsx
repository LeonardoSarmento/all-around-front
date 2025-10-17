import { roleSchema } from '@services/types/Role';
import { selectionSchema } from '@services/types/tables/FilterExtension';

export const roles = [
  { id: roleSchema.enum.ADMIN, label: 'Administrador' },
  { id: roleSchema.enum.OPERATOR, label: 'Operador' },
];

export const selection = [
  { id: selectionSchema.enum.SELECTED, label: 'Selecionados' },
  { id: selectionSchema.enum.NOT_SELECTED, label: 'Não selecionados' },
];
