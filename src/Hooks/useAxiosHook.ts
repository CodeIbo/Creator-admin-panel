import { useState, useEffect } from 'react'
import axios, { AxiosResponse, CancelToken } from 'axios'
import {post} from '../Interfaces/Post'
import { headersObject } from '../Interfaces/dynamicHeadersObject'

const useAxiosFetch = (dataUrl: string) => {
  const [data, setData] = useState<any>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted: boolean = true
    const source = axios.CancelToken.source()

    const fetchData = async (url: string) => {
      try {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:8888/${url}`, {
          cancelToken: source.token
        })
        if (isMounted) {
          setData(response.data)
          setFetchError(null)
        }
      } catch (error:any) {
        if (axios.isAxiosError(error)) {
          if (isMounted) {
            setFetchError(error.message)
            setData(null)
          }
        } else {
          setFetchError(error)
        }
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    fetchData(dataUrl)

    const cleanUp = () => {
      isMounted = false
      source.cancel()
    }

    return cleanUp
  }, [dataUrl])

  return { data, fetchError, isLoading }
}


const useAxiosPost = (url:string,headersObject?:headersObject) => {
    const [response, setResponse] = useState<AxiosResponse<any, any> | null>(null);
    const standardHeader = {'Content-Type': 'application/json'}

      if(headersObject){
        Object.assign(standardHeader,headersObject)
      }
    
      const postAxios = async (
        postData: string
      ) => {  
        try {
          const response = await axios.post(
            `http://localhost:8888/${url}`,
            postData,
            {
                headers: standardHeader
            }
          );
          setResponse(response);
              
        } catch (error:any) {
          if (axios.isCancel(error)) {
            console.log("Request cancelled");
          } else {
            console.error(error);
          }
          return error;
        }
      };
    
      return {response, postAxios};
}

export  {useAxiosFetch, useAxiosPost}