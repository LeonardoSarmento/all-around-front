import { Control, FieldValues, Path } from 'react-hook-form';
import { MultiSelectOptionsSchema, MultiSelectSchema } from './MultiSelect';
import { CheckboxOptionsSchema, CheckboxSchema } from './Checkbox';
import { SelectOptionsSchema, SelectSchema } from './Select';
import { z } from 'zod';
import { ComboboxOptionsSchema, ComboboxSchema } from './Combobox';
import { RadioOptionsSchema, RadioSchema } from './RadioGroup';
import { SwitchSchema } from './Switch';
import { FileUploadSchema } from './FileUpload';
import { TextareaSchema } from './TextArea';

const DynamicFormSchema = z.object({
  /* Texto que será renderizado antes do usuários preencher o campo ou título do componente. */

  /* Se deve esconder a renderização da mensagem de error. */
  hideErrorMessage: z.boolean().optional(),

  /* Se deve esconder a renderização do componente label do hook-form. */
  hideLabel: z.boolean().optional(),

  /* Se deve esconder a renderização do componente description do hook-form. */
  hideDescription: z.boolean().optional(),

  description: z.string().optional(),

  label: z.string().optional(),

  className: z.string().optional(),

  classNameMessage: z.string().optional(),
});

const baseInputSchema = z.object({
  type: z.enum(['input', 'password', 'textarea']),
  placeholder: z.string(),
});

const ComboboxInputSchema = z.object({
  /* Array de opções para o component de checkbox. */
  type: z.literal('combobox'),
  comboboxOptions: ComboboxOptionsSchema,
  placeholder: z.string().optional(),
});
const SelectInputSchema = z.object({
  /* Array de opções para o component de select. */
  type: z.literal('select'),
  selectOptions: SelectOptionsSchema,
  placeholder: z.string().optional(),
});
const MultiSelectInputSchema = z.object({
  type: z.literal('multi-select'),
  /* Array de opções para o component de multi-select. */
  multiSelectOptions: MultiSelectOptionsSchema,
  placeholder: z.string().optional(),
});
const CheckboxInputSchema = z.object({
  /* Array de opções para o component de checkbox. */
  type: z.literal('checkbox'),
  checkboxOptions: CheckboxOptionsSchema,
});
const SwitchInputSchema = z.object({
  /* Array de opções para o component de checkbox. */
  type: z.literal('switch'),
  disabled: z.boolean().optional(),
});
const FileUploadInputSchema = z.object({
  /* Array de opções para o component de checkbox. */
  type: z.literal('file-upload'),
});
const RadioInputSchema = z.object({
  /* Array de opções para o component de checkbox. */
  type: z.literal('radio'),
  radioOptions: RadioOptionsSchema,
});

export const parameterTypeSchema = z
  .discriminatedUnion('type', [
    baseInputSchema,
    ComboboxInputSchema,
    CheckboxInputSchema,
    MultiSelectInputSchema,
    RadioInputSchema,
    SelectInputSchema,
    SwitchInputSchema,
    FileUploadInputSchema,
  ])
  .and(DynamicFormSchema);

export type DynamicFormType<TFieldValues extends FieldValues> = z.infer<typeof parameterTypeSchema> & {
  /* Propriedade control do hook useForm do react-hook-form. */
  control: Control<TFieldValues>;

  /* Propriedade name do hook useForm do react-hook-form. */
  name: Path<TFieldValues>;

  className?: string;
};

export const DynamicSchemaTestingComponent = z.object({
  input: z
    .string({
      required_error: 'Conteúdo é obrigatório.',
    })
    .min(2, { message: 'Conteúdo deve ter no mínimo 2 caracteres' })
    .trim(),
  password: z
    .string({
      required_error: 'Por favor, insira uma senha.',
    })
    .min(3, { message: 'Senha deve ter no mínimo 3 caracteres' })
    .max(14, { message: 'Senha deve ter no máximo 14 caracteres' })
    .trim(),
  checkbox: CheckboxSchema,
  combobox: ComboboxSchema,
  select: SelectSchema,
  multiSelect: MultiSelectSchema,
  radio: RadioSchema,
  switch: SwitchSchema,
  textarea: TextareaSchema,
  fileUpload: FileUploadSchema,
});
export type DynamicSchemaTestingComponentType = z.infer<typeof DynamicSchemaTestingComponent>;