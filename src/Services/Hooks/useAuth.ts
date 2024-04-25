import { useContext } from 'react';
import AuthContext from '../Context/Auth/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
