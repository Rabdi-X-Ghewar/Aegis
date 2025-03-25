import { Copy, Wallet2 } from "lucide-react";
import { WalletBalance } from "../lib/types";
import { truncateAddress } from "../lib/utils";
import { Button } from "./ui/button";

export const ServerWallet = ({ 
    serverWallet, 
    handleCopyAddress, 
    setSelectedWallet, 
    setOpen 
}: { 
    serverWallet: WalletBalance | null;
    handleCopyAddress: (address: string) => void;
    setSelectedWallet: (wallet: WalletBalance) => void;
    setOpen: (isOpen: boolean) => void;
}) => {
    return (
        <div className="mb-8 bg-gradient-to-r from-primary to-primary/70 rounded-xl shadow-lg p-6 text-primary-foreground">
            <h2 className="text-2xl font-bold mb-2">Server Wallet</h2>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Wallet2 className="w-8 h-8" />
                    <div>
                        <p className="font-semibold">{truncateAddress(serverWallet?.address || "")}</p>
                        <p className="text-sm">Balance: {serverWallet?.balance.toFixed(4) || "0.0000"} ETH</p>
                    </div>
                </div>
                {serverWallet && (
                    <button onClick={() => handleCopyAddress(serverWallet.address)}>
                        <Copy className="w-5 h-5 text-primary-foreground hover:text-primary-foreground/90 cursor-pointer" />
                    </button>
                )}
            </div>
            {serverWallet && (
                <Button
                    onClick={() => {
                        setSelectedWallet(serverWallet);
                        setOpen(true);
                    }}
                    className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary mt-4"
                >
                    Send Transaction
                </Button>
            )}
        </div>
    );
};
