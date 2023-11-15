import { useState, useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import useAxiosPrivate from './useAxiosPrivate';
import DynamicObject from '../../Models/DynamicObject';

export default function useFetch() {
  const [response, setResponse] = useState<null | {
    httpStatus: string;
    statusCode: number;
    timeStamp: string;
    data: DynamicObject[];
  }>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivates = useAxiosPrivate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       axiosPrivates[method](url, config, data)
  //         .then((res) => {
  //           setResponse(res.data);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     } catch (err: any) {
  //       setError(err);
  //     }
  //   };

  //   fetchData();
  // }, [axiosPrivates, method, url, data, config]);

  const apiHandler = async ({
    method,
    url,
    data = null,
    config = null,
  }: {
    method: 'get' | 'put' | 'post' | 'delete';
    url: string;
    data?: any;
    config?: AxiosRequestConfig<any> | null;
  }) => {
    try {
      axiosPrivates[method](url, config, data)
        .then((res) => {
          setResponse(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err: any) {
      setError(err);
    }
  };

  return { response, error, isLoading, apiHandler };
}
