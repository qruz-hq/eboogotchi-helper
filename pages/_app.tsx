import { useWalletInitializer } from "@/hooks/useWalletInitializer";
import EboogotchiProvider from "@/providers/eboogotchi";
import Web3Provider from "@/providers/web3";
import "../styles/globals.css";

function EboogotchiHelper({ Component , pageProps } : any) {
  useWalletInitializer();
  return (
    <Web3Provider>
      <EboogotchiProvider>
        <Component {...pageProps} />
      </EboogotchiProvider>
    </Web3Provider>
  );
}

export default EboogotchiHelper;
