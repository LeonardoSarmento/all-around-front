import { login as LoginSlice, logout, updateInfo } from '@services/state/slice';
import { AppDispatch, RootState } from '@services/state/store';
import { LoginType } from '@services/types/Login';
import { useDispatch, useSelector } from 'react-redux';

export function useAuth() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  return {
    ...auth,
    login: (login: LoginType, token: string) => dispatch(LoginSlice({ login, token })),
    logout: () => dispatch(logout()),
    updateInfo: (token: string) => dispatch(updateInfo(token)),
  };
}

export type AuthContext = {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  roleCode: string | null;
  login: (login: LoginType, token: string) => void;
  logout: () => void;
  updateInfo: (token: string) => void;
};
