import { z } from 'zod';
import { roleSchema } from './Role';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: 'Nome muito curto' }).trim(),
  email: z.string().email({ message: 'E-mail inválido' }).trim(),
  company: z.string().trim().optional(),
  role: roleSchema,
});

export type UserType = z.infer<typeof UserSchema>;

export const PasswordSchema = z
  .object({
    password: z
      .string({ required_error: 'Senha é obrigatória' })
      .min(8, {
        message: 'Senha deve conter no mínimo 8 caracteres',
      })
      .trim()
      .regex(new RegExp('.*[A-Z].*'), { message: 'Senha deve conter pelo menos uma letra maiúscula' })
      .regex(new RegExp('.*[a-z].*'), { message: 'Senha deve conter pelo menos uma letra minúscula' })
      .regex(new RegExp('.*\\d.*'), { message: 'Senha deve conter pelo menos um número' })
      .regex(new RegExp('.*[!@#$%^&*.].*'), {
        message: 'Senha deve conter pelo menos um caractere especial: !@#$%^&*.',
      }),
    confirmPassword: z.string({ required_error: 'Confirmação de senha é obrigatória' }).min(1, {
      message: 'Confirmação de senha não pode ser vazia',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Senhas devem ser iguais',
    path: ['confirmPassword'],
  });

export type PasswordTypes = z.infer<typeof PasswordSchema>;

export const CreateUserSchema = UserSchema.omit({ id: true }).extend({ PasswordSchema });
export type CreateUserType = z.infer<typeof CreateUserSchema>;
