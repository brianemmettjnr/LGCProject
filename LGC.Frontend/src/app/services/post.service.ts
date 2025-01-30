import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post, PostDto } from '../models/post';
import { CommentDto, Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/api/Post');
  }

  createPost(post: PostDto): Observable<Post> {
    return this.http.post<Post>('http://localhost:8080/api/Post', post);
  }

  createComment(comment: CommentDto): Observable<Comment> {
    return this.http.post<Comment>(
      'http://localhost:8080/api/Comment',
      comment
    );
  }
  constructor(private http: HttpClient) {}
}
