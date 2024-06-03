import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default function fetchAxios({
  axios,
  method,
  url,
  data = null,
  config = undefined,
}: {
  axios: AxiosInstance;
  method: 'get' | 'put' | 'post' | 'delete';
  url: string;
  config?: AxiosRequestConfig<any> | undefined;
  data?: any | null;
}) {
  const isGetData = method === 'get';

  return axios[method](
    url,
    isGetData ? config : data,
    isGetData ? undefined : config
  ).then((res) => res.data);
}
