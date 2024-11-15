import { useAuth } from '@services/hooks/auth';
import { toastMessages } from '@services/types/common/toasts';
import { toast } from 'sonner';

export function UseToast({ description, title, type }: toastMessages) {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    toast.error('Sem autorização', {
      description: 'Você não está autentificado no momento. Refaça sua autentificação.',
    });
    return;
  }
  if (type === 'success') {
    console.log('entrei no hook deu ruim');
    toast.success(title, {
      description,
    });
    return;
  }
  toast.error(title, {
    description,
  });
}
