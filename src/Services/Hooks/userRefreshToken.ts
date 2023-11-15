import axios, { axiosPrivate } from '../Api/Axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Unreachable code error
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axiosPrivate.get('/auth/refresh', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
