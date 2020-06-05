import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { reset, themes } from 'react95'
import Modal from 'react-modal'

const ResetStyles = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'MSSansSerif';
    src: url('/MS-Sans-Serif.ttf');
  }
  * {
    font-family: MSSansSerif !important;
  }
  body {
    overflow: hidden;
  }
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
