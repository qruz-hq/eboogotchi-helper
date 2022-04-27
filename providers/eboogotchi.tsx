import EboogotchiStats from "interfaces/EboogotchiStats";
import React, { useEffect, useContext } from "react";
import { Web3Context } from "./web3";
import { ethers } from "ethers";
import { useSetChain, useWallets } from "@web3-onboard/react";
import ABI from "@/artifacts/eboogotchi.json";
import EboogotchiLeaderboard from "interfaces/EboogotchiLeaderboard";

export const EboogotchiContext = React.createContext<{
  stats: EboogotchiStats;
  leaderboard : EboogotchiLeaderboard;
  loading: boolean;
  score: number;
}>({ stats: {}, leaderboard: new EboogotchiLeaderboard(), loading: true , score: 0});

const EboogotchiProvider: React.FC<{ children: any }> = ({ children }) => {
  const { alchemy } = useContext(Web3Context);
  let _buffer: EboogotchiStats;
  let _leaderboard: EboogotchiLeaderboard = new EboogotchiLeaderboard();
  let [leaderboard, setLeaderboard] = React.useState<EboogotchiLeaderboard>(_leaderboard);
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
    if (alchemy && !loading && !loaded && !contract) {
      setLoading(true);

      const contractAddress = process.env.CONTRACT_ADDRESS;
      contract = new ethers.Contract(
        contractAddress || "",
        ABI,
        alchemy
      );

      setHungry((await contract.getHungry()).toNumber() || 0);
      setTired((await contract.getTired()).toNumber() || 0);
      setBored((await contract.getBored()).toNumber() || 0);
      setDirty((await contract.getDirty()).toNumber() || 0);
      if(wallets[0]) 
      setScore((await contract.love(wallets[0].accounts[0].address)).toNumber() || 0);

      let eventFilter = contract.filters.Loved()
      let events = await contract.queryFilter(eventFilter)
      events.forEach( (event) => _leaderboard.addScore(event.args?.caretaker))
      setLeaderboard(_leaderboard)

      setLoaded(true)
      setLoading(false);
    }
  }

  useEffect(() => {
    updateState();
  }, [alchemy]);

  return (
    <EboogotchiContext.Provider value={{ stats, leaderboard,  loading , score}}>
      {children}
    </EboogotchiContext.Provider>
  );
};

export default EboogotchiProvider;
