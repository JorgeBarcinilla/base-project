import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Workbox } from 'workbox-window';

if (environment.production) {
  enableProdMode();
}

function loadServiceWorker() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');
    const showSkipWaitingPrompt = () => {
      if (window.confirm('Hay una nueva version, desea aplicarla?')) {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });
        wb.messageSkipWaiting();
      }
    };
    wb.addEventListener('waiting', showSkipWaitingPrompt);
    wb.register();
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then((_) => loadServiceWorker())
  .catch((err) => console.error(err));
