import { useState } from "react";
import { truncateAddress } from "../lib/utils";
import { Coins, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { TransactionForm } from "./TransactionForm";

export const OCIDWallet = ({ 
    OCId, 
    ethAddress, 
    ocidBalance, 
    handleCopyAddress, 
    setDestinationAddress,
    setAmount,
    sendTransaction
}: { 
    OCId: string;
    ethAddress: string;
    ocidBalance: number | null;
    handleCopyAddress: (address: string) => void;
    setDestinationAddress: (address: string) => void;
    setAmount: (amount: string) => void;
    sendTransaction: () => Promise<void>;
}) => {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="bg-card rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-border mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <img 
                        src="https://opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg"
                        alt="Open Campus"
                        className="w-8 h-8" 
                    />
                    <div>
                        <h3 className="font-semibold text-lg text-foreground capitalize">
                            Open Campus Wallet
                        </h3>
                        <p className="text-sm text-muted-foreground font-mono">
                            {truncateAddress(ethAddress)}
                        </p>
                        <button onClick={() => handleCopyAddress(ethAddress)}>
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
                        {ocidBalance?.toFixed(4) || "0.0000"} ETH
                    </p>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                    >
                        Send Transaction
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Send Transaction</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Send ETH to another OCID. Please verify all details before confirming.
                        </DialogDescription>
                    </DialogHeader>

                    <TransactionForm
                        senderAddress={ethAddress}
                        senderName={OCId}
                        setDestinationAddress={setDestinationAddress}
                        setAmount={setAmount}
                        setOpen={setOpen}
                        sendTransaction={sendTransaction}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};