import { useMutation } from '@tanstack/react-query';
import api from '@services/api/axios';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { UserType } from '@services/types/User';
import { useRouter } from '@tanstack/react-router';


function PatchUser(user: UserType) {
  return api.patch(`/persons/${user.id}`, user);
}
export const useMutateUser = () => {
  const { invalidate } = useRouter();
  return useMutation({
    mutationFn: (user: UserType) => PatchUser(user),
    onSuccess(_, { name }) {
      toast.success('Alteração feita com sucesso', { description: `Usuário ${name} foi editado.` });
      invalidate();
    },
    onError(error, { id }) {
      if (error instanceof AxiosError && error.code === 'ERR_NETWORK' && error.status === undefined) {
        toast.error('Não obtivemos resposta do servidor', { description: 'Verifique se a URL está correta.' });
      } else if (isAxiosError(error)) {
        toast.error('Não foi possível realizar essa operação', { description: error.response?.data.message });
      } else {
        console.log('Error Edit User: ', id, error);
      }
    },
  });
};
