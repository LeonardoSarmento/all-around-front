import { z } from 'zod';

export const SwitchSchema = z.boolean();
export type SwitchType = z.infer<typeof SwitchSchema>;
