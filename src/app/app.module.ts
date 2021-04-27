import { registerLocaleData } from '@angular/common';
import esCo from '@angular/common/locales/es-CO';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeInitializerProvider } from './theme/theme-initializer.provider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(esCo);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatSnackBarModule,
    NzIconModule,
  ],
  providers: [
    ThemeInitializerProvider,
    { provide: Window, useValue: window },
    { provide: Document, useValue: document },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'esCo' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
