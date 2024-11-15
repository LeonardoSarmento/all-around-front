import { useMutation } from '@tanstack/react-query';
import api from '@services/api/axios';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { CreateUserType } from '@services/types/User';
import { useRouter } from '@tanstack/react-router';

function CreateUser(user: CreateUserType) {
  return api.post(`/persons`, user);
}
export const useMutateCreateUser = () => {
  const { invalidate, navigate } = useRouter();
  return useMutation({
    mutationFn: (user: CreateUserType) => CreateUser(user),
    onSuccess(_, { name }) {
      toast.success('Criação feita com sucesso', { description: `Usuário ${name} foi criado.` });
      invalidate().finally(() => navigate({ to: '..' }));
    },
    onError(error) {
      if (error instanceof AxiosError && error.code === 'ERR_NETWORK' && error.status === undefined) {
        toast.error('Não obtivemos resposta do servidor', { description: 'Verifique se a URL está correta.' });
      } else if (isAxiosError(error)) {
        toast.error('Não foi possível realizar essa operação', { description: error.response?.data.message });
      } else {
        console.log('Error Create User: ', error);
      }
    },
  });
};
