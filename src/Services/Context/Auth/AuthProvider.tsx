/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
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
  setAuth: () => {}, // Empty implementation
});

export function AuthProvider({ children }: ChildProp) {
  const [auth, setAuth] = useState(defaultAuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
