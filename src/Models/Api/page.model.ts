import { Meta } from './meta.model';

export type PageCategory = 'page' | 'blog' | 'article' | 'podcast' | 'episode';

export interface PageAttributes extends Meta {
  id: string;
  url: string;
  page_category: PageCategory;
  name: string;
  created_at: string;
}
