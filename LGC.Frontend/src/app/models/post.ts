import { Comment } from './comment';

export interface Post {
  id: number;
  title: string;
  text: string;
  createdAt: Date;
  comments: Comment[];
}

export interface PostDto {
  title: string;
  text: string;
}
