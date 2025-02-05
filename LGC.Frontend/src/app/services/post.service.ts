import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post, PostDto } from '../models/post';
import { CommentDto, Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = (window as any).__env?.apiUrl || 'http://localhost:8080/api';
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/Post`);
  }

  createPost(post: PostDto): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/Post`, post);
  }

  createComment(comment: CommentDto): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}/Comment`, comment);
  }
}
