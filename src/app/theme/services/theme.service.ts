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
    this.setColorsCSS(this.currentTheme);
    this.setColorsDefaultCSS(this.currentTheme);
    this.setBaseColorCSS(this.currentTheme);
  }

  getcurrentTheme(): Theme {
    return this.currentTheme;
  }

  public toggleTheme(theme: Theme) {
    console.log(theme);
    theme.changeThemeMode(this.currentTheme.getCurrentMode);
    this.currentTheme = theme;
    this.setColorsCSS(this.currentTheme);
    this.setColorsDefaultCSS(this.currentTheme);
  }

  public toggleThemeMode(theme: ThemeMode): Promise<Event> {
    this.currentTheme.changeThemeMode(theme);
    this.setBaseColorCSS(this.currentTheme);
    this.setColorsDefaultCSS(this.currentTheme);
    return this.loadTheme(false);
  }

  private setBaseColorCSS(theme: Theme) {
    const baseThemeMode = theme.getModes[theme.getCurrentMode].base;
    for (const key in baseThemeMode) {
      if (Object.prototype.hasOwnProperty.call(baseThemeMode, key)) {
        const elementPalette = baseThemeMode[key].palette;
        this.setCSSVariables(key, elementPalette);
      }
    }
  }

  setColorsDefaultCSS(theme: Theme) {
    for (const key in theme.getModes[theme.getCurrentMode].color_default) {
      if (
        Object.prototype.hasOwnProperty.call(
          theme.getModes[theme.getCurrentMode].color_default,
          key
        )
      ) {
        document.documentElement.style.setProperty(
          '--theme-' + [key] + '-contrast-default',
          theme.getModes[theme.getCurrentMode].contrast_color_default[key]
        );
        document.documentElement.style.setProperty(
          '--theme-' + [key] + '-default',
          theme.getModes[theme.getCurrentMode].color_default[key]
        );
      }
    }
  }

  private setColorsCSS(theme: Theme) {
    for (const key in theme.getPalette) {
      if (Object.prototype.hasOwnProperty.call(theme.getPalette, key)) {
        const typeColorPalette = theme.getPalette[key];
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
        this.currentTheme.getCurrentMode == 'dark'
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
      document.documentElement.classList.add(this.currentTheme.getCurrentMode);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(
        this.currentTheme.getCurrentMode + '.css',
        this.currentTheme.getCurrentMode
      ).then(
        (e) => {
          if (!firstLoad) {
            document.documentElement.classList.add(
              this.currentTheme.getCurrentMode
            );
          }
          this.removeUnusedTheme(this.currentTheme.getOldMode);
          resolve(e);
        },
        (e) => reject(e)
      );
    });
  }

  /*private generatePalette() {
    for (const key in this.theme.color) {
      if (Object.prototype.hasOwnProperty.call(this.theme.color, key)) {
        const colorPalette = this.theme.color[key];
        for (const color of this.computeColors(colorPalette)) {
          //Se inserta la variable y color  al style de la aplicacion
          const key1 = `--theme-${key}-${color.name}`;
          const value1 = color.hex;
          document.documentElement.style.setProperty(key1, value1);

          //Se inserta la variable y contraste del color anterior al style de la aplicacion
          const key2 = `--theme-${key}-contrast-${color.name}`;
          const value2 = color.darkContrast ? '#000000de' : 'white';
          document.documentElement.style.setProperty(key2, value2);

          //Se agregan a la variable tema todos los colores generados
          this.theme.palette[key]['_' + color.name] = value1;
          this.theme.palette[key].contrast['_' + color.name] = value2;

          //Se revisa cada color de la paleta para elegir el mas adecuado en base a la accesibilidad
          for (const mode in ThemeMode) {
            if (Object.prototype.hasOwnProperty.call(ThemeMode, mode)) {
              const themeMode = ThemeMode[mode];
              switch (themeMode) {
                case ThemeMode.dark:
                  if (
                    Number.isInteger(Number(color.name)) &&
                    color.darkContrast
                  ) {
                    this.theme.dark.color_default[key] = value1;
                    this.theme.dark.contrast_color_default[key] = value2;
                  }
                  break;
                case ThemeMode.light:
                  if (
                    !this.theme.light.color_default[key] &&
                    Number.isInteger(Number(color.name)) &&
                    !color.darkContrast
                  ) {
                    this.theme.light.color_default[key] = value1;
                    this.theme.light.contrast_color_default[key] = value2;
                  }
                  break;

                default:
                  break;
              }
            }
          }
        }
      }
    }
    this.setColorsDefault();
  }*/

  /*private setColorsDefault() {
    switch (this.currentThemeMode) {
      case ThemeMode.dark:
        for (const key in this.theme.dark.color_default) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.theme.dark.color_default,
              key
            )
          ) {
            const color = this.theme.dark.color_default[key];
            const contrast = this.theme.dark.contrast_color_default[key];

            //Se asigna a la paleta de colores sus colores por defecto segun el tema
            this.theme.palette[key].default = color;
            this.theme.palette[key].contrast.default = contrast;

            //Se agrega el valor de color por defacto adecuado en base a la accesibilidad al style de la pagina
            document.documentElement.style.setProperty(
              '--theme-' + [key] + '-default',
              color
            );
            document.documentElement.style.setProperty(
              '--theme-' + [key] + '-contrast-default',
              contrast
            );
          }
        }
        break;
      case ThemeMode.light:
        for (const key in this.theme.light.color_default) {
          if (
            Object.prototype.hasOwnProperty.call(
              this.theme.light.color_default,
              key
            )
          ) {
            const color = this.theme.light.color_default[key];
            const contrast = this.theme.light.contrast_color_default[key];
            this.theme.palette[key].default = color;
            this.theme.palette[key].contrast.default = contrast;

            //Se agrega el valor de color por defacto adecuado en base a la accesibilidad al style de la pagina
            document.documentElement.style.setProperty(
              '--theme-' + [key] + '-default',
              color
            );
            document.documentElement.style.setProperty(
              '--theme-' + [key] + '-contrast-default',
              contrast
            );
          }
        }
        break;

      default:
        break;
    }
  }*/
}
