import { useNavigate, useLocation } from 'react-router';
import { useState } from 'react';
import { axiosPrivate } from '../Api/Axios';

const usePostData = async (
  url: string,
  data: { [key: string]: string },
  controller: AbortController,
  isMounted: boolean
) => {
  const [responseData, setResponseData] = useState({});
  const [err, setErr] = useState<null | { [key: string]: string } | object>(
    null
  );
  const axiosPrivates = axiosPrivate;
  const navigate = useNavigate();
  const location = useLocation();
  try {
    const response = await axiosPrivates.post(`${url}`, data, {
      signal: controller.signal,
    });
    console.log(response.data);
    if (isMounted) {
      setResponseData(response.data);
    }
  } catch (error: any) {
    navigate('/login', { state: { from: location }, replace: true });
    if (typeof error !== 'undefined') {
      setErr(error);
    }
  }
  if (err) {
    return err;
  }
  return responseData;
};

export default usePostData;
