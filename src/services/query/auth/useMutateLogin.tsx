import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import api from '@services/api/axios';
import { LoginType } from '@services/types/Login';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@services/hooks/auth';

function LogIn(login: LoginType) {
  return api.post(`/auth/login`, login);
}
export const useMutateLogin = () => {
  const { invalidate } = useRouter();
  const auth = useAuth();
  return useMutation({
    mutationFn: (login: LoginType) => LogIn(login),
    onSuccess({ data }) {
      auth.login(data, data.token).then(() => invalidate());
    },
    onError(error) {
      if (error instanceof AxiosError && error.code === 'ERR_NETWORK' && error.status === undefined) {
        toast.error('Não obtivemos resposta do servidor', { description: 'Verifique se a URL está correta.' });
      } else if (isAxiosError(error)) {
        toast.error('Não foi possível realizar essa operação', { description: error.response?.data.message });
      } else {
        console.log('Error Login:', error);
      }
    },
  });
};
