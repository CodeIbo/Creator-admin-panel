import { useNavigate } from 'react-router-dom';
import Axios, { axiosPrivate } from '../Api/Axios';
import { useAlert } from '../Context/Alert/AlertProvider';
import useAuth from './useAuth';
import fetchAxios from '../Api/fetchAxios';
import { AxiosResponseLoginHandler } from '../../Models/AxiosResponse';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response: AxiosResponseLoginHandler<string> = await fetchAxios({
        axios: Axios,
        method: 'get',
        url: '/auth/refresh',
        config: { withCredentials: true },
      });
      const accessToken = response.data;
      if (accessToken) {
        setAuth((prev) => {
          return { ...prev, accessToken };
        });
        return accessToken;
      }
      triggerAlert('Session expired, please log in again.', 'error');
      navigate('/login', { replace: true });
      return null;
    } catch (_err) {
      triggerAlert('Session expired, please log in again.', 'error');
      navigate('/login', { replace: true });
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
