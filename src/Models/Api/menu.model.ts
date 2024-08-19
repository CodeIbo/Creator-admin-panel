export interface MenuAttributes {
  id: string;
  url_id: string;
  menu_order: number;
  label: string;
  parent_id: string | null;
  scroll_target: string | null;
  children: Array<MenuAttributes>;
  created_at: string;
  url: string;
  page_category: string;
}
