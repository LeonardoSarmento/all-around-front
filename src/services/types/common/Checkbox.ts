import { z } from 'zod';

export const CheckboxSchema = z.array(z.string()).refine((value) => value.some((item) => item), {
  message: 'É preciso selecionar pelo menos uma opção.',
});
export type CheckboxType = z.infer<typeof CheckboxSchema>;

export const CheckboxOptionsSchema = z.object({ id: z.string(), label: z.string() }).array();
export type CheckboxOptionsType = z.infer<typeof CheckboxOptionsSchema>;
