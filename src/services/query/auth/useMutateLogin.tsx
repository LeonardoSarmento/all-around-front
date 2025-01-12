import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { LoginType } from '@services/types/Login';
import { AxiosError, isAxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@services/hooks/auth';

function LogIn(login: LoginType) {
  // return api.post(`/auth/login`, login);
  return Promise.resolve({
    email: login.email,
    password: login.password,
  });
}
export const useMutateLogin = () => {
  const { invalidate } = useRouter();
  const auth = useAuth();
  return useMutation({
    mutationFn: (login: LoginType) => LogIn(login),
    onSuccess(_, { email, password }) {
      auth.login(
        { email, password },
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJyb2xlQ29kZSI6IkFETUlOIiwiaWF0IjoxNTE2MjM5MDIyfQ.FiDylQP0LigINTI0Va91X76NYE7dNLvf4lk84qiCHPg',
      );
      invalidate();
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
