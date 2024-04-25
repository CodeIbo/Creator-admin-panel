import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from '../Api/Axios';
import { useAlert } from '../Context/Alert/AlertProvider';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();
  const [cookies, setCookie, removeCookie, updateCookies] = useCookies([
    'user',
  ]);
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        setAuth((prev) => {
          return { ...prev, accessToken: response.data.accessToken };
        });
        updateCookies();
        setCookie('user', { accessToken });
        return accessToken;
      }
      triggerAlert('Session expired, please log in again.', 'error');
      removeCookie('user');
      navigate('/login', { replace: true });
      return null;
    } catch (_err) {
      triggerAlert('Session error, please log in again.', 'error');
      removeCookie('user');
      navigate('/login', { replace: true });
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
