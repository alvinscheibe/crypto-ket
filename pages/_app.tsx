import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes';
import { Footer, Navbar } from '../components';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute={'class'}>
      <Navbar />
      <div className={'pt-65'}>
        <Component {...pageProps} />
      </div>
      <Footer />

      <Script src={'https://kit.fontawesome.com/f50c36a3a1.js'} crossOrigin={'anonymous'} />
    </ThemeProvider>
  );
}

export default MyApp
