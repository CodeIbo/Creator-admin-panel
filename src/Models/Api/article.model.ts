import { Meta } from './meta.model';

export interface ArticlesAttributes extends Meta {
  id: string;
  url: string;
  blog_key: string;
  author: string;
  article_title: string;
  article_content: string;
  lead: string;
  post_tags: string[];
  photo_url: string;
  date: Date;
}
