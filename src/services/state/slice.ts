import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { LoginType } from '@services/types/Login';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: string | null;
  roleCode: string | null;
}

const keyUser = 'template.auth.user';

function getStoredUser(): string | null {
  return localStorage.getItem(keyUser);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(keyUser, user);
  } else {
    localStorage.removeItem(keyUser);
  }
}

function isValidJWT(token: string): boolean {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtRegex.test(token);
}

const keyToken = 'template.auth.token';

export function getStoredToken() {
  return localStorage.getItem(keyToken);
}

function setStoredToken(token: string | null) {
  if (token) {
    localStorage.setItem(keyToken, token);
  } else {
    localStorage.removeItem(keyToken);
  }
}

function getDecodedToken(token: string | null): string | null {
  const decodedToken = token && isValidJWT(token) ? jwtDecode<JwtPayload & { roleCode: string }>(token) : null;
  return decodedToken ? decodedToken.roleCode : null;
}

const initialState: AuthState = {
  isAuthenticated: !!getStoredToken() && isValidJWT(getStoredToken()!),
  token: getStoredToken(),
  user: getStoredUser(),
  roleCode: getDecodedToken(getStoredToken()),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ login: LoginType; token: string }>) => {
      const { login, token } = action.payload;
      setStoredUser(login.email);
      state.user = login.email;
      setStoredToken(token);
      state.token = token;
      state.roleCode = getDecodedToken(token);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      setStoredUser(null);
      state.user = null;
      setStoredToken(null);
      state.token = null;
      state.roleCode = null;
      state.isAuthenticated = false;
    },
    updateInfo: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      setStoredToken(token);
      state.token = token;
      state.roleCode = getDecodedToken(token);
    },
  },
});

export const { login, logout, updateInfo } = authSlice.actions;

export default authSlice.reducer;
