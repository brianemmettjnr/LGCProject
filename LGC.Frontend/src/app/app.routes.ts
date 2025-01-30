import { Routes } from '@angular/router';
import { PostListComponent } from './components/posts/post-list/post-list.component';
export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts', component: PostListComponent },
];
