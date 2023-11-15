import { useNavigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { axiosPrivate } from '../Api/Axios';

const useGetData = (url: string, id?: string) => {
  const [data, setData] = useState({});
  const [err, setErr] = useState<null | { [key: string]: string } | object>(
    null
  );

  const axiosPrivates = axiosPrivate;
  const navigate = useNavigate();
  const location = useLocation();
  let compiledLink = '';
  compiledLink = url;
  if (id) {
    compiledLink += `/${id}`;
  }
  const fetchData = async (isMounted: boolean, controller: AbortController) => {
    try {
      const response = await axiosPrivates.get(`${compiledLink}`, {
        signal: controller.signal,
      });
      console.log(response.data);
      if (isMounted) {
        setData(response.data);
      }
    } catch (error: any) {
      navigate('/login', { state: { from: location }, replace: true });
      if (typeof error !== 'undefined') {
        setErr(error);
      }
    }
  };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    fetchData(isMounted, controller);

    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });
  if (err) {
    return err;
  }
  return data;
};

export default useGetData;
