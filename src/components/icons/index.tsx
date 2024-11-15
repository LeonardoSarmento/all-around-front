import { FileInput, LucideProps, Pencil, Trash2 } from 'lucide-react';

type LucideIconType = LucideProps;
function AccessIcon({ ...props }: LucideIconType) {
  return <FileInput className="text-create" {...props} />;
}
function DeleteIcon({ ...props }: LucideIconType) {
  return <Trash2 className="text-delete" {...props} />;
}
function EditIcon({ ...props }: LucideIconType) {
  return <Pencil className="text-clear" {...props} />;
}

export { AccessIcon, DeleteIcon, EditIcon };
