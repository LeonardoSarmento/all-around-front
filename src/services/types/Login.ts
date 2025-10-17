import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.email({ message: 'Verifica ai que tem coisa estranha nesse email ai tá' }).trim(),
  password: z
    .string('Senha é obrigatória')
    .min(3, { message: 'Senha muito curta' })
    .max(14, { message: 'Senha muito longa' })
    .trim(),
});

export type LoginType = z.infer<typeof LoginSchema>;
