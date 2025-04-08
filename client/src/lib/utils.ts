import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getWalletName = (clientType: string) => {
  switch (clientType.toLowerCase()) {
    case 'metamask':
      return "MetaMask";
    case 'coinbase_wallet':
      return "Coinbase";
    case 'privy':
      return "Privy Embedded";
    case 'phantom':
      return "Phantom";
    default:
      return "Unknown Wallet";
  }
};

export const truncateAddress = (address: string) => {
  if (!address) return "N/A";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};


export function createLinkingMessage(walletAddress: string, ocid: string): { message: string, timestamp: number } {
  const timestamp = Date.now();
  const message = `I am linking wallet address ${walletAddress} to OpenCampus ID ${ocid} at timestamp ${timestamp}`;
  return { message, timestamp };
}

export const moment = dayjs;
export const formatAgentName = (name: string) => {
  return name.substring(0, 2);
}
export function formatWalletAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;


}