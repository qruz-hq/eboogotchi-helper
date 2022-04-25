import Stats from "@/components/Stats/Stats";
import EboogotchiStats from "interfaces/EboogotchiStats";
import React, { useEffect, useContext } from "react";
import { Web3Context } from "./web3";
import { ethers } from "ethers";
import { useSetChain, useWallets } from "@web3-onboard/react";
import ABI from "@/artifacts/eboogotchi.json";

export const EboogotchiContext = React.createContext<{
  stats: EboogotchiStats;
  loading: boolean;
  score: number;
}>({ stats: {}, loading: true , score: 0});

const EboogotchiProvider: React.FC<{ children: any }> = ({ children }) => {
  const { web3 } = useContext(Web3Context);
  let _buffer: EboogotchiStats;
  const [stats, setStats] = React.useState<EboogotchiStats>({});
  let contract: ethers.Contract;
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const wallets = useWallets();

  function setHungry(value: number) {
    _buffer = {
      ..._buffer,
      hungry: { name: "Hunger", value },
    };
    setStats(_buffer);
  }

  function setTired(value: number) {
    _buffer = {
      ..._buffer,
      tired: { name: "Tiredness", value },
    };
    setStats(_buffer);
  }

  function setBored(value: number) {
    _buffer = {
      ..._buffer,
      bored: { name: "Boredom", value },
    };
    setStats(_buffer);
  }

  function setDirty(value: number) {
    _buffer = {
      ..._buffer,
      dirty: { name: "Dirtiness", value },
    };
    setStats(_buffer);
  }

  function setValues(values: EboogotchiStats) {
    _buffer = values;
    setStats(values);
  }

  async function updateState() {
    if (web3 && !loading && !loaded && !contract && wallets[0] && wallets[0].accounts) {
      setLoading(true);

      const contractAddress = process.env.CONTRACT_ADDRESS;
      contract = new ethers.Contract(
        contractAddress || "",
        ABI,
        web3.getSigner(wallets[0].accounts[0].address)
      );

      setHungry((await contract.getHungry()).toNumber() || 0);
      setTired((await contract.getTired()).toNumber() || 0);
      setBored((await contract.getBored()).toNumber() || 0);
      setDirty((await contract.getDirty()).toNumber() || 0);
      setScore((await contract.love(wallets[0].accounts[0].address)).toNumber() || 0);
      setLoaded(true)
      setLoading(false);
    }
  }

  useEffect(() => {
    updateState();
  }, [web3]);

  return (
    <EboogotchiContext.Provider value={{ stats, loading , score}}>
      {children}
    </EboogotchiContext.Provider>
  );
};

export default EboogotchiProvider;
