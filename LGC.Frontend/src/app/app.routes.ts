import { Routes } from '@angular/router';
import { PostListComponent } from './components/posts/post-list/post-list.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostComponent } from './components/posts/post/post.component';
export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'posts/create', component: PostCreateComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostComponent },
];
