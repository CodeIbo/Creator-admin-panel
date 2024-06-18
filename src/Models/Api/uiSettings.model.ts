import { TimeStamp } from './timeStamp.model';

export interface UISettingsAttributes extends TimeStamp {
  readonly id: string;
  element_key: string;
  element_value: string;
  element_type: string;
  element_css: null;
}
