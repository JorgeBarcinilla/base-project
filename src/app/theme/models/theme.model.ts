import { Color, VariantPalette } from 'src/app/utils/color/color.util';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface configElementBase {
  color: string;
  palette: VariantPalette;
}

export class BaseTheme {
  public bg: configElementBase = {
    color: '#eeeeee',
    palette: {},
  };
  public text: configElementBase = {
    color: '#121212',
    palette: {},
  };

  constructor(bgColor: string, textColor: string) {
    this.bg.color = bgColor;
    this.text.color = textColor;
  }
}

export class ColorType {
  public primary?: string = '#3367d6';
  public secondary?: string = '#4bbb00';
  public success?: string = '#17a938';
  public info?: string = '#3b99ff';
  public warning?: string = '#ffbf00';
  public danger?: string = '#ef4444';

  constructor(args?: ColorType) {
    for (const key in args) {
      if (Object.prototype.hasOwnProperty.call(args, key)) {
        this[key] = args[key];
      }
    }
  }
}

export class Palette {
  public primary?: VariantPalette = { contrast: {} };
  public secondary?: VariantPalette = { contrast: {} };
  public success?: VariantPalette = { contrast: {} };
  public info?: VariantPalette = { contrast: {} };
  public warning?: VariantPalette = { contrast: {} };
  public danger?: VariantPalette = { contrast: {} };

  constructor(args?: Palette) {
    for (const key in args) {
      if (Object.prototype.hasOwnProperty.call(args, key)) {
        this[key] = args[key];
      }
    }
  }
}

export class ColorTheme {
  public base: BaseTheme;
  public color_default: ColorType = {};
  public contrast_color_default: ColorType = {};
  public palette?: Palette = new Palette();

  constructor(bgColor: string, textColor: string) {
    this.base = new BaseTheme(bgColor, textColor);
  }
}

export class ThemeModeConfig {
  light: ColorTheme = new ColorTheme('#eeeeee', '#121212');
  dark: ColorTheme = new ColorTheme('#121212', '#eeeeeee');

  constructor(args?: ThemeModeConfig) {
    for (const key in args) {
      if (Object.prototype.hasOwnProperty.call(args, key)) {
        this[key] = args[key];
      }
    }
  }
}

export class Theme {
  private currentMode: ThemeMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
    ? ThemeMode.DARK
    : ThemeMode.LIGHT;
  private oldMode: ThemeMode;
  private modes: ThemeModeConfig = new ThemeModeConfig();
  private color: ColorType = new ColorType();

  constructor(color?: ColorType) {
    if (color) {
      this.color = color;
    }
    this.generateBaseThemeModes();
    this.generateDefaultColors();
  }

  public get getCurrentModeName(): ThemeMode {
    return this.currentMode;
  }

  public get getCurrentMode(): ColorTheme {
    return this.modes[this.currentMode];
  }

  public get getOldModeName(): ThemeMode {
    return this.oldMode;
  }

  public get getOldMode(): ColorTheme {
    return this.modes[this.oldMode];
  }

  public get getModes(): ThemeModeConfig {
    return this.modes;
  }

  public get getColor(): ColorType {
    return this.color;
  }

  public changeThemeMode(themeMode: ThemeMode) {
    this.oldMode = this.currentMode;
    this.currentMode = themeMode;
  }

  private generateBaseThemeModes() {
    for (const key in this.modes) {
      if (Object.prototype.hasOwnProperty.call(this.modes, key)) {
        const currentBaseThemeMode = this.modes[key].base;
        //Se agregan a la variable tema los colores por defecto de fondo y letras generales deacuerdo al tema
        currentBaseThemeMode.bg.palette.default = currentBaseThemeMode.bg.color;
        currentBaseThemeMode.text.palette.default =
          currentBaseThemeMode.text.color;

        for (const key in currentBaseThemeMode) {
          if (Object.prototype.hasOwnProperty.call(currentBaseThemeMode, key)) {
            const colorPalette = currentBaseThemeMode[key].color;
            for (const color of Color.computeColors(colorPalette)) {
              //Se agregan a la variable tema todas las variantes de colores bg y text generadas
              currentBaseThemeMode[key].palette['_' + color.name] = color.hex;
            }
          }
        }
      }
    }
  }

  private generateDefaultColors() {
    for (const key in this.color) {
      if (Object.prototype.hasOwnProperty.call(this.color, key)) {
        for (const color of Color.computeColors(this.color[key])) {
          //Se revisa cada color de la paleta para elegir el mas adecuado en base a la accesibilidad
          for (const mode in this.modes) {
            if (Object.prototype.hasOwnProperty.call(this.modes, mode)) {
              switch (mode) {
                case ThemeMode.DARK:
                  if (
                    Number.isInteger(Number(color.name)) &&
                    color.darkContrast
                  ) {
                    this.modes[mode].color_default[key] = color.hex;
                    this.modes[mode].contrast_color_default[
                      key
                    ] = color.darkContrast ? '#000000de' : 'white';
                    this.generatePalette(this.modes[mode], key, color.hex);
                  }
                  break;
                case ThemeMode.LIGHT:
                  if (
                    !this.modes[mode].color_default[key] &&
                    Number.isInteger(Number(color.name)) &&
                    !color.darkContrast
                  ) {
                    this.modes[mode].color_default[key] = color.hex;
                    this.modes[mode].contrast_color_default[
                      key
                    ] = color.darkContrast ? '#000000de' : 'white';
                    this.generatePalette(this.modes[mode], key, color.hex);
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
  }

  private generatePalette(mode: ColorTheme, key: string, defaultColor: string) {
    for (const color of Color.computeColors(defaultColor)) {
      //Se agregan a la variable tema todos los colores generados
      mode.palette[key]['_' + color.name] = color.hex;
      mode.palette[key].contrast['_' + color.name] = color.darkContrast
        ? '#000000de'
        : 'white';
    }
  }
}
