export interface Comment {
  id: number;
  text: string;
  postId: number;
  createdDate: Date;
}

export interface CommentDto {
  text: string;
  postId: number;
}
