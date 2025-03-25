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
    holesky: holesky
};