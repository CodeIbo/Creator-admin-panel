import { createContext, useState, useMemo } from 'react';
import ChildProp from '../../../Models/ChildrenType';

interface AuthState {
  email?: string;
  accessToken?: string;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const defaultAuthState: AuthState = {
  email: undefined,
  accessToken: undefined,
};

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuthState,
  setAuth: () => {},
});

export function AuthProvider({ children }: ChildProp) {
  const [auth, setAuth] = useState(defaultAuthState);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
