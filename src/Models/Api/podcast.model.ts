import { PageAttributes } from './page.model';

export interface PodcastAttributes extends PageAttributes {
  id: string;
  podcast_title: string;
  podcast_key: string;
}
