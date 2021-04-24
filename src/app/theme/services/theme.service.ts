import { Injectable } from '@angular/core';
import { VariantPalette } from 'src/app/utils/color/color.util';
import { Theme, ThemeMode } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme: Theme;

  constructor() {
    //Se genera el tema segun los colores seleccionados
    this.currentTheme = new Theme();
    this.setBaseColorCSS(this.currentTheme);
    this.setColorsDefaultCSS(this.currentTheme);
  }

  getcurrentTheme(): Theme {
    return this.currentTheme;
  }

  public toggleTheme(theme: Theme) {
    theme.changeThemeMode(this.currentTheme.getCurrentModeName);
    this.currentTheme = theme;
    this.setColorsDefaultCSS(this.currentTheme);
  }

  public toggleThemeMode(theme: ThemeMode): Promise<Event> {
    this.currentTheme.changeThemeMode(theme);
    this.setBaseColorCSS(this.currentTheme);
    this.setColorsDefaultCSS(this.currentTheme);
    return this.loadTheme(false);
  }

  private setBaseColorCSS(theme: Theme) {
    const baseThemeMode = theme.getModes[theme.getCurrentModeName].base;
    for (const key in baseThemeMode) {
      if (Object.prototype.hasOwnProperty.call(baseThemeMode, key)) {
        const elementPalette = baseThemeMode[key].palette;
        this.setCSSVariables(key, elementPalette);
      }
    }
  }

  setColorsDefaultCSS(theme: Theme) {
    for (const key in theme.getModes[theme.getCurrentModeName].color_default) {
      if (
        Object.prototype.hasOwnProperty.call(
          theme.getModes[theme.getCurrentModeName].color_default,
          key
        )
      ) {
        document.documentElement.style.setProperty(
          '--theme-' + [key] + '-contrast-default',
          theme.getModes[theme.getCurrentModeName].contrast_color_default[key]
        );
        document.documentElement.style.setProperty(
          '--theme-' + [key] + '-default',
          theme.getModes[theme.getCurrentModeName].color_default[key]
        );
      }
    }
    this.setColorsCSS(theme);
  }

  private setColorsCSS(theme: Theme) {
    for (const key in theme.getCurrentMode.palette) {
      if (
        Object.prototype.hasOwnProperty.call(theme.getCurrentMode.palette, key)
      ) {
        const typeColorPalette = theme.getCurrentMode.palette[key];
        this.setCSSVariables(key, typeColorPalette);
      }
    }
  }

  private setCSSVariables(key: string, palette: VariantPalette) {
    for (const keyPalette in palette) {
      if (Object.prototype.hasOwnProperty.call(palette, keyPalette)) {
        if (keyPalette == 'contrast') {
          for (const keyContrast in palette.contrast) {
            if (
              Object.prototype.hasOwnProperty.call(
                palette.contrast,
                keyContrast
              )
            ) {
              document.documentElement.style.setProperty(
                '--theme-' +
                  [key] +
                  '-contrast-' +
                  keyContrast.replace('_', ''),
                palette.contrast[keyContrast]
              );
            }
          }
        } else {
          document.documentElement.style.setProperty(
            '--theme-' + [key] + '-' + keyPalette.replace('_', ''),
            palette[keyPalette]
          );
        }
      }
    }
  }

  private removeUnusedTheme(theme: ThemeMode): void {
    document.documentElement.classList.remove(theme);
    const removedThemeStyle = document.getElementById(theme);
    if (removedThemeStyle) {
      document.head.removeChild(removedThemeStyle);
    }
  }

  //Se carga el tema de ant-design correspondiente al modo de tema seleccionado
  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const statusbarAndroid = <HTMLMetaElement>(
        document.querySelector("meta[name='theme-color']")
      );
      statusbarAndroid.content =
        this.currentTheme.getCurrentModeName == 'dark'
          ? this.currentTheme.getModes.dark.base.bg.color
          : this.currentTheme.getModes.light.color_default.primary;
      document.head.append(statusbarAndroid);
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      document.head.append(style);
    });
  }

  public loadTheme(firstLoad = true): Promise<Event> {
    if (firstLoad) {
      document.documentElement.classList.add(
        this.currentTheme.getCurrentModeName
      );
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(
        this.currentTheme.getCurrentModeName + '.css',
        this.currentTheme.getCurrentModeName
      ).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(
              this.currentTheme.getCurrentModeName
            );
          }
          this.removeUnusedTheme(this.currentTheme.getOldModeName);
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }
}
