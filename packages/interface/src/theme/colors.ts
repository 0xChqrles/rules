// Based mostly on https://github.com/Uniswap/interface/blob/main/src/theme/index.tsx

const colors = {
  white: '#FFFFFF',
  black: '#000000',

  neutral1_dark: '#FDFFFC',
  neutral2_dark: 'rgba(240, 247, 244, 0.5)',
}

const commonTheme = {
  white: colors.white,
  black: colors.black,

  accent1: '#724CF9',
}

export const darkTheme = {
  ...commonTheme,

  surface1: '#0A0D10',
  surface2: '#101418',
  surface3: '#1A1F23',

  border: 'rgba(240, 247, 244, 0.1)',

  neutral1: colors.neutral1_dark,
  neutral2: colors.neutral2_dark,
}
