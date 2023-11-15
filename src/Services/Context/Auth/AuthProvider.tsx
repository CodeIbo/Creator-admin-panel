/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import ChildProp from '../../../Models/ChildrenType';
import AuthContextType from '../../../Models/AuthContextType';

const AuthContext = createContext({});

export function AuthProvider({ children }: ChildProp) {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
