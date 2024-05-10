import { TimeStamp } from './timeStamp.model';

export interface SocialMediaAttributes extends TimeStamp {
  readonly id: string;
  readonly name: string;
  order: number;
  available: 0 | 1;
  link: string | null;
  title: string | null;
  readonly icon: string;
}
