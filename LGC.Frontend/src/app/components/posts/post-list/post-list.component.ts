import { Component, inject, OnInit, signal } from '@angular/core';
import { Post, PostDto } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentDto } from '../../../models/comment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-post-list',
  template: `
    <div class="container">
      <mat-expansion-panel hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title> Click Here to Post</mat-panel-title>
        </mat-expansion-panel-header>
        <form style="display: flex; flex-direction: row; gap: 5px;">
          <mat-form-field style="flex: 1;">
            <mat-label>Title</mat-label>
            <input matInput [formControl]="title" />
          </mat-form-field>
          <mat-form-field style="flex: 1;">
            <mat-label>Text</mat-label>
            <textarea
              [formControl]="text"
              matInput
              placeholder="Ex. 100 Main St"
            ></textarea>
          </mat-form-field>
          <button mat-fab (click)="submitPost()">
            <mat-icon>send</mat-icon>
          </button>
        </form>
      </mat-expansion-panel>
    </div>
    <div class="container">
      @for(post of posts; track post.title) {
      <mat-card class="post-card">
        <mat-card-header>
          <mat-card-title
            style="display: flex; flex-direction: row; justify-content: space-between;"
            ><div>{{ post.title }}</div></mat-card-title
          >
        </mat-card-header>
        <mat-card-content>
          {{ post.text }}
          <div
            style="display: flex; flex-direction: column; gap: 5px; margin-top: 10px; margin-bottom: 10px; max-height: 200px; overflow-y: auto; padding: 1px 0px 1px 0px"
          >
            @for(comment of post.comments; track comment) {
            <mat-card class="post-card"> </mat-card>
            }
          </div>
          <form style="display: flex; flex-direction: row; gap: 5px;">
            <mat-form-field style="flex: 1;">
              <mat-label>Comment?</mat-label>
              <input [formControl]="comment" matInput />
            </mat-form-field>

            <button mat-fab (click)="submitComment(post.id)">
              <mat-icon>send</mat-icon>
            </button>
          </form>
        </mat-card-content>
      </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        display: grid;
        gap: 20px;
      }
    `,
  ],
  imports: [
    RouterModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PostListComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  posts: Post[] = [];
  text = new FormControl('');
  title = new FormControl('');
  comment = new FormControl('');
  protected readonly value = signal('');
  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  submitPost() {
    const newPost: PostDto = {
      title: this.title.value ?? '',
      text: this.text.value ?? '',
    };
    this.postService.createPost(newPost).subscribe(
      (post) => {
        this.title.setValue('');
        this.text.setValue('');
        this.posts.push(post);
      },
      (error) => {
        this._snackBar.open(error);
      }
    );
  }

  submitComment(postId: number) {
    const comment: CommentDto = {
      text: this.comment.value ?? '',
      postId: postId,
    };
    this.postService.createComment(comment).subscribe(
      (comment) => {
        this.comment.setValue('');
        this.posts
          .filter((post) => post.id === postId)[0]
          .comments.push(comment);
      },
      (error) => {
        this._snackBar.open(error);
      }
    );
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
