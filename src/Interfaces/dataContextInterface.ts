import { AxiosResponse } from "axios";

export interface dataContextInterface {
    requestApi: (url: string) => Promise< AxiosResponse<any, any> | null>; 

} 