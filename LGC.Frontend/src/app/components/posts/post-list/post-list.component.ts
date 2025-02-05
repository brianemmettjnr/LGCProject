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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-post-list',
  template: `
    @if(posts) { @if (posts.length > 0) {
    <div class="container">
      @for(post of posts; track post.id) {
      <mat-card
        class="post-card"
        [routerLink]="['/posts', post.id]"
        style="cursor: pointer;"
      >
        <mat-card-header>
          <mat-card-title
            style="display: flex; flex-direction: row; justify-content: space-between;"
            ><div
              style="display: flex; align-items: center; gap: 5px; justify-content: space-between;"
            >
              <div style="width:65vw;">{{ post.title }}</div>
              <mat-icon>comment</mat-icon>{{ post.comments.length }}
            </div></mat-card-title
          >
        </mat-card-header>
        <mat-card-content></mat-card-content>
      </mat-card>
      }
    </div>
    } @else {
    <div
      style="display: flex; justify-content: center; align-items: center; height: 50vh;"
    >
      No Posts To Display
    </div>
    } } @else {
    <div
      style="display: flex; justify-content: center; align-items: center; height: 50vh;"
    >
      <mat-spinner />
    </div>
    }
  `,
  styles: [
    `
      .container {
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
    MatProgressSpinnerModule,
  ],
})
export class PostListComponent implements OnInit {
  posts?: Post[] = undefined;
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

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
