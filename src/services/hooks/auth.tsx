import { LoginType } from '@services/types/Login';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import * as React from 'react';

export interface AuthContext {
  isAuthenticated: boolean;
  login: (login: LoginType, token: string) => Promise<void>;
  logout: () => Promise<void>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  user: string | null;
  roleCode: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const key = 'project.auth.user';

export function getStoredUser() {
  return localStorage.getItem(key);
}

function setStoredUser(user: string | null) {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
}

function isValidJWT(token: string): boolean {
  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtRegex.test(token);
}

const keyToken = 'project.auth.token';

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

function getDecodedToken(token: string | null) {
  const decodedToken = token && isValidJWT(token) ? jwtDecode<JwtPayload & { roleCode: string }>(token) : null;
  if (!decodedToken) {
    return null;
  }
  return decodedToken.roleCode;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(getStoredUser());
  const [token, setToken] = React.useState<string | null>(getStoredToken());
  const [roleCode, setRoleCode] = React.useState<string | null>(getDecodedToken(token));
  const isAuthenticated = !!token && isValidJWT(token);

  const logout = React.useCallback(async () => {
    setStoredToken(null);
    setToken(null);
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = React.useCallback(async (login: LoginType, token: string) => {
    setStoredUser(login.email);
    setUser(login.email);
    setStoredToken(token);
    setToken(token);
    setRoleCode(getDecodedToken(token));
  }, []);

  React.useEffect(() => {
    setUser(getStoredUser());
    setToken(getStoredToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token, setToken, roleCode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
