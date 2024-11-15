import { UseToast } from '@components/common/toast/toasts';
import { AxiosError, isAxiosError } from 'axios';
import { InvalidTokenError } from 'jwt-decode';

export function HandleError(error: Error) {
  if (error instanceof AxiosError && error.code === 'ERR_NETWORK' && error.status === undefined) {
    return UseToast({
      type: 'error',
      title: 'Não obtivemos resposta do servidor',
      description: 'Verifique se a URL está correta.',
    });
  } else if (error instanceof InvalidTokenError) {
    return UseToast({
      type: 'error',
      title: 'Encontramos uma resposta inesperada',
      description: 'Verifique se a URL está correta.',
    });
  } else if (isAxiosError(error)) {
    return UseToast({
      type: 'error',
      title: 'Não foi possível realizar essa operação',
      description: error.response?.data.message,
    });
  } else {
    console.log('Error Login:', error);
  }
}
