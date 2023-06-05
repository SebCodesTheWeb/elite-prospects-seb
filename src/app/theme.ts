import { ThemeOverride, extendTheme } from '@chakra-ui/react'

const scrollbarStyles = {
  '::-webkit-scrollbar': {
    width: '10px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'hsla(216, 15%, 52%, 0.7)',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    borderRadius: '5px',
  },
}

const overrides: ThemeOverride = {
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        height: '100%',
      },
      '#app': {
        height: '100%',
      },
      ...scrollbarStyles,
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
}

export const theme = extendTheme(overrides)
