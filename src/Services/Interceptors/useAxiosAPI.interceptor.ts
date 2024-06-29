import { AxiosInstance } from 'axios';
import _ from 'lodash';
import { useNavigate } from 'react-router';
import useAuth from '../Hooks/useAuth';
import { useAlert } from '../Context/Alert/AlertProvider';

const useAxiosAPIInterceptor = (axios: AxiosInstance) => {
  const { setAuth } = useAuth();
  const { triggerAlert } = useAlert();
  const navigate = useNavigate();
  axios.interceptors.request.use(
    (config) => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const configModified = _.cloneDeep(config);
      if (apiKey) {
        configModified.headers['x-api-key'] = apiKey;
      }
      return configModified;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      triggerAlert('Session failed, check your api key is correct', 'error');
      navigate('/login', { replace: true });
      setAuth({});
      localStorage.removeItem('user');
      return Promise.reject(error);
    }
  );
  return axios;
};

export default useAxiosAPIInterceptor;
