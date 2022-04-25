import Stats from "@/components/Stats/Stats";
import EboogotchiStats from "interfaces/EboogotchiStats";
import React, { useEffect, useContext } from "react";
import { Web3Context } from "./web3";
import { ethers } from "ethers";
import { useSetChain, useWallets } from "@web3-onboard/react";
import ABI from "@/artifacts/Eboogotchi.json";

export const EboogotchiContext = React.createContext<EboogotchiStats>({});

const EboogotchiProvider: React.FC<{ children: any }> = ({ children }) => {
  const { web3 } = useContext(Web3Context);
  let _buffer: EboogotchiStats;
  const [stats, setStats] = React.useState<EboogotchiStats>({});
  const [contract, setContract] = React.useState<ethers.Contract>();
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
      dirty: { name: "Dirtyness", value },
    };
    setStats(_buffer);
  }

  function setValues(values: EboogotchiStats) {
    _buffer = values;
    setStats(values);
  }

  async function updateState() {
    if (web3 && wallets[0] && wallets[0].accounts) {
      setValues({
        hungry: { name: "Hunger", value: 0 },
        tired: { name: "Tiredness", value: 0 },
        bored: { name: "Boredom", value: 0 },
        dirty: { name: "Dirtyness", value: 0 },
      });

      const contractAddress = process.env.CONTRACT_ADDRESS;
      const contract = new ethers.Contract(
        contractAddress || "",
        ABI,
        web3.getSigner(wallets[0].accounts[0].address)
      );
      setHungry((await contract.getHungry()).toNumber() || 0);
      setTired((await contract.getTired()).toNumber() || 0);
      setBored((await contract.getBored()).toNumber() || 0);
      setDirty((await contract.getDirty()).toNumber() || 0);
    }
  }

  useEffect(() => {
    updateState();
  }, [web3]);

  return (
    <EboogotchiContext.Provider value={stats}>
      {children}
    </EboogotchiContext.Provider>
  );
};

export default EboogotchiProvider;
