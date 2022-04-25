import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
export default function Web3Connect() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  return <button onClick={connect}>Connect wallet</button>;
}
