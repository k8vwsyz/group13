// import App from "next/app";
import React from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import '../styles/globals.css'
// import '../styles/bootstrap_base.scss'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import '@fontsource/roboto'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import theme from '../styles/mui_theme'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles)
      jssStyles.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        {/* <title>Infotainment trust testing platform</title> */}
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}

export default MyApp