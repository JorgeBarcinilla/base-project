import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import localeEsCo from '@angular/common/locales/es-CO';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeInitializerProvider } from './theme/theme-initializer.provider';

registerLocaleData(es);
registerLocaleData(localeEsCo, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [
    ThemeInitializerProvider,
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}