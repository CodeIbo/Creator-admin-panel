import { PageAttributes } from './page.model';

export interface CustomPageAttributes extends PageAttributes {
  id: string;
  page_content: string;
  page_type: string;
}
