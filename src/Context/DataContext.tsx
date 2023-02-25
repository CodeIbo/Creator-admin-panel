import axios, { AxiosResponse } from "axios"
import { createContext, useState } from "react"
import { childrenInterface } from "../Interfaces/childrenInterface"
import { dataContextInterface } from "../Interfaces/dataContextInterface"




export const DataContext= createContext<dataContextInterface>({
    requestApi: async () => null,
  });
  

export const DataContextProvider = ({children}:childrenInterface) =>{

    const requestApi = async (url:string):Promise<AxiosResponse<any> | null> => {
        try {
            const res = await axios.get(`http://localhost:8888/${url}`);
            if(res){
                return res       
            }
          } catch (err) {
            return null
          }
          return null
    } 



    const value: dataContextInterface = {
        requestApi : requestApi
    }
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
} 