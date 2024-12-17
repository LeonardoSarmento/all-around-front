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
import { DateLocaleSchema, DateModeSchema, DateRangeSchema, DateSchema } from './Date';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { InputProps } from '@components/ui/input';
import { SelectContentProps } from '@radix-ui/react-select';
import { CalendarProps } from '@components/ui/calendar';
import { AutosizeTextAreaProps } from '@components/ui/autosize-textarea';
import cnpj from '../CNPJ';
import { PhoneSchema } from './Phone';
import { MacAddress } from './MacAddress';
import { IpSchema } from './Ip';
import { CpfSchema } from './Cpf';

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
  type: z.enum(['input', 'password', 'number', 'textarea']),
  placeholder: z.string(),
  mask: z
    .union([
      z.literal('cnpj'),
      z.literal('cpf'),
      z.literal('phone'),
      z.literal('ip'),
      z.literal('macAddress'),
      z.function().args(z.string()).returns(z.string()),
    ])
    .optional(),
});
export type BaseInputT = z.infer<typeof baseInputSchema>;
const ComboboxInputSchema = z.object({
  /* Array de opções para o component de combobox. */
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
  /* Array de opções para o component de switch. */
  type: z.literal('switch'),
  disabled: z.boolean().optional(),
});
const FileUploadInputSchema = z.object({
  /* Array de opções para o component de file upload. */
  type: z.literal('file-upload'),
  disabled: z.boolean().optional(),
});

export const DateInputSchema = z.object({
  /* Array de opções para o component de date. */
  type: z.literal('date'),
  placeholder: z.string().optional(),
  locale: DateLocaleSchema.optional(),
  mode: DateModeSchema,
  format: z.enum(['long', 'short']).default('long').optional(),
});
const RadioInputSchema = z.object({
  /* Array de opções para o component de radio. */
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
    DateInputSchema,
  ])
  .and(DynamicFormSchema);

export type DynamicFormType<TFieldValues extends FieldValues> = z.infer<typeof parameterTypeSchema> & {
  /* Propriedade control do hook useForm do react-hook-form. */
  control: Control<TFieldValues>;

  /* Propriedade name do hook useForm do react-hook-form. */
  name: Path<TFieldValues>;

  className?: string;
} & (
    | PasswordT
    | NumberT
    | TextAreaT
    | DateT
    | SelectT
    | SwitchT
    | MultiSelectT
    | CheckboxT
    | RadioT
    | ComboboxItemT
    | FileUploadT
    | InputT
  );

type PasswordT = {
  type: 'password';
} & InputProps;

type NumberT = {
  type: 'number';
} & InputProps;

type TextAreaT = {
  type: 'textarea';
} & AutosizeTextAreaProps;

type DateT = {
  type: 'date';
} & CalendarProps;

type SelectT = {
  type: 'select';
} & SelectContentProps &
  React.RefAttributes<HTMLDivElement>;

type SwitchT = {
  type: 'switch';
} & React.RefAttributes<HTMLButtonElement>;

type MultiSelectT = {
  type: 'multi-select';
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type CheckboxT = {
  type: 'checkbox';
} & React.RefAttributes<HTMLButtonElement>;

type RadioT = {
  type: 'radio';
} & RadioGroupProps &
  React.RefAttributes<HTMLDivElement>;

type ComboboxItemT = {
  type: 'combobox';
  onCustomSelect?: (value: string) => void;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

type FileUploadT = {
  type: 'file-upload';
} & React.HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean;
  } & React.RefAttributes<HTMLDivElement>;

type InputT = {
  type: 'input';
} & InputProps;

export const DynamicSchemaTestingComponent = z.object({
  input: z
    .string({
      required_error: 'Conteúdo é obrigatório.',
    })
    .min(2, { message: 'Conteúdo deve ter pelo menos 2 caracteres.' })
    .trim(),
  email: z.string().email({ message: 'E-mail inválido.' }).trim(),
  link: z
    .string()
    .refine((value) => /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value), {
      message: 'Por favor, escreva uma URL válida.',
    })
    .optional(),
  cnpj: cnpj(),
  phone: PhoneSchema,
  macAddress: MacAddress,
  ip: IpSchema,
  cpf: CpfSchema,
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .min(8, {
      message: 'Senha deve conter no mínimo 8 caracteres.',
    })
    .trim()
    .regex(new RegExp('.*[A-Z].*'), { message: 'Senha deve conter pelo menos uma letra maiúscula.' })
    .regex(new RegExp('.*[a-z].*'), { message: 'Senha deve conter pelo menos uma letra minúscula.' })
    .regex(new RegExp('.*\\d.*'), { message: 'Senha deve conter pelo menos um número' })
    .regex(new RegExp('.*[!@#$%^&*.].*'), {
      message: 'Senha deve conter pelo menos um caractere especial: !@#$%^&*.',
    })
    .trim(),
  number: z.number().int().positive().min(1, 'Valor mínimo de 1.').max(100, 'Valor máximo de 100.'),
  checkbox: CheckboxSchema,
  combobox: ComboboxSchema,
  select: SelectSchema,
  multiSelect: MultiSelectSchema,
  radio: RadioSchema,
  switch: SwitchSchema,
  textarea: TextareaSchema,
  fileUpload: FileUploadSchema,
  date: DateSchema,
  rangeDate: DateRangeSchema,
});
export type DynamicSchemaTestingComponentType = z.infer<typeof DynamicSchemaTestingComponent>;
