import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import api from '@services/api/axios';
import { HandleError } from '@services/utils/handleError';
import { useAuth } from '@services/hooks/auth';

function Logout() {
  return api.post(`/auth/logout`);
}
export const useMutateLogout = () => {
  const auth = useAuth();
  const { invalidate, navigate } = useRouter();
  return useMutation({
    mutationFn: () => Logout(),
    onSuccess() {
      auth.logout().then(() => {
        invalidate().finally(() => {
          navigate({ to: '/' });
        });
      });
    },
    onError(error) {
      HandleError(error);
    },
  });
};
