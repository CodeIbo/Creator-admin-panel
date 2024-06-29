import { useEffect } from 'react';
import _ from 'lodash';
import { axiosPrivate } from '../Api/Axios';
import useRefreshToken from './userRefreshToken';
import useAxiosAPIInterceptor from '../Interceptors/useAxiosAPI.interceptor';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useAxiosAPIInterceptor(axiosPrivate);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        const configModified = _.cloneDeep(config);
        if (!configModified.headers.Authorization) {
          configModified.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return configModified;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          if (newAccessToken) {
            prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
