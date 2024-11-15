import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input, InputPassword } from '@components/ui/input';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
} from '@components/ui/extensions/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@components/ui/select';
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@components/ui/extensions/file-uploader';
import { DropzoneOptions } from 'react-dropzone';
import { Check, ChevronsUpDown, Paperclip } from 'lucide-react';
import { DynamicFormType } from '@services/types/common/DynamicFormType';
import { Checkbox } from '@components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@components/ui/command';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import { Switch } from '@components/ui/switch';
import { AutosizeTextarea } from '@components/ui/autosize-textarea';

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Arraste seu arquivo</span>
        &nbsp; ou clique para selecionar
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">formato permitido: .CSV</p>
    </>
  );
};

const dropzone = {
  accept: {
    // 'image/*': ['.jpg', '.jpeg', '.png'],
    '.csv': ['text/csv'],
  },
  multiple: false,
  maxFiles: 5,
  maxSize: 1 * 1024 * 1024,
} satisfies DropzoneOptions;

export default function DynamicForm<TFieldValues extends FieldValues>({
  hint,
  ...props
}: DynamicFormType<TFieldValues> & { hint?: string }) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', props.className)}>
          {props.hideLabel ? null : <FormLabel>{props.label}</FormLabel>}
          {DynamicComponent({ field, hint, ...props })}
          {props.hideDescription ? null : <FormDescription>{props.description}</FormDescription>}
          {props.hideErrorMessage ? null : <FormMessage className={props.classNameMessage} />}
        </FormItem>
      )}
    />
  );
}

function DynamicComponent<TFieldValues extends FieldValues>({
  hint,
  ...props
}: DynamicFormType<TFieldValues> & { field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>; hint?: string }) {
  switch (props.type) {
    case 'password':
      return (
        <InputPassword className={props.className} placeholder={props.placeholder} type="password" {...props.field} />
      );
    case 'textarea':
      return (
        <FormControl>
          <AutosizeTextarea
            className={cn('resize-none', props.className)}
            placeholder={props.placeholder}
            {...props.field}
          />
        </FormControl>
      );
    case 'select':
      return (
        <>
          <Select onValueChange={props.field.onChange} defaultValue={props.field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={props.placeholder ?? 'Selecione uma das opções'}
                  className={props.className}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {props.selectOptions?.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    case 'switch':
      return (
        <>
          <FormControl>
            <Switch
              checked={props.field.value}
              onCheckedChange={props.field.onChange}
              disabled={props.disabled}
              aria-readonly
              className={props.className}
            />
          </FormControl>
        </>
      );
    case 'multi-select':
      return (
        <>
          <MultiSelector onValuesChange={props.field.onChange} values={props.field.value}>
            <MultiSelectorTrigger>
              <MultiSelectorInput
                placeholder={props.placeholder ?? 'Selecione suas opções'}
                className={props.className}
              />
            </MultiSelectorTrigger>
            <MultiSelectorContent>
              <MultiSelectorList>
                {props.multiSelectOptions?.map((item) => (
                  <MultiSelectorItem key={item.id} value={item.name}>
                    <span>{item.name}</span>
                  </MultiSelectorItem>
                ))}
              </MultiSelectorList>
            </MultiSelectorContent>
          </MultiSelector>
        </>
      );
    case 'checkbox':
      return (
        <>
          {props.checkboxOptions?.map((item) => (
            <FormField
              key={item.id}
              control={props.control}
              name={props.name}
              render={({ field }) => {
                return (
                  <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        className={props.className}
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(field.value?.filter((value: string) => value !== item.id));
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </>
      );
    case 'radio':
      return (
        <>
          <FormControl>
            <RadioGroup
              onValueChange={props.field.onChange}
              defaultValue={props.field.value}
              className={cn('flex flex-col space-y-1', props.className)}
            >
              {props.radioOptions.map((item) => (
                <FormItem key={item.id} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value={item.id} />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </>
      );
    case 'combobox':
      return (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    `h-9 w-[200px] justify-between ${!props.field.value && 'text-muted-foreground'}`,
                    props.className,
                  )}
                >
                  {props.field.value
                    ? props.comboboxOptions.find((item) => item.value === props.field.value)?.label
                    : (props.placeholder ?? 'Selecione uma opção')}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Procure aqui" className="h-9" />
                <CommandList>
                  <CommandEmpty>Opção não encontrada</CommandEmpty>
                  <CommandGroup>
                    {props.comboboxOptions.map((item) => (
                      <CommandItem value={item.label} key={item.label} onSelect={props.field.onChange}>
                        {item.label}
                        <Check
                          className={cn('ml-auto', item.label === props.field.value ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </>
      );
    case 'file-upload':
      return (
        <>
          <FileUploader
            value={props.field.value}
            onValueChange={props.field.onChange}
            dropzoneOptions={dropzone}
            reSelect={true}
            className={props.className}
          >
            <FileInput className="outline-dashed outline-1 outline-white">
              <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
                <FileSvgDraw />
              </div>
            </FileInput>
            {props.field.value && props.field.value.length > 0 && (
              <FileUploaderContent>
                {props.field.value.map((file: File, i: number) => (
                  <FileUploaderItem key={i} index={i}>
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <span>{file.name}</span>
                  </FileUploaderItem>
                ))}
              </FileUploaderContent>
            )}
          </FileUploader>
        </>
      );
    default:
      return (
        <>
          <FormControl>
            <Input className={props.className} placeholder={props.placeholder} hint={hint} {...props.field} />
          </FormControl>
        </>
      );
  }
}
