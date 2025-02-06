import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post';
import { CommentDto } from '../../../models/comment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  changeDetection: ChangeDetectionStrategy.Default,
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
    CommonModule,
  ],
  template: `@if(post) {<mat-card>
      <mat-card-header>
        <mat-card-title
          style="display: flex; flex-direction: row; justify-content: space-between;"
          ><h2>{{ post.title }}</h2></mat-card-title
        >
      </mat-card-header>
      <mat-card-content>
        <h3>{{ post.text }}</h3>
        <div
          style="display: flex; flex-direction: column; gap: 5px; margin-top: 10px; margin-bottom: 10px; max-height: 200px; overflow-y: auto; padding: 2px 0px 2px 0px"
        >
          @for(comment of post.comments; track comment.id) {
          <mat-card>
            <mat-card-content
              style="align-items: center;
                    display: flex
                ;"
              ><mat-icon>person</mat-icon>
              <div style="display: flex; align-items: center; gap: 5px;">
                {{ '@' }}
                {{ post.createdAt | date : 'dd/MM/yyyy' }}
              </div>
              : {{ comment.text }}
            </mat-card-content></mat-card
          >
          }
        </div>
        <form style="display: flex; flex-direction: row; gap: 5px;">
          <mat-form-field style="flex: 1;">
            <mat-label>Comment?</mat-label>
            <input [formControl]="comment" matInput />
            @if (comment.invalid) {
            <mat-error>{{ errorMessage() }}</mat-error>
            }
            <!-- @if (text.invalid) {
            <mat-error>{{ errorMessage() }}</mat-error>
            } -->
          </mat-form-field>

          <button
            [disabled]="comment.invalid"
            mat-fab
            (click)="submitComment(post.id)"
          >
            <mat-icon>send</mat-icon>
          </button>
        </form>
      </mat-card-content>
    </mat-card>
    } @else {
    <div
      style="display: flex; justify-content: center; align-items: center; height: 50vh;"
    >
      <mat-spinner />
    </div>
    }`,
})
export class PostComponent implements OnInit {
  postId!: string;
  post?: Post;
  comment = new FormControl('', {
    validators: [Validators.required, Validators.maxLength(100)],
  });
  private _snackBar = inject(MatSnackBar);
  errorMessage = signal('');

  constructor(private route: ActivatedRoute, private postService: PostService) {
    merge(this.comment.statusChanges, this.comment.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.getPostDetails();
  }

  updateErrorMessage() {
    if (this.comment.hasError('required')) {
      this.errorMessage.set('Cannot submit an empty comment');
    } else if (this.comment.hasError('maxlength')) {
      this.errorMessage.set('Comment cannot exceed 100 characters');
    } else {
      this.errorMessage.set('');
    }
  }

  getPostDetails() {
    this.postService
      .getPostById(this.postId as unknown as number)
      .subscribe((data) => {
        this.post = data;
      });
  }

  submitComment(postId: number) {
    const comment: CommentDto = {
      text: this.comment.value ?? '',
      postId: postId,
    };
    this.postService.createComment(comment).subscribe(
      (comment) => {
        this.comment.setValue('');
        this.post?.comments.push(comment);
      },
      (error) => {
        this._snackBar.open(error, '', {
          duration: 5000,
        });
      }
    );
  }
}
