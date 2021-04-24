import * as tinycolor from 'tinycolor2';

export interface ColorGenerate {
  name: string;
  hex: string;
  darkContrast: boolean;
}

export interface VariantPalette {
  default?: string;
  _50?: string;
  _100?: string;
  _200?: string;
  _300?: string;
  _400?: string;
  _500?: string;
  _600?: string;
  _700?: string;
  _800?: string;
  _900?: string;
  A100?: string;
  A200?: string;
  A400?: string;
  A700?: string;
  contrast?: {
    default?: string;
    _50?: string;
    _100?: string;
    _200?: string;
    _300?: string;
    _400?: string;
    _500?: string;
    _600?: string;
    _700?: string;
    _800?: string;
    _900?: string;
    A100?: string;
    A200?: string;
    A400?: string;
    A700?: string;
  };
}

export class Color {
  static computeColors(hex: string): ColorGenerate[] {
    return [
      this.getColorObject(tinycolor(hex).lighten(52), '50'),
      this.getColorObject(tinycolor(hex).lighten(37), '100'),
      this.getColorObject(tinycolor(hex).lighten(26), '200'),
      this.getColorObject(tinycolor(hex).lighten(12), '300'),
      this.getColorObject(tinycolor(hex).lighten(6), '400'),
      this.getColorObject(tinycolor(hex), '500'),
      this.getColorObject(tinycolor(hex).darken(6), '600'),
      this.getColorObject(tinycolor(hex).darken(12), '700'),
      this.getColorObject(tinycolor(hex).darken(18), '800'),
      this.getColorObject(tinycolor(hex).darken(24), '900'),
      this.getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      this.getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      this.getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      this.getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700'),
    ];
  }

  static getColorObject(value, name): ColorGenerate {
    const c = tinycolor(value);
    return {
      name: name,
      hex: c.toHexString(),
      darkContrast: c.isLight(),
    };
  }
}
