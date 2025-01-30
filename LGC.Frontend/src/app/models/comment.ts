import { User } from './user';

export interface Comment {
  id: number;
  text: string;
  postId: number;
  createdDate: Date;
  user: User;
}

export interface CommentDto {
  text: string;
  postId: number;
  userId: number;
}
