import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './app/environment/environment';
import { AppConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppConfig)
  .catch(err => console.error(err));