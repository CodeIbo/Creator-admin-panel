import { useNavigate } from 'react-router-dom';
import axios from '../Api/Axios';
import { useAlert } from '../Context/Alert/AlertProvider';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();
  const navigate = useNavigate();

  const refresh = async () => {
    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        setAuth((prev: any) => {
          return { ...prev, accessToken: response.data.accessToken };
        });
        return accessToken;
      }
      triggerAlert('Session expired, please log in again.', 'error');
      navigate('/login', { replace: true });
      return null;
    } catch (_err) {
      triggerAlert('Session error, please log in again.', 'error');
      navigate('/login', { replace: true });
      return null;
    }
  };
  return refresh;
};

export default useRefreshToken;
