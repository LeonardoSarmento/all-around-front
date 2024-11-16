import { z } from 'zod';

export const FileUploadSchema = z
  .array(
    z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
      message: 'Tamanho de arquivo deve ser no máximo 4MB.',
    }),
    { required_error: 'Selecione pelo menos um arquivo.' },
  )
  .max(5, {
    message: 'Permitido no máximo 5 arquivos.',
  })
  .nullable();
export type FileUploadType = z.infer<typeof FileUploadSchema>;
