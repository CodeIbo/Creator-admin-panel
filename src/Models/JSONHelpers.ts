import { ArticlesAttributes } from './Api/article.model';
import { BlogAttributes } from './Api/blog.model';
import { CustomPageAttributes } from './Api/customPage.model';
import { EpisodeAttributes } from './Api/episode.model';
import { MenuAttributes } from './Api/menu.model';
import { PodcastAttributes } from './Api/podcast.model';
import { UserAttributes } from './Api/users.model';

// formHelpers

export interface FormOptions {
  type?:
    | 'input'
    | 'input-date'
    | 'input-html'
    | 'input-array'
    | 'dropdown'
    | string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  key?: true | boolean;
  dataType?: string;
  regex?: 'email' | 'link' | 'password' | string;
  dropdown_link?: string;
  value_type?: 'number' | string;
}
export type BlogFormFields = Partial<Record<keyof BlogAttributes, FormOptions>>;
export type ArticleFormFields = Partial<
  Record<keyof ArticlesAttributes, FormOptions>
>;
export type PodcastFormFields = Partial<
  Record<keyof PodcastAttributes, FormOptions>
>;
export type EpisodeFormFields = Partial<
  Record<keyof EpisodeAttributes, FormOptions>
>;
export type UserFormFields = Partial<Record<keyof UserAttributes, FormOptions>>;
export type PagesFormFields = Partial<
  Record<keyof CustomPageAttributes, FormOptions>
>;
export type MenuFormFields = Partial<Record<keyof MenuAttributes, FormOptions>>;

export type FormHelper = {
  blog: BlogFormFields;
  article: ArticleFormFields;
  podcast: PodcastFormFields;
  episode: EpisodeFormFields;
  users: UserFormFields;
  pages: PagesFormFields;
  menu: MenuFormFields;
};

// TableHelpers

export interface TableOptions {
  header?: string;
  key?: string;
  api_url?: string;
  dashboard_url?: string;
}

export type ExtendedAtributes = 'action' | 'children';

export type BlogTableFields = Partial<
  Record<keyof BlogAttributes | ExtendedAtributes, TableOptions>
>;
export type ArticleTableFields = Partial<
  Record<keyof ArticlesAttributes | ExtendedAtributes, TableOptions>
>;
export type PodcastTableFields = Partial<
  Record<keyof PodcastAttributes | ExtendedAtributes, TableOptions>
>;
export type EpisodeTableFields = Partial<
  Record<keyof EpisodeAttributes | ExtendedAtributes, TableOptions>
>;
export type UserTableFields = Partial<
  Record<keyof UserAttributes | ExtendedAtributes, TableOptions>
>;
export type PagesTableFields = Partial<
  Record<keyof CustomPageAttributes | ExtendedAtributes, TableOptions>
>;

export type AllTableKeys =
  | keyof BlogTableFields
  | keyof ArticleTableFields
  | keyof PodcastTableFields
  | keyof EpisodeTableFields
  | keyof UserTableFields
  | keyof PagesTableFields;

export type TableHelper = {
  blog: BlogTableFields;
  article: ArticleTableFields;
  podcast: PodcastTableFields;
  episode: EpisodeTableFields;
  users: UserTableFields;
  pages: PagesTableFields;
};
