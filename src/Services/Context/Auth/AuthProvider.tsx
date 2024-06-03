import { createContext, useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import moment from 'moment';
import ChildProp from '../../../Models/ChildrenType';
import useRefreshToken from '../../Hooks/userRefreshToken';
import { useAlert } from '../Alert/AlertProvider';

interface UserDataLC {
  email: string;
  nick_name: string;
}

interface AuthState {
  email?: string;
  nick_name?: string;
  accessToken?: string;
  lastVisited?: string;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

const defaultAuthState: AuthState = {
  email: undefined,
  nick_name: undefined,
  accessToken: undefined,
  lastVisited: undefined,
};

const AuthContext = createContext<AuthContextType>({
  auth: defaultAuthState,
  setAuth: () => {},
});

export function AuthProvider({ children }: ChildProp) {
  const [auth, setAuth] = useState(defaultAuthState);
  const refreshAccessToken = useRefreshToken();
  const navigation = useNavigate();
  const location = useLocation();
  const { triggerAlert } = useAlert();

  const value = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );
  useEffect(() => {
    const refreshToken = async () => {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        setAuth((prev) => {
          return { ...prev, accessToken: newAccessToken };
        });
        triggerAlert('Welcome Back', 'success');
        navigation(location, { replace: true });
      }
    };
    const today = moment().startOf('day').toISOString();
    const lastVisit = Cookies.get('lastVisit');
    const localUserData = localStorage.getItem('user');
    if (localUserData) {
      const parsedUserData: UserDataLC = JSON.parse(localUserData);
      setAuth((prev) => {
        return { ...prev, ...parsedUserData };
      });
    }
    if (lastVisit === today) {
      if (!auth.lastVisited) {
        setAuth((prev) => {
          return { ...prev, lastVisited: today };
        });
      }
      refreshToken();
    } else {
      setAuth((prev) => {
        return { ...prev, lastVisit };
      });
      Cookies.set('lastVisit', today, {
        expires: moment().endOf('day').toDate(),
      });
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
