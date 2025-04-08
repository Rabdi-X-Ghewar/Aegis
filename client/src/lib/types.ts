import {
    mainnet,
    sepolia,
    goerli,
    polygonMumbai,
    polygon,
    arbitrum,
    optimism,
    holesky
} from 'viem/chains';

import { defineChain } from 'viem';
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

export type WalletBalance = {
    address: string;
    clientType?: string;
    balance: number;
    network?: NetworkKey;
};

export type NetworkKey = string;

export const CHAIN_MAP = {
    ethereum: mainnet,
    sepolia: sepolia,
    goerli: goerli,
    mumbai: polygonMumbai,
    polygon: polygon,
    arbitrum: arbitrum,
    optimism: optimism,
    holesky: holesky,
    openCampus: openCampusChain,
};

export interface LinkWalletParams {
    ocid: string;
    walletAddress: string;
    signature: string;
    message: string;
    timestamp: number;
}