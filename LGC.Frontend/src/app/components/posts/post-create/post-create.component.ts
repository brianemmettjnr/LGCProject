import {
  Component,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PostDto } from '../../../models/post';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { merge } from 'rxjs';
@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="container">
      <form style="display: flex; flex-direction: column; gap: 5px;">
        <mat-form-field style="flex: 1;">
          @if (title.invalid || text.invalid) {
          <mat-error>{{ errorMessage() }}</mat-error>
          }
          <mat-label>Title</mat-label>
          <input matInput [formControl]="title" />
        </mat-form-field>
        <mat-form-field style="flex: 1;">
          <mat-label>Text</mat-label>
          <textarea [formControl]="text" matInput></textarea>
          @if (title.invalid || text.invalid) {
          <mat-error>{{ errorMessage() }}</mat-error>
          }
        </mat-form-field>
        <button
          mat-fab
          (click)="submitPost()"
          [disabled]="text.invalid || title.invalid"
        >
          <mat-icon>send</mat-icon>
        </button>
      </form>
    </div>
  `,
})
export class PostCreateComponent {
  constructor(private postService: PostService) {
    merge(
      this.text.statusChanges,
      this.text.valueChanges,
      this.title.statusChanges,
      this.title.valueChanges
    )
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  private _snackBar = inject(MatSnackBar);
  errorMessage = signal('');

  text = new FormControl('', {
    validators: [Validators.required, Validators.maxLength(100)],
  });
  title = new FormControl('', {
    validators: [Validators.required, Validators.maxLength(20)],
  });
  updateErrorMessage() {
    if (this.text.hasError('required') || this.title.hasError('required')) {
      this.errorMessage.set('Both fields are required');
    } else if (this.text.hasError('maxlength')) {
      this.errorMessage.set('Text cannot exceed 100 characters');
    } else if (this.title.hasError('maxlength')) {
      this.errorMessage.set('Title cannot exceed 20 characters');
    } else {
      this.errorMessage.set('');
    }
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
        this._snackBar.open('Post Created Sucessfully! 🎉');
        window.location.href = '/posts/' + post.id;
      },
      (error) => {
        this._snackBar.open(error);
      }
    );
  }
}
