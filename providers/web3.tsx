import { WalletState } from "@web3-onboard/core";
import { useSetChain, useWallets } from "@web3-onboard/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

declare let window: any;
export function getWeb3(
  wallet?: WalletState,
  apiKey?: string
):
  | ethers.providers.Web3Provider
  | ethers.providers.JsonRpcProvider
  | ethers.providers.WebSocketProvider
  | undefined {
  if (wallet) return new ethers.providers.Web3Provider(wallet.provider);
  if (apiKey) {
    return new ethers.providers.AlchemyWebSocketProvider(
      process.env.ALCHEMY_CHAIN_NAME ?? "mainnet",
      apiKey
    );
  }
  if (window.ethereum)
    return new ethers.providers.Web3Provider(window.ethereum);
  if (window.web3)
    return new ethers.providers.Web3Provider(window.web3.currentProvider);
  return undefined;
}

export const Web3Context = React.createContext<{
  web3:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcProvider
    | undefined;
  alchemy: ethers.providers.AlchemyWebSocketProvider | undefined;
  connectedToChain: boolean;
  settingChain: boolean;
}>({
  web3: undefined,
  alchemy: undefined,
  connectedToChain: false,
  settingChain: false,
});

const Web3Provider: React.FC<{ children: any }> = ({ children }) => {
  const [web3, setWeb3] = React.useState<
    ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | undefined
  >(undefined);

  const [alchemy, setAlchemy] = React.useState<
    ethers.providers.AlchemyWebSocketProvider | undefined
  >(undefined);
  const [connectedToChain, setConnectedToChain] = useState(false);
  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
      settingChain, // boolean indicating if the chain is in the process of being set
    },
    setChain, // function to call to initiate user to switch chains in their wallet
  ] = useSetChain();
  const wallets = useWallets();

  function getChain(): string {
    return process.env.CHAIN_ID?.toUpperCase() ?? "0X1";
  }

  useEffect(() => {
    if (wallets[0] && connectedChain?.id.toUpperCase() !== getChain()) {
      setChain({ chainId: process.env.CHAIN_ID ?? "0x1" });
    } else {
      if(web3 === getWeb3(wallets[0])) return;
      setWeb3(getWeb3(wallets[0]));
      setAlchemy(
        getWeb3(
          undefined,
          process.env.ALCHEMY_API_KEY ?? undefined
        ) as ethers.providers.AlchemyWebSocketProvider
      );
    }
  }, [wallets]);

  function updateChainState() {
    if (!connectedChain) return;
    const correct = connectedChain.id.toUpperCase() === getChain();
    if (!correct) {
      alert("Please switch to the main chain");
    }
    setConnectedToChain(correct);
  }
  useEffect(() => {
    updateChainState();
  }, []);

  useEffect(() => {
    updateChainState();
  }, [connectedChain]);

  return (
    <Web3Context.Provider
      value={{ web3, alchemy, connectedToChain, settingChain }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
