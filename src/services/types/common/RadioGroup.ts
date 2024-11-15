import { z } from 'zod';

export const RadioSchema = z.string({
  required_error: 'Selecione uma opção.',
});
export type RadioType = z.infer<typeof RadioSchema>;

export const RadioOptionsSchema = z.object({ id: z.string(), label: z.string() }).array();
export type RadioOptionsType = z.infer<typeof RadioOptionsSchema>;
