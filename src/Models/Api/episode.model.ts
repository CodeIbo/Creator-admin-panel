import { Meta } from './meta.model';

export interface EpisodeAttributes extends Meta {
  id: string;
  episode_title: string;
  episode_content: string;
  announcement_url: string;
  photo_url: string;
  url: string;
  date: Date;
  author: string;
  episode_tags: string[];
  podcast_key: string;
}
