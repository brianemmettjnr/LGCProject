import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Add dark-mode class to body
document.body.classList.add('dark-mode');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
