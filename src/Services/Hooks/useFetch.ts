import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';
import {
  AxiosResponseUnTypedData,
  AxiosErrorData,
} from '../../Models/AxiosResponse';

export default function useFetch() {
  const [response, setResponse] = useState<null | {
    httpStatus: string;
    statusCode: number;
    timeStamp: string;
    data: AxiosResponseUnTypedData;
  }>(null);
  const [error, setError] = useState<AxiosErrorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivates = useAxiosPrivate();

  const apiHandler = async ({
    method,
    url,
    data = null,
    config = undefined,
  }: {
    method: 'get' | 'put' | 'post' | 'delete';
    url: string;
    config?: AxiosRequestConfig<any> | undefined;
    data?: any | null;
  }) => {
    const isGetData = method === 'get';

    axiosPrivates[method](
      url,
      isGetData ? config : data,
      isGetData ? undefined : config
    )
      .then((res) => {
        setResponse(res.data);
        return response;
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((err: AxiosErrorData) => {
        setError(err);
      });
  };
  return { response, error, isLoading, apiHandler };
}
