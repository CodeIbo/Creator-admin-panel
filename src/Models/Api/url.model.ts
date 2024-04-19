import { Meta } from './meta.model';

export interface UrlAttributes extends Meta {
  id: string;
  url: string;
  name: string;
  created_at: string;
}
