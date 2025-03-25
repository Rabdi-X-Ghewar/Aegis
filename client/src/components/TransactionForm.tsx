import { useState } from "react";
import { Label } from "./ui/label";
import { Send, Wallet } from "lucide-react";
import { truncateAddress } from "../lib/utils";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export const TransactionForm = ({ 
    senderAddress, 
    senderName = null,
    setDestinationAddress, 
    setAmount, 
    setOpen, 
    sendTransaction 
}: { 
    senderAddress: string;
    senderName?: string | null;
    setDestinationAddress: (address: string) => void;
    setAmount: (amount: string) => void;
    setOpen: (isOpen: boolean) => void;
    sendTransaction: () => Promise<void>;
}) => {
    const [destinationAddress, setDestination] = useState('');
    const [amount, setAmountValue] = useState('');
    
    return (
        <>
            <div className="grid gap-6 py-4">
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">From</Label>
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Wallet className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            {senderName && <div className="font-mono text-sm">{senderName}</div>}
                            <span className="font-mono text-sm">
                                {truncateAddress(senderAddress)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="destination" className="text-sm font-medium">
                        Destination Address
                    </Label>
                    <Input
                        id="destination"
                        placeholder="0x..."
                        value={destinationAddress}
                        onChange={(e) => setDestination(e.target.value)}
                        className="font-mono"
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="amount" className="text-sm font-medium">
                        Amount (ETH)
                    </Label>
                    <div className="relative">
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmountValue(e.target.value)}
                            className="pr-12"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            ETH
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter>
                <Button
                    variant="ghost"
                    onClick={() => {
                        setOpen(false);
                        setDestinationAddress("");
                        setAmount("");
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        setDestinationAddress(destinationAddress.toString());
                        setAmount(amount);
                        sendTransaction();
                    }}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                    <Send className="w-4 h-4 mr-2" />
                    Send Transaction
                </Button>
            </DialogFooter>
        </>
    );
};
