import { useState, useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { OnboardAPI, WalletState, ConnectOptions } from "@web3-onboard/core";
import type { Account } from "@web3-onboard/core/dist/types";
import { initWeb3Onboard } from "../services/web3onboard";

const connectedWalletsStorageKey = "eboogotchi-connected-wallets";

export async function useWalletInitializer(): Promise<Account | undefined> {
  const [{ wallet }, connect] = useConnectWallet();
  const [onboard, setOnboard] = useState<OnboardAPI | undefined>();

  const [account, setAccount] = useState<Account | undefined>();

  // Initialize web3-onboard
  useEffect(() => {
    const onboardConfig = initWeb3Onboard;
    setOnboard(onboardConfig);
  }, []);

  // Reconnect to the previously selected wallet if the previously selected wallet is not connected.
  useEffect(() => {
    const connectWithWallet = async (options: ConnectOptions) =>
      connect(options);
    const previouslySelectedWallet = window.localStorage.getItem(
      connectedWalletsStorageKey
    );

    // Reconnect the first wallet that got connected.
    // The array shifts automatically to the last connected one thanks to web3-onboard.
    if (previouslySelectedWallet && onboard) {
      const parsed = JSON.parse(previouslySelectedWallet);

      if (parsed.length) {
        connectWithWallet({
          autoSelect: {
            label: parsed[0],
            disableModals: true,
          },
        }).catch((err) => {
          throw new Error(err);
        });
      }
    }
  }, [onboard, connect]);

  // Subscribe to web3-onboard events.
  useEffect(() => {
    if (onboard) {
      // Subscribe to the wallets state.
      const walletSubscriber = onboard.state.select("wallets");

      // Remember the wallet(s) that a user has previously connected to by storing them in the app state (localStorage)
      // and then automatically selecting them for the user next time they visit your app
      walletSubscriber.subscribe((walletsCallback: WalletState[]) => {
        let firstConnected = false;

        // Create a flag that checks if the user has connected to a wallet before
        if (
          walletsCallback.length > 0 &&
          !localStorage.getItem(connectedWalletsStorageKey)
        ) {
          firstConnected = true;
        }

        if (walletsCallback.length > 0) {
          localStorage.setItem(
            connectedWalletsStorageKey,
            JSON.stringify(walletsCallback.map(({ label }) => label))
          );
        } else {
          localStorage.removeItem(connectedWalletsStorageKey);
        }
      });
    }
  }, [onboard]);

  // If `wallet` is defined then the user is connected
  useEffect(() => {
    if (wallet) {
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens : null,
      });
    }
  }, [wallet]);

  return account;
}
