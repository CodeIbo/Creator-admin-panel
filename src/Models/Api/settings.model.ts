import { TimeStamp } from './timeStamp.model';

export interface SettingsAttributes extends TimeStamp {
  readonly id: string;
  company_name: string;
  logo: string;
  logo_alt: string;
  meta_data_title_global: string;
  meta_data_description_global: string;
  keywords_global: string;
  meta_data_suffix_global: string;
  meta_author_global: string;
}
