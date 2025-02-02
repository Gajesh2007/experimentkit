import {
  darkTheme
} from "./chunk-ZTPB2KPT.js";
import {
  midnightTheme
} from "./chunk-KAHYOBBA.js";
import {
  ConnectButton,
  DesktopOptions,
  MobileOptions,
  RainbowKitProvider,
  cssObjectFromTheme,
  cssStringFromTheme,
  dialogContent,
  dialogContentMobile,
  isAndroid,
  isIOS,
  isMobile,
  useAccountModal,
  useChainId,
  useChainModal,
  useConnectModal,
  useTransactionStore
} from "./chunk-YBZPVSET.js";
import {
  lightTheme
} from "./chunk-44PFST6S.js";
import "./chunk-4QPBWJI3.js";

// src/wallets/getWalletConnectConnector.ts
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
var sharedConnectors = /* @__PURE__ */ new Map();
function createConnector(options) {
  const connector = new WalletConnectConnector(options);
  sharedConnectors.set(JSON.stringify(options), connector);
  return connector;
}
function getWalletConnectConnector({
  chains,
  qrcode = false
}) {
  const options = {
    chains,
    options: {
      qrcode
    }
  };
  const serializedOptions = JSON.stringify(options);
  const sharedConnector = sharedConnectors.get(serializedOptions);
  return sharedConnector != null ? sharedConnector : createConnector(options);
}

// src/wallets/walletConnectors/argent/argent.ts
var argent = ({ chains }) => ({
  id: "argent",
  name: "Argent",
  iconUrl: async () => (await import("./argent-5L2T73SY.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.argent.contractwalletclient",
    ios: "https://apps.apple.com/us/app/argent/id1358741926",
    qrCode: "https://argent.link/app"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://argent.link/app/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://www.argent.xyz/learn/what-is-a-crypto-wallet/",
          steps: [
            {
              description: "Put Argent on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Argent app"
            },
            {
              description: "Create a wallet and username, or import an existing wallet.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the Scan QR button"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/brave/brave.ts
import { InjectedConnector } from "wagmi/connectors/injected";
var brave = ({ chains, shimDisconnect }) => {
  var _a;
  return {
    id: "brave",
    name: "Brave Wallet",
    iconUrl: async () => (await import("./brave-GT2DMA7C.js")).default,
    iconBackground: "#fff",
    installed: typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isBraveWallet) === true,
    downloadUrls: {},
    createConnector: () => ({
      connector: new InjectedConnector({
        chains,
        options: { shimDisconnect }
      })
    })
  };
};

// src/wallets/walletConnectors/coinbase/coinbase.ts
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
var coinbase = ({ appName, chains }) => {
  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    shortName: "Coinbase",
    iconUrl: async () => (await import("./coinbase-G3UAZG2M.js")).default,
    iconBackground: "#2c5ff6",
    downloadUrls: {
      browserExtension: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250"
    },
    createConnector: () => {
      const ios = isIOS();
      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true
        }
      });
      const getUri = async () => (await connector.getProvider()).qrUrl;
      return {
        connector,
        ...ios ? {} : {
          mobile: { getUri },
          qrCode: {
            getUri,
            instructions: {
              learnMoreUrl: "https://www.coinbase.com/learn/tips-and-tutorials/how-to-set-up-a-crypto-wallet",
              steps: [
                {
                  description: "We recommend putting Coinbase Wallet on your home screen for quicker access.",
                  step: "install",
                  title: "Open the Coinbase Wallet app"
                },
                {
                  description: "You can easily backup your wallet using the cloud backup feature.",
                  step: "create",
                  title: "Create or Import a Wallet"
                },
                {
                  description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                  step: "scan",
                  title: "Tap the scan button"
                }
              ]
            }
          }
        }
      };
    }
  };
};

// src/wallets/walletConnectors/imToken/imToken.ts
var imToken = ({ chains }) => ({
  id: "imToken",
  name: "imToken",
  iconUrl: async () => (await import("./imToken-LFPF6XA3.js")).default,
  iconBackground: "#098de6",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.token.app",
    ios: "https://itunes.apple.com/us/app/imtoken2/id1384798940",
    qrCode: "https://token.im/download"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return `imtokenv2://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: typeof window !== "undefined" && window.navigator.language.includes("zh") ? "https://support.token.im/hc/zh-cn/categories/360000925393" : "https://support.token.im/hc/en-us/categories/360000925393",
          steps: [
            {
              description: "Put imToken app on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the imToken app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap Scanner Icon in top right corner"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/injected/injected.ts
import { InjectedConnector as InjectedConnector2 } from "wagmi/connectors/injected";
var injected = ({
  chains,
  shimDisconnect
}) => ({
  id: "injected",
  name: "Injected Wallet",
  iconUrl: async () => (await import("./injected-NV2ZDWID.js")).default,
  iconBackground: "#fff",
  createConnector: () => ({
    connector: new InjectedConnector2({
      chains,
      options: { shimDisconnect }
    })
  })
});

// src/wallets/walletConnectors/ledger/ledger.ts
var ledger = ({ chains }) => ({
  id: "ledger",
  iconBackground: "#000",
  name: "Ledger Live",
  iconUrl: async () => (await import("./ledger-FR4A2GHX.js")).default,
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.ledger.live",
    ios: "https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700",
    qrCode: "https://www.ledger.com/ledger-live/download#download-device-2"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      desktop: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      }
    };
  }
});

// src/wallets/walletConnectors/metaMask/metaMask.ts
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
function isMetaMask(ethereum) {
  const isMetaMask2 = Boolean(ethereum.isMetaMask);
  if (!isMetaMask2) {
    return false;
  }
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false;
  }
  if (ethereum.isTokenary) {
    return false;
  }
  return true;
}
var metaMask = ({
  chains,
  shimDisconnect
}) => {
  const isMetaMaskInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && isMetaMask(window.ethereum);
  const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected;
  return {
    id: "metaMask",
    name: "MetaMask",
    iconUrl: async () => (await import("./metaMask-CP52H6U7.js")).default,
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : void 0,
    downloadUrls: {
      browserExtension: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({ chains }) : new MetaMaskConnector({
        chains,
        options: { shimDisconnect }
      });
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? async () => {
            const { uri } = (await connector.getProvider()).connector;
            return isAndroid() ? uri : `https://metamask.app.link/wc?uri=${encodeURIComponent(
              uri
            )}`;
          } : void 0
        }
      };
    }
  };
};

// src/wallets/walletConnectors/rainbow/rainbow.ts
var rainbow = ({ chains }) => ({
  id: "rainbow",
  name: "Rainbow",
  iconUrl: async () => (await import("./rainbow-MRMCEQFY.js")).default,
  iconBackground: "#0c2f78",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=me.rainbow",
    ios: "https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021",
    qrCode: "https://rainbow.download"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://learn.rainbow.me/connect-your-wallet-to-a-website-or-app",
          steps: [
            {
              description: "We recommend putting Rainbow on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Rainbow app"
            },
            {
              description: "You can easily backup your wallet using our backup feature on your phone.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the scan button"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/steak/steak.ts
var steak = ({ chains }) => ({
  id: "steak",
  name: "Steakwallet",
  iconUrl: async () => (await import("./steak-WN465AL2.js")).default,
  iconBackground: "#000",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=fi.steakwallet.app",
    ios: "https://apps.apple.com/np/app/steakwallet/id1569375204",
    qrCode: "https://steakwallet.fi/download"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://links.steakwallet.fi/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://blog.steakwallet.fi/introducing-the-steakwallet-beta/",
          steps: [
            {
              description: "Add Steakwallet to your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Steakwallet app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap the QR icon and scan"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/trust/trust.ts
import { InjectedConnector as InjectedConnector3 } from "wagmi/connectors/injected";
var trust = ({ chains, shimDisconnect }) => ({
  id: "trust",
  name: "Trust Wallet",
  iconUrl: async () => (await import("./trust-V37V6CEN.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
    ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
    qrCode: "https://link.trustwallet.com"
  },
  createConnector: () => {
    var _a;
    const inAppBrowser = Boolean(
      typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isTrust)
    );
    if (inAppBrowser) {
      return {
        connector: new InjectedConnector3({
          chains,
          options: { shimDisconnect }
        })
      };
    }
    const connector = getWalletConnectConnector({ chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return isAndroid() ? uri : `https://link.trustwallet.com/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: "https://trustwallet.com/blog/an-introduction-to-trustwallet",
          steps: [
            {
              description: "Put Trust Wallet on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Trust Wallet app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap WalletConnect in Settings"
            }
          ]
        }
      }
    };
  }
});

// src/wallets/walletConnectors/walletConnect/walletConnect.ts
var walletConnect = ({ chains }) => ({
  id: "walletConnect",
  name: "WalletConnect",
  iconUrl: async () => (await import("./walletConnect-WGMZ526J.js")).default,
  iconBackground: "#3b99fc",
  createConnector: () => {
    const ios = isIOS();
    const connector = getWalletConnectConnector({
      chains,
      qrcode: ios
    });
    const getUri = async () => (await connector.getProvider()).connector.uri;
    return {
      connector,
      ...ios ? {} : {
        mobile: { getUri },
        qrCode: { getUri }
      }
    };
  }
});

// src/wallets/walletConnectors/index.ts
var wallet = {
  argent,
  brave,
  coinbase,
  imToken,
  injected,
  ledger,
  metaMask,
  rainbow,
  steak,
  trust,
  walletConnect
};

// src/wallets/connectorsForWallets.ts
import { WalletConnectConnector as WalletConnectConnector2 } from "wagmi/connectors/walletConnect";

// src/utils/omitUndefinedValues.ts
function omitUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== void 0)
  );
}

// src/wallets/connectorsForWallets.ts
var connectorsForWallets = (walletList) => {
  return () => {
    let index = -1;
    const connectors = [];
    walletList.forEach(({ groupName, wallets }) => {
      wallets.forEach(({ createConnector: createConnector2, ...walletMeta }) => {
        index++;
        const { connector, ...connectionMethods } = omitUndefinedValues(
          createConnector2()
        );
        let walletConnectModalConnector;
        if (walletMeta.id === "walletConnect" && connectionMethods.qrCode && !isMobile()) {
          const { chains, options } = connector;
          walletConnectModalConnector = new WalletConnectConnector2({
            chains,
            options: {
              ...options,
              qrcode: true
            }
          });
          connectors.push(walletConnectModalConnector);
        }
        const walletInstance = {
          connector,
          groupName,
          index,
          walletConnectModalConnector,
          ...walletMeta,
          ...connectionMethods
        };
        if (!connectors.includes(connector)) {
          connectors.push(connector);
          connector._wallets = [];
        }
        connector._wallets.push(walletInstance);
      });
    });
    return connectors;
  };
};

// src/wallets/getDefaultWallets.ts
var getDefaultWallets = ({
  appName,
  chains
}) => {
  const needsInjectedWalletFallback = typeof window !== "undefined" && window.ethereum && !isMetaMask(window.ethereum) && !window.ethereum.isCoinbaseWallet && !window.ethereum.isBraveWallet;
  const wallets = [
    {
      groupName: "Popular",
      wallets: [
        rainbow({ chains }),
        coinbase({ appName, chains }),
        metaMask({ chains, shimDisconnect: true }),
        walletConnect({ chains }),
        brave({ chains, shimDisconnect: true }),
        ...needsInjectedWalletFallback ? [injected({ chains, shimDisconnect: true })] : []
      ]
    }
  ];
  return {
    connectors: connectorsForWallets(wallets),
    wallets
  };
};

// src/transactions/useAddRecentTransaction.ts
import { useCallback } from "react";
import { useAccount } from "wagmi";
function useAddRecentTransaction() {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useChainId();
  return useCallback(
    (transaction) => {
      if (!address || !chainId) {
        throw new Error("No address or chain ID found");
      }
      store.addTransaction(address, chainId, transaction);
    },
    [store, address, chainId]
  );
}

// src/__private__/index.ts
var __private__ = {
  DesktopOptions,
  dialogContent,
  dialogContentMobile,
  MobileOptions
};
export {
  ConnectButton,
  RainbowKitProvider,
  __private__,
  connectorsForWallets,
  cssObjectFromTheme,
  cssStringFromTheme,
  darkTheme,
  getDefaultWallets,
  getWalletConnectConnector,
  lightTheme,
  midnightTheme,
  useAccountModal,
  useAddRecentTransaction,
  useChainModal,
  useConnectModal,
  wallet
};
