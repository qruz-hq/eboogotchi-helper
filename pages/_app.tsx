import { useWalletInitializer } from "@/hooks/useWalletInitializer";
import EboogotchiProvider from "@/providers/eboogotchi";
import Web3Provider from "@/providers/web3";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useWalletInitializer();
  return (
    <Web3Provider>
      <EboogotchiProvider>
        <Component {...pageProps} />
      </EboogotchiProvider>
    </Web3Provider>
  );
}

export default MyApp;
