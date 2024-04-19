import { AccessToken } from '../../Models/AxiosResponse';

export default function isAccessToken(data: any): data is AccessToken {
  return data.accessToken !== undefined;
}
