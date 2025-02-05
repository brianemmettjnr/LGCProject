import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-layout-header',
  template: `<nav class="navbar navbar-light" style="margin-bottom: 20px;">
    <div
      style="display: flex; justify-content: space-between; align-items: center;"
    >
      <h1 style="cursor: pointer;" [routerLink]="['/posts']">Forum-It</h1>
      @if (!isCreatePage()) {
      <button [routerLink]="['posts/create']" mat-fab extended>
        Create Post <mat-icon>create</mat-icon></button
      >}
    </div>
  </nav> `,
  imports: [MatIconModule, MatButtonModule, RouterLink],
  standalone: true,
})
export class HeaderComponent {
  public router = inject(Router);

  isCreatePage(): boolean {
    return this.router.url === '/posts/create';
  }
}
