import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { getWalletBalance, SUPPORTED_NETWORKS, NetworkKey } from "../lib/fetchWalletBalance";

import { fetchWallet, sendServerTransaction } from "../apiClient";
import { toast } from "sonner";
import { createWalletClient, custom, Hex, parseEther } from 'viem';
import { ethers } from "ethers";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { CHAIN_MAP, WalletBalance } from "../lib/types";
import { NetworkSelector } from "../components/NetworkSelector";
import { PageHeader } from "../components/PageHeader";
import { ServerWallet } from "../components/ServerWallet";
import { OCIDWallet } from "../components/OCIDWallet";
import { WalletList } from "../components/WalletList";
import { TransactionDialog } from "../components/TransactionDialog";



const Profile = () => {
    const { OCId, ethAddress, key  } = useOCAuth();
    console.log("privateKey", key);
    const { wallets } = useWallets();
    const { user } = usePrivy();

    const [walletBalances, setWalletBalances] = useState<WalletBalance[]>([]);
    const [serverWallet, setServerWallet] = useState<WalletBalance | null>(null);
    const [selectedWallet, setSelectedWallet] = useState<WalletBalance | undefined>(undefined);
    const [destinationAddress, setDestinationAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkKey>('sepolia');
    const [ocidBalance, setOcidBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchWalletData = async () => {
            if (wallets.length > 0) {
                try {
                    const balances = await Promise.all(
                        wallets.map(async (wallet) => {
                            const balanceResult = await getWalletBalance(wallet.address, selectedNetwork);
                            return {
                                address: wallet.address,
                                clientType: wallet.walletClientType,
                                balance: balanceResult ? parseFloat(balanceResult.balance) : 0,
                                network: selectedNetwork
                            };
                        })
                    );
                    setWalletBalances(balances);
                } catch (error) {
                    console.error("Error fetching wallet balances:", error);
                }
            }
        };

        const fetchOcidBalance = async () => {
            if (OCId) {
                try {
                    const balance = await getWalletBalance(ethAddress, selectedNetwork);
                    setOcidBalance(balance ? parseFloat(balance.balance) : 0);
                } catch (error) {
                    console.log("Error getting OCID balance:", error);
                }
            }
        };

        const fetchServerWalletData = async () => {
            try {
                const wallet = await fetchWallet(user?.email?.address!);
                const serverWalletAddress = wallet.wallet.address;
                const balanceResult = await getWalletBalance(serverWalletAddress, selectedNetwork);
                setServerWallet({
                    address: serverWalletAddress,
                    balance: balanceResult ? parseFloat(balanceResult.balance) : 0,
                    network: selectedNetwork
                });
            } catch (error) {
                console.error("Error fetching server wallet balance:", error);
            }
        };

        fetchServerWalletData();
        fetchWalletData();
        fetchOcidBalance();
    }, [wallets, selectedNetwork, OCId, ethAddress, user?.email?.address]);

    const handleCopyAddress = async (address: string) => {
        try {
            await navigator.clipboard.writeText(address);
            toast.success("Address copied to clipboard");
        } catch (error) {
            console.error("Failed to copy address:", error);
            toast.error("Failed to copy address");
        }
    };

    const sendTransaction = async () => {
        console.log("Sending transaction...");
        if (!selectedWallet || !selectedNetwork ) return;

        try {
            // Validate destination address
            if (!ethers.isAddress(destinationAddress.toString())) {
                toast.error("Invalid destination address");
                return;
            }

            // Validate amount
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                toast.error("Invalid transaction amount");
                return;
            }
            console.log("Transaction Data: ", selectedWallet, destinationAddress, amount);
            if (selectedWallet.address === serverWallet?.address) {
                // Server wallet transaction
                const hash = await sendServerTransaction(
                    user?.email?.address!,
                    destinationAddress,
                    amount,
                );

                if (hash) {
                    toast.success(`Server wallet transaction successful on ${SUPPORTED_NETWORKS[selectedNetwork].name}`);
                    setOpen(false);
                }
            } else {
                // Connected wallet transaction
                const wallet = wallets.find(wallet => wallet.address === selectedWallet.address);
                if (!wallet) {
                    console.error('Wallet not found');
                    return;
                }

                // Get the corresponding chain for the selected network
                const chain = CHAIN_MAP[selectedNetwork as keyof typeof CHAIN_MAP];
                console.log("Selected chain:", chain);
                if (!chain) {
                    toast.error(`Unsupported network: ${selectedNetwork}`);
                    return;
                }

                // Switch to the selected chain
                await wallet.switchChain(chain.id);

                console.log("Chain switched to:", chain.id);
                const provider = await wallet.getEthereumProvider();
                if (!provider) {
                    console.error('Ethereum provider is undefined');
                    return;
                }

                const walletClient = createWalletClient({
                    account: wallet.address as Hex,
                    chain: chain,
                    transport: custom(provider),
                });

                const [address] = await walletClient.getAddresses();
                const hash = await walletClient.sendTransaction({
                    account: address,
                    to: destinationAddress as `0x${string}`,
                    value: parseEther(amount),
                    chain: chain,
                });

                const explorerUrl = `https://${selectedNetwork}.etherscan.io`;
                const txUrl = `${explorerUrl}/tx/${hash}`;


                toast.success(`Transaction successful on ${SUPPORTED_NETWORKS[selectedNetwork].name}`);
                toast.info(
                    <div>
                        Transaction: {hash.slice(0, 6)}...{hash.slice(-4)}
                        <a 
                            href={txUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ marginLeft: '8px', textDecoration: 'underline' }}
                        >
                            View on Explorer
                        </a>
                    </div>
                );
                setOpen(false);
                return;
            }
        } catch (error: any) {
            console.error("Error sending transaction:", error);

            // Provide more detailed error messaging
            const errorMessage = error.message || "Error sending transaction";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <NetworkSelector
                selectedNetwork={selectedNetwork}
                setSelectedNetwork={setSelectedNetwork}
            />

            <PageHeader />

            <ServerWallet
                serverWallet={serverWallet}
                handleCopyAddress={handleCopyAddress}
                setSelectedWallet={setSelectedWallet}
                setOpen={setOpen}
            />

            {OCId && (
                <OCIDWallet
                    OCId={OCId}
                    ethAddress={ethAddress}
                    ocidBalance={ocidBalance}
                    handleCopyAddress={handleCopyAddress}
                    setDestinationAddress={setDestinationAddress}
                    setAmount={setAmount}
                    sendTransaction={sendTransaction}
                />
            )}

            <WalletList
                walletBalances={walletBalances}
                handleCopyAddress={handleCopyAddress}
                setSelectedWallet={setSelectedWallet}
                setOpen={setOpen}
            />

            <TransactionDialog
                open={open}
                setOpen={setOpen}
                selectedWallet={selectedWallet}
                setDestinationAddress={setDestinationAddress}
                setAmount={setAmount}
                sendTransaction={sendTransaction}
            />
        </div>
    );
};

export default Profile;