import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrivyProvider } from '@privy-io/react-auth'

import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';
import ErrorBoundary from './ErrorBoundary.tsx'
import { Toaster } from 'sonner'
import { OCConnect } from '@opencampus/ocid-connect-js'
import { BrowserRouter } from 'react-router'


const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

import { defineChain } from "viem";
const openCampusChain = defineChain({
    id: 656476,
    network: "Open Campus Codex",
    name: "Open Campus Codext",
    nativeCurrency: {
        name: "EDU",
        symbol: "EDU",
        decimals: 18,
    },
    rpcUrls: {
        public: {
            http: ["https://rpc.open-campus-codex.gelato.digital"],
        },
        default: {
            http: ["https://rpc.open-campus-codex.gelato.digital"],
        },
    },
    blockExplorers: {
        default: {
            name: "Block Scout",
            url: "https://opencampus-codex.blockscout.com/",
        },
    },
    contracts: {
    },
    testnet: true,
})




const opts = {
  redirectUri: 'http://localhost:5173/redirect',
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PrivyProvider
        appId='cm7loig14030by9g896wob3gm'

        config={{
          externalWallets: {
            solana: {
              connectors: solanaConnectors,
            }
          },
          loginMethods: ['email'],
          defaultChain: openCampusChain,
          supportedChains: [openCampusChain],

          appearance: {
            theme: 'light',
            accentColor: '#676FFF',
            walletList: [
              'metamask', 'coinbase_wallet', 'rainbow', 'wallet_connect', 'phantom', 'safe', 'detected_wallets',
            ]
          },
        }}
      >
        <OCConnect opts={opts} sandboxMode={true}>
          <BrowserRouter>

                  <App />



          </BrowserRouter>

        </OCConnect>

        <Toaster />

      </PrivyProvider>
    </ErrorBoundary>



  </StrictMode>,
)
