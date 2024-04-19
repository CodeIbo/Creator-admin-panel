import { AxiosError } from 'axios';
import { ArticlesAttributes } from './Api/article.model';
import { BlogAttributes } from './Api/blog.model';
import { CustomPageAttributes } from './Api/customPage.model';
import { EpisodeAttributes } from './Api/episode.model';
import { PodcastAttributes } from './Api/podcast.model';
import { UserAttributes } from './Api/users.model';
import { MenuAttributes } from './Api/menu.model';
import { UrlAttributes } from './Api/url.model';

export type ApiCallback =
  | ArticlesAttributes
  | BlogAttributes
  | CustomPageAttributes
  | EpisodeAttributes
  | PodcastAttributes
  | UserAttributes
  | MenuAttributes
  | UrlAttributes;

export type ApiUpdate =
  | Partial<ArticlesAttributes>
  | Partial<BlogAttributes>
  | Partial<CustomPageAttributes>
  | Partial<EpisodeAttributes>
  | Partial<PodcastAttributes>
  | Partial<UserAttributes>
  | Partial<MenuAttributes>
  | Partial<UrlAttributes>;

export interface AccessToken {
  accessToken?: string;
}

export interface AxiosResponseUnTypedData {
  data?: ApiCallback[] | ApiCallback | AccessToken;
  httpStatus: string;
  message: string;
  statusCode: number;
  timeStamp: string;
}
export interface AxiosResponseTypedData<T = ApiCallback> {
  data?: T[] | T;
  httpStatus: string;
  message: string;
  statusCode: number;
  timeStamp: string;
}

export type AxiosErrorData = AxiosError<Omit<AxiosResponseUnTypedData, 'data'>>;
