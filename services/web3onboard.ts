import { init } from '@web3-onboard/react';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import coinbaseWalletModule from '@web3-onboard/coinbase';

const injected = injectedModule();
const walletConnect = walletConnectModule();
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });

const providers = [
  `https://eth-${process.env.ALCHEMY_CHAIN_NAME}.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
];

export const initWeb3Onboard = init({
  // Order is important here.
  wallets: [injected, coinbaseWalletSdk, walletConnect],
  chains: [
    {
      id: process.env.CHAIN_ID ?? '0x1',
      token: 'ETH',
      label: 'Ethereum network',
      rpcUrl: process.env.RPC_URL ?? providers[0],
    },
  ],
  appMetadata: {
    name: "Eboogotchi",
    description: `Welcome to Eboogotchi!`,
    logo: '/images/web3-onboard/logo.jpeg',
    icon: '/images/web3-onboard/logo.jpeg',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'WalletConnect', url: 'https://walletconnect.org' },
      { name: 'MetaMask', url: 'https://metamask.io' },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
  },
  // https://github.com/blocknative/web3-onboard/blob/v2-web3-onboard/packages/core/src/i18n/en.json
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: 'Select from the available wallets',
          sidebar: {
            heading: 'Get Started',
            subheading: 'Connect your wallet',
            paragraph: 'Select your wallet from the options to sign in to {app}.',
          },
          recommendedWalletsPart1: '{app} only supports',
          recommendedWalletsPart2:
            'on this platform. Please use or install one of the supported wallets to continue',
          installWallet:
            'You do not have any wallets installed that {app} supports, please use a supported wallet',
          agreement: {
            agree: 'I agree to the',
            terms: 'Terms & Conditions',
            and: 'and',
            privacy: 'Privacy Policy',
          },
        },
        connectingWallet: {
          header:
            '{connectionRejected, select, false {Connecting to {wallet}...} other {Connection Rejected}}',
          sidebar: {
            subheading: 'Approve Connection',
            paragraph:
              'Please approve the connection in your wallet and authorize access to continue.',
          },
          mainText: 'Connecting...',
          paragraph: 'Make sure to select all accounts that you want to grant access to.',
          rejectedText: 'Connection Rejected!',
          rejectedCTA: 'Click here to try again',
          primaryButton: 'Back to wallets',
        },
        connectedWallet: {
          header: 'Connection Successful',
          sidebar: {
            subheading: 'Connection Successful!',
            paragraph: 'Your wallet is now connected to {app}',
          },
          mainText: 'Connected',
        },
      },
      modals: {
        actionRequired: {
          heading: 'Action required in {wallet}',
          paragraph: 'Please switch the active account in your wallet.',
          linkText: 'Learn more.',
          buttonText: 'Okay',
        },
        switchChain: {
          heading: 'Switch Chain',
          paragraph1:
            '{app} requires that you switch your wallet to the {nextNetworkName} network to continue.',
          paragraph2:
            '*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.',
        },
        confirmDisconnectAll: {
          heading: 'Disconnect all Wallets',
          description: 'Are you sure that you would like to disconnect all your wallets?',
          confirm: 'Confirm',
          cancel: 'Cancel',
        },
      },
      accountCenter: {
        connectAnotherWallet: 'Connect another Wallet',
        disconnectAllWallets: 'Disconnect all Wallets',
        currentNetwork: 'Current Network',
        appInfo: 'App Info',
        learnMore: 'Learn More',
        gettingStartedGuide: 'Getting Started Guide',
        smartContracts: 'Smart Contract(s)',
        explore: 'Explore',
        backToApp: 'Back to App',
        poweredBy: 'powered by',
        addAccount: 'Add Account',
        setPrimaryAccount: 'Set Primary Account',
        disconnectWallet: 'Disconnect Wallet',
      },
    },
  },
});
