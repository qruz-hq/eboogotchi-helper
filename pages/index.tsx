import Stats from "@/components/Stats/Stats";
import { SpriteAnimator } from "react-sprite-animator";
import {  useWallets } from '@web3-onboard/react';
import Web3Connect from "@/components/Web3Connect";
import Tutorial from "@/components/Tutorial";
import Footer from "@/components/Footer";
export default function Eboogotchi() {

  const wallets= useWallets();
  if(wallets.length === 0) return <Web3Connect />
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-screen min-h-screen">
      <SpriteAnimator sprite="/images/eboogotchi.png" width={196} height={196} fps={4} startFrame={0} frameCount={2}/>
      <Stats />
      <Tutorial />
      <Footer /> 
    </div>
  );
}
