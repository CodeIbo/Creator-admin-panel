export interface MenuAttributes {
  id: string;
  url_id: string;
  menu_order: number;
  label: string;
  parent_id: string | null;
  scroll_target: string | null;
  created_at: string;
}
