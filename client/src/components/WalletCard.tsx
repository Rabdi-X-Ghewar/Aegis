import { Coins, Copy } from "lucide-react";
import { getWalletIcon } from "../lib/getWalletIcon";
import { WalletBalance } from "../lib/types";
import { getWalletName, truncateAddress } from "../lib/utils";
import { Button } from "./ui/button";

export const WalletCard = ({ 
    wallet, 
    handleCopyAddress, 
    setSelectedWallet, 
    setOpen 
}: { 
    wallet: WalletBalance;
    handleCopyAddress: (address: string) => void;
    setSelectedWallet: (wallet: WalletBalance) => void;
    setOpen: (isOpen: boolean) => void;
}) => {
    return (
        <div className="bg-card rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-border">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getWalletIcon(wallet.clientType || '')}
                    <div>
                        <h3 className="font-semibold text-lg text-foreground capitalize">
                            {getWalletName(wallet.clientType || '')} Wallet
                        </h3>
                        <p className="text-sm text-muted-foreground font-mono">
                            {truncateAddress(wallet.address)}
                        </p>
                        <button onClick={() => handleCopyAddress(wallet.address)}>
                            <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-2 bg-muted rounded-lg p-4">
                <Coins className="w-5 h-5 text-primary" />
                <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="font-semibold text-lg text-foreground">
                        {wallet.balance.toFixed(4)} ETH
                    </p>
                </div>
            </div>

            <Button
                onClick={() => {
                    setSelectedWallet(wallet);
                    setOpen(true);
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
            >
                Send Transaction
            </Button>
        </div>
    );
};
