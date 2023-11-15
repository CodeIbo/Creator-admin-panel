import { useContext, useDebugValue } from 'react';
import AuthContext from '../Context/Auth/AuthProvider';

const useAuth = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, (authen) => (authen?.user ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};

export default useAuth;
