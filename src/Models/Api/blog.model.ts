import { PageAttributes } from './page.model';

export interface BlogAttributes extends PageAttributes {
  id: string;
  blog_title: string;
  blog_key: string;
}
