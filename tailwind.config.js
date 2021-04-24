const { guessProductionMode } = require("@ngneat/tailwind");
process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

const bgPalette = {
  default : {
    50 : 'var(--theme-bg-50)',
    100 : 'var(--theme-bg-100)',
    200 : 'var(--theme-bg-200)',
    300 : 'var(--theme-bg-300)',
    400 : 'var(--theme-bg-400)',
    500 : 'var(--theme-bg-500)',
    600 : 'var(--theme-bg-600)',
    700 : 'var(--theme-bg-700)',
    800 : 'var(--theme-bg-800)',
    900 : 'var(--theme-bg-900)',
    A100 : 'var(--theme-bg-A100)',
    A200 : 'var(--theme-bg-A200)',
    A400 : 'var(--theme-bg-A400)',
    A700 : 'var(--theme-bg-A700)'
  }
}

const textPalette = {
  default : {
    50 : 'var(--theme-text-50)',
    100 : 'var(--theme-text-100)',
    200 : 'var(--theme-text-200)',
    300 : 'var(--theme-text-300)',
    400 : 'var(--theme-text-400)',
    500 : 'var(--theme-text-500)',
    600 : 'var(--theme-text-600)',
    700 : 'var(--theme-text-700)',
    800 : 'var(--theme-text-800)',
    900 : 'var(--theme-text-900)',
    A100 : 'var(--theme-text-A100)',
    A200 : 'var(--theme-text-A200)',
    A400 : 'var(--theme-text-A400)',
    A700 : 'var(--theme-text-A700)'
  }
}

const paletteTheme = {
  primary: {
    default: 'var(--theme-primary-default)',
    50 : 'var(--theme-primary-50)',
    100 : 'var(--theme-primary-100)',
    200 : 'var(--theme-primary-200)',
    300 : 'var(--theme-primary-300)',
    400 : 'var(--theme-primary-400)',
    500 : 'var(--theme-primary-500)',
    600 : 'var(--theme-primary-600)',
    700 : 'var(--theme-primary-700)',
    800 : 'var(--theme-primary-800)',
    900 : 'var(--theme-primary-900)',
    A100 : 'var(--theme-primary-A100)',
    A200 : 'var(--theme-primary-A200)',
    A400 : 'var(--theme-primary-A400)',
    A700 : 'var(--theme-primary-A700)',
    contrast: {
      default: 'var(--theme-primary-contrast-default)',
      50: 'var(--theme-primary-contrast-50)',
      100: 'var(--theme-primary-contrast-100)',
      200: 'var(--theme-primary-contrast-200)',
      300: 'var(--theme-primary-contrast-300)',
      400: 'var(--theme-primary-contrast-400)',
      500: 'var(--theme-primary-contrast-500)',
      600: 'var(--theme-primary-contrast-600)',
      700: 'var(--theme-primary-contrast-700)',
      800: 'var(--theme-primary-contrast-800)',
      900: 'var(--theme-primary-contrast-900)',
      A100: 'var(--theme-primary-contrast-A100)',
      A200: 'var(--theme-primary-contrast-A200)',
      A400: 'var(--theme-primary-contrast-A400)',
      A700: 'var(--theme-primary-contrast-A700)',
    },
  }
  ,
  secondary: {
    default: 'var(--theme-secondary-default)',
    50 : 'var(--theme-secondary-50)',
    100 : 'var(--theme-secondary-100)',
    200 : 'var(--theme-secondary-200)',
    300 : 'var(--theme-secondary-300)',
    400 : 'var(--theme-secondary-400)',
    500 : 'var(--theme-secondary-500)',
    600 : 'var(--theme-secondary-600)',
    700 : 'var(--theme-secondary-700)',
    800 : 'var(--theme-secondary-800)',
    900 : 'var(--theme-secondary-900)',
    A100 : 'var(--theme-secondary-A100)',
    A200 : 'var(--theme-secondary-A200)',
    A400 : 'var(--theme-secondary-A400)',
    A700 : 'var(--theme-secondary-A700)',
    contrast: {
      default: 'var(--theme-secondary-contrast-default)',
      50: 'var(--theme-secondary-contrast-50)',
      100: 'var(--theme-secondary-contrast-100)',
      200: 'var(--theme-secondary-contrast-200)',
      300: 'var(--theme-secondary-contrast-300)',
      400: 'var(--theme-secondary-contrast-400)',
      500: 'var(--theme-secondary-contrast-500)',
      600: 'var(--theme-secondary-contrast-600)',
      700: 'var(--theme-secondary-contrast-700)',
      800: 'var(--theme-secondary-contrast-800)',
      900: 'var(--theme-secondary-contrast-900)',
      A100: 'var(--theme-secondary-contrast-A100)',
      A200: 'var(--theme-secondary-contrast-A200)',
      A400: 'var(--theme-secondary-contrast-A400)',
      A700: 'var(--theme-secondary-contrast-A700)',
    },
  }
  ,
  success: {
    default: 'var(--theme-success-default)',
    50 : 'var(--theme-success-50)',
    100 : 'var(--theme-success-100)',
    200 : 'var(--theme-success-200)',
    300 : 'var(--theme-success-300)',
    400 : 'var(--theme-success-400)',
    500 : 'var(--theme-success-500)',
    600 : 'var(--theme-success-600)',
    700 : 'var(--theme-success-700)',
    800 : 'var(--theme-success-800)',
    900 : 'var(--theme-success-900)',
    A100 : 'var(--theme-success-A100)',
    A200 : 'var(--theme-success-A200)',
    A400 : 'var(--theme-success-A400)',
    A700 : 'var(--theme-success-A700)',
    contrast: {
      default: 'var(--theme-success-contrast-default)',
      50: 'var(--theme-success-contrast-50)',
      100: 'var(--theme-success-contrast-100)',
      200: 'var(--theme-success-contrast-200)',
      300: 'var(--theme-success-contrast-300)',
      400: 'var(--theme-success-contrast-400)',
      500: 'var(--theme-success-contrast-500)',
      600: 'var(--theme-success-contrast-600)',
      700: 'var(--theme-success-contrast-700)',
      800: 'var(--theme-success-contrast-800)',
      900: 'var(--theme-success-contrast-900)',
      A100: 'var(--theme-success-contrast-A100)',
      A200: 'var(--theme-success-contrast-A200)',
      A400: 'var(--theme-success-contrast-A400)',
      A700: 'var(--theme-success-contrast-A700)',
    },
  }
  ,
  info: {
    default: 'var(--theme-info-default)',
    50 : 'var(--theme-info-50)',
    100 : 'var(--theme-info-100)',
    200 : 'var(--theme-info-200)',
    300 : 'var(--theme-info-300)',
    400 : 'var(--theme-info-400)',
    500 : 'var(--theme-info-500)',
    600 : 'var(--theme-info-600)',
    700 : 'var(--theme-info-700)',
    800 : 'var(--theme-info-800)',
    900 : 'var(--theme-info-900)',
    A100 : 'var(--theme-info-A100)',
    A200 : 'var(--theme-info-A200)',
    A400 : 'var(--theme-info-A400)',
    A700 : 'var(--theme-info-A700)',
    contrast: {
      default: 'var(--theme-info-contrast-default)',
      50: 'var(--theme-info-contrast-50)',
      100: 'var(--theme-info-contrast-100)',
      200: 'var(--theme-info-contrast-200)',
      300: 'var(--theme-info-contrast-300)',
      400: 'var(--theme-info-contrast-400)',
      500: 'var(--theme-info-contrast-500)',
      600: 'var(--theme-info-contrast-600)',
      700: 'var(--theme-info-contrast-700)',
      800: 'var(--theme-info-contrast-800)',
      900: 'var(--theme-info-contrast-900)',
      A100: 'var(--theme-info-contrast-A100)',
      A200: 'var(--theme-info-contrast-A200)',
      A400: 'var(--theme-info-contrast-A400)',
      A700: 'var(--theme-info-contrast-A700)',
    },
  }
  ,
  warning: {
    default: 'var(--theme-warning-default)',
    50 : 'var(--theme-warning-50)',
    100 : 'var(--theme-warning-100)',
    200 : 'var(--theme-warning-200)',
    300 : 'var(--theme-warning-300)',
    400 : 'var(--theme-warning-400)',
    500 : 'var(--theme-warning-500)',
    600 : 'var(--theme-warning-600)',
    700 : 'var(--theme-warning-700)',
    800 : 'var(--theme-warning-800)',
    900 : 'var(--theme-warning-900)',
    A100 : 'var(--theme-warning-A100)',
    A200 : 'var(--theme-warning-A200)',
    A400 : 'var(--theme-warning-A400)',
    A700 : 'var(--theme-warning-A700)',
    contrast: {
      default: 'var(--theme-warning-contrast-default)',
      50: 'var(--theme-warning-contrast-50)',
      100: 'var(--theme-warning-contrast-100)',
      200: 'var(--theme-warning-contrast-200)',
      300: 'var(--theme-warning-contrast-300)',
      400: 'var(--theme-warning-contrast-400)',
      500: 'var(--theme-warning-contrast-500)',
      600: 'var(--theme-warning-contrast-600)',
      700: 'var(--theme-warning-contrast-700)',
      800: 'var(--theme-warning-contrast-800)',
      900: 'var(--theme-warning-contrast-900)',
      A100: 'var(--theme-warning-contrast-A100)',
      A200: 'var(--theme-warning-contrast-A200)',
      A400: 'var(--theme-warning-contrast-A400)',
      A700: 'var(--theme-warning-contrast-A700)',
    },
  }
  ,
  danger: {
    default: 'var(--theme-danger-default)',
    50 : 'var(--theme-danger-50)',
    100 : 'var(--theme-danger-100)',
    200 : 'var(--theme-danger-200)',
    300 : 'var(--theme-danger-300)',
    400 : 'var(--theme-danger-400)',
    500 : 'var(--theme-danger-500)',
    600 : 'var(--theme-danger-600)',
    700 : 'var(--theme-danger-700)',
    800 : 'var(--theme-danger-800)',
    900 : 'var(--theme-danger-900)',
    A100 : 'var(--theme-danger-A100)',
    A200 : 'var(--theme-danger-A200)',
    A400 : 'var(--theme-danger-A400)',
    A700 : 'var(--theme-danger-A700)',
    contrast: {
      default: 'var(--theme-danger-contrast-default)',
      50: 'var(--theme-danger-contrast-50)',
      100: 'var(--theme-danger-contrast-100)',
      200: 'var(--theme-danger-contrast-200)',
      300: 'var(--theme-danger-contrast-300)',
      400: 'var(--theme-danger-contrast-400)',
      500: 'var(--theme-danger-contrast-500)',
      600: 'var(--theme-danger-contrast-600)',
      700: 'var(--theme-danger-contrast-700)',
      800: 'var(--theme-danger-contrast-800)',
      900: 'var(--theme-danger-contrast-900)',
      A100: 'var(--theme-danger-contrast-A100)',
      A200: 'var(--theme-danger-contrast-A200)',
      A400: 'var(--theme-danger-contrast-A400)',
      A700: 'var(--theme-danger-contrast-A700)',
    },
  }
}

module.exports = {
    prefix: '',
    mode: 'jit',
    important: true,
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: paletteTheme,
        backgroundColor: Object.assign({...paletteTheme}, bgPalette),
        divideColor: paletteTheme,
        borderColor: paletteTheme,
        gradientColorStops: paletteTheme,
        placeholderColor: paletteTheme,
        ringColor: paletteTheme,
        ringOffsetColor: paletteTheme,
        textColor: Object.assign({...paletteTheme}, textPalette),
        zIndex: {
          auto: 'auto',
          60: '60',
          70: '70',
          80: '80',
          90: '90',
          100: '100',
        },
      }
    },
    variants: {
      extend: {
        backgroundColor:['dark'],
        backgroundColor: ['dark'],
        divideColor: ['dark'],
        borderColor: ['dark'],
        gradientColorStops: ['dark'],
        placeholderColor: ['dark'],
        ringColor: ['dark'],
        ringOffsetColor: ['dark'],
        textColor: ['dark'],
      },
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
};