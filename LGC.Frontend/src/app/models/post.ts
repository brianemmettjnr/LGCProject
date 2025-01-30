import { User } from './user';
import { Comment } from './comment';

export interface Post {
  id: number;
  title: string;
  text: string;
  createdDate: Date;
  comments: Comment[];
  user: User;
}

export interface PostDto {
  title: string;
  text: string;
  userId: number;
}
