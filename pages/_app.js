import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { reset, themes } from 'react95'
import Modal from 'react-modal'

const ResetStyles = createGlobalStyle`
  ${reset}
`

Modal.setAppElement('#__next')

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={themes.default}>
      <ResetStyles />

      <Component {...pageProps} />
    </ThemeProvider>
  )
}
