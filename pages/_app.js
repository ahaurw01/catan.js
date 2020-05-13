import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { reset, themes } from 'react95'

const ResetStyles = createGlobalStyle`
  ${reset}
`

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={themes.default}>
      <ResetStyles />

      <Component {...pageProps} />
    </ThemeProvider>
  )
}
