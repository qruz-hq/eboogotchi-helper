import { useWalletInitializer } from '@/hooks/useWalletInitializer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  useWalletInitializer();
  return <Component {...pageProps} />
}

export default MyApp
